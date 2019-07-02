import { flow, map, sortBy } from 'lodash';
import {
  FETCH_PROVIDER_BY_BUSINESS_ID,
  FETCH_EVENTS_BY_PROVIDERS,
  CALENDAR_LOADING,
  FETCH_TIMEZONE_OPTIONS,
  CREATE_CALENDAR_EVENT,
  EVENT_TYPE_TITLE,
  FETCH_GEO_OPTIONS,
  FETCH_SERVICE_OPTIONS
} from 'constants/Calendar.constants';

const buildCalendarData = ({
  slot: { startTime, endTime } = {},
  timezoneId,
  id,
  description,
  type,
  providerId
}) => ({
  id,
  body: description,
  start: startTime * 1000,
  end: endTime * 1000,
  title: EVENT_TYPE_TITLE[type],
  calendarId: type,
  category: 'time',
  isReadOnly: true,
  providerId
});

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
              name: `${p.familyName || ''} ${p.givenName}`,
              timezone: p.providerInformation.timeZoneId
            })),
          input => sortBy(input, 'name')
        )(action.providers)
      };
    case FETCH_EVENTS_BY_PROVIDERS.SUCCESS:
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
