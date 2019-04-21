import moment from 'moment-timezone';
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
  return date
    .toISOString()
    .replace(/([^a-zA-Z\d\\.])|(\.([^\\.]+)[^Z])/g, '');
}

function buildCalendarData(datum) {
  const { slot: { startTime, endTime } = {} } = datum;
  const startDate = moment.tz(startTime * 1000, datum.timezone);
  const endDate = moment.tz(endTime * 1000, datum.timezone);

  return {
    id: datum.id,
    description: datum.description,
    providerId: datum.providerId,
    type: datum.type,
    start: startDate.format(DATETIME_FORMAT),
    end: endDate.format(DATETIME_FORMAT),
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
        `${endOnDate ? `;UNTIL=${getRRuleISO(moment.tz(endOnDate * 1000, datum.timezone))}` : ''}`
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
          .map(buildCalendarData)
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
    case FETCH_GEO_OPTIONS.SUCCESS:
      return { ...state, geoOptions: action.geoOptions };
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
