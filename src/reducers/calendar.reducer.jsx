import { flow, map, sortBy } from 'lodash';
import { EVENT_TYPE_TITLE } from 'constants/Calendar.constants';
import { FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS, FETCH_EVENTS_BY_PROVIDERS_SUCCESS, CREATE_CALENDAR_EVENT_SUCCESS, CALENDAR_LOADING, FETCH_SLOTS_BY_TMP_SERVICE_SUCCESS, FETCH_SLOTS_BY_TMP_SERVICE_LOADING, DELETE_EVENT_SUCCESS } from 'actions/calendar';

const buildCalendarData = ({
  slot: { startTime, endTime } = {},
  id,
  description,
  type,
  providerId,
  title,
  raw
}) => ({
  id,
  body: description,
  start: startTime * 1000,
  end: endTime * 1000,
  title: title || EVENT_TYPE_TITLE[type],
  calendarId: type,
  category: 'time',
  providerId,
  raw
});

const initialState = {
  providers: [],
  calendarData: [],
  isLoading: false,
  bookingSlots: [],
  bookingEventId: '',
  isFetchBookingSlots: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS:
      return {
        ...state,
        providers: flow(
          input =>
            map(input, p => ({
              id: p.id,
              name: `${p.familyName || ''} ${p.givenName}`,
              timezone: p.providerInformation.timeZoneId,
              workingHours: p.providerInformation.workingHours,
            })),
          input => sortBy(input, 'name')
        )(action.providers)
      };
    case FETCH_EVENTS_BY_PROVIDERS_SUCCESS:
      return {
        ...state,
        calendarData: action.calendarData
          .map(buildCalendarData)
          .sort((prev, next) => {
            return prev.start < next.start ? -1 : 1;
          })
      };
    case CREATE_CALENDAR_EVENT_SUCCESS: {
      return {
        ...state,
        calendarData: [buildCalendarData(action.newEvent), ...state.calendarData].sort((prev, next) => {
          return prev.start < next.start ? -1 : 1;
        })
      };
    }
    case CALENDAR_LOADING:
      return { ...state, isLoading: action.isLoading };
    case FETCH_SLOTS_BY_TMP_SERVICE_SUCCESS:
      return { ...state, ...action.payload };
    case FETCH_SLOTS_BY_TMP_SERVICE_LOADING:
      return { ...state, isFetchBookingSlots: action.payload };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        calendarData: state.calendarData.filter(data => data.id !== action.payload),
      }
    default:
      return state;
  }
};

export default reducer;
