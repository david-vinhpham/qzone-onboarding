import moment from 'moment';
import { flow, map, sortBy } from 'lodash';
import { DATETIME_FORMAT } from 'react-big-scheduler';
import {
  FETCH_PROVIDER_BY_ORG,
  FETCH_NORM_EVENTS_BY_PROVIDER,
  CALENDAR_LOADING,
  CREATE_NORM_EVENT
} from 'constants/Calendar.constants';

function buildCalendarData(datum) {
  return {
    ...datum,
    id: datum.id,
    start: moment((datum.slot || {}).startTime * 1000).format(DATETIME_FORMAT),
    end: moment((datum.slot || {}).endTime * 1000).format(DATETIME_FORMAT),
    resourceId: datum.providerId,
    title: datum.type,
    rrule: (() => {
      if (!datum.isAllowRepeat) return undefined;

      const startDate = moment(datum.startSec * 1000);
      const dateInWeek = startDate.format('dd').toUpperCase();
      const startDateISO = startDate
        .toISOString()
        .replace(/([^a-zA-Z\d\\.])|(\.([^\\.]+)[^Z])/g, '');
      return `FREQ=WEEKLY;DTSTART=${startDateISO};BYDAY=${dateInWeek}`;
    })()
  };
}

const initialState = {
  providers: [],
  calendarData: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_BY_ORG.SUCCESS:
      return {
        ...state,
        providers: flow(
          input =>
            map(input, p => ({
              id: p.id,
              name: p.givenName
            })),
          input => sortBy(input, 'name')
        )(action.providers)
      };
    case FETCH_NORM_EVENTS_BY_PROVIDER.SUCCESS:
      return {
        ...state,
        calendarData: action.calendarData.map(datum => buildCalendarData(datum))
      };
    case CREATE_NORM_EVENT.SUCCESS: {
      return {
        ...state,
        calendarData: [buildCalendarData(action.newEvent), ...state.calendarData]
      };
    }
    case CALENDAR_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export default reducer;
