import moment from 'moment';
import { flow, map, sortBy, isEmpty, toUpper, get } from 'lodash';
import { DATETIME_FORMAT } from 'react-big-scheduler';
import {
  FETCH_PROVIDER_BY_BUSINESS_ID,
  FETCH_NORM_EVENTS_BY_PROVIDER,
  CALENDAR_LOADING,
  FETCH_TIMEZONE_OPTIONS,
  CREATE_CALENDAR_EVENT,
  EVENT_TYPE_TITLE,
  FETCH_GEO_OPTIONS,
  FETCH_SERVICE_OPTIONS
} from 'constants/Calendar.constants';

function getRRuleISO(date) {
  return moment(date)
    .toISOString()
    .replace(/([^a-zA-Z\d\\.])|(\.([^\\.]+)[^Z])/g, '');
}

function buildCalendarData(datum) {
  const { slot: { startTime, endTime } = {} } = datum;
  return {
    id: datum.id,
    description: datum.description,
    providerId: datum.providerId,
    type: datum.type,
    start: moment(startTime * 1000).format(DATETIME_FORMAT),
    end: moment(endTime * 1000).format(DATETIME_FORMAT),
    resourceId: datum.providerId,
    title: EVENT_TYPE_TITLE[datum.type],
    rrule: (() => {
      if (!datum.repeatType) return undefined;

      const repeatType = !isEmpty(datum.repeat.repeatDaily) ? 'DAILY' : 'WEEKLY';
      const repeatEvery = get(
        datum,
        'repeat.repeatDaily.repeatEvery',
        get(datum, 'repeat.repeatWeekly.repeatEveryNumWeeks', 1)
      );
      const startDate = moment(startTime * 1000);
      const startDateISO = getRRuleISO(startDate);
      const dateInWeek = !isEmpty(datum.repeat.repeatWeekly)
        ? toUpper(datum.repeat.repeatWeekly.repeatOn).substring(0, 2)
        : undefined;
      const occurrences = get(datum, 'repeatEnd.afterNumOccurrences');
      const endOnDate = get(datum, 'repeatEnd.repeatEndOn');

      return (
        `FREQ=${repeatType}` +
        `;DTSTART=${startDateISO}` +
        `;INTERVAL=${repeatEvery}` +
        `${dateInWeek ? `;BYDAY=${dateInWeek}` : ''}` +
        `${occurrences ? `;COUNT=${occurrences}` : ''}` +
        `${endOnDate ? `;UNTIL=${getRRuleISO(endOnDate * 1000)}` : ''}`
      );
    })()
  };
}

const initialState = {
  providers: [],
  calendarData: [],
  tzOptions: [],
  geoOptions: [],
  serviceOptions: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_BY_BUSINESS_ID.SUCCESS:
      return {
        ...state,
        providers: flow(
          input =>
            map(input, p => ({
              id: p.id,
              name: p.givenName,
              timezone: p.providerInformation.timeZoneId
            })),
          input => sortBy(input, 'name')
        )(action.providers)
      };
    case FETCH_NORM_EVENTS_BY_PROVIDER.SUCCESS:
      return {
        ...state,
        calendarData: action.calendarData
          .map(datum => buildCalendarData(datum))
          .sort((prev, next) => {
            return prev.start < next.start ? -1 : 1;
          })
      };
    case CREATE_CALENDAR_EVENT.SUCCESS: {
      return {
        ...state,
        calendarData: [buildCalendarData(action.newEvent), ...state.calendarData].sort((prev, next) => {
          return prev.start < next.start ? -1 : 1;
        })
      };
    }
    case FETCH_GEO_OPTIONS.SUCCESS: {
      return {
        ...state,
        geoOptions: action.geoOptions
      };
    }
    case CALENDAR_LOADING:
      return { ...state, isLoading: action.isLoading };
    case FETCH_TIMEZONE_OPTIONS.SUCCESS:
      return { ...state, tzOptions: action.payload };
    case FETCH_SERVICE_OPTIONS.SUCCESS:
      return { ...state, serviceOptions: action.payload };
    default:
      return state;
  }
};

export default reducer;
