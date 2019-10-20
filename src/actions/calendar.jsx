import axios from 'axios';
import { get, reduce } from 'lodash';

import { URL } from 'config/config';
import { EVENT_TYPE } from 'constants/Calendar.constants';
import { tmp_service } from "../constants/TmpServices.constants";
import { handleRequest } from 'utils/apiHelpers';
import { showAlert } from './alert';

export const CALENDAR_LOADING = 'CALENDAR_LOADING';
export const FETCH_EVENTS_BY_PROVIDERS_SUCCESS = 'FETCH_EVENTS_BY_PROVIDERS_SUCCESS';
export const FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS = 'FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS';
export const CREATE_CALENDAR_EVENT_SUCCESS = 'CREATE_CALENDAR_EVENT_SUCCESS';
export const CREATE_CALENDAR_EVENT_FAILURE = 'CREATE_CALENDAR_EVENT_FAILURE';
export const FETCH_SLOTS_BY_TMP_SERVICE_SUCCESS = 'FETCH_SLOTS_BY_TMP_SERVICE_SUCCESS';

const calendarLoading = isLoading => ({
  type: CALENDAR_LOADING,
  isLoading
});

const fetchEventsByProvidersSuccess = calendarData => ({
  type: FETCH_EVENTS_BY_PROVIDERS_SUCCESS,
  calendarData
});

export const fetchProvidersByBusinessIdSuccess = providers => ({
  type: FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS,
  providers
});

const createEventSuccess = newEvent => ({
  type: CREATE_CALENDAR_EVENT_SUCCESS,
  newEvent
});

export const fetchProvidersByBusinessId = businessId => dispatch => {
  dispatch(calendarLoading(true));
  return axios
    .get(`${URL.FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID}${businessId}`)
    .then((response) => {
      if (response && response.data.success) {
        const providers = get(response, 'data.objects', []);
        dispatch(fetchProvidersByBusinessIdSuccess(providers));
      }
    })
    .finally(() => { dispatch(calendarLoading(false)); });
};

export const fetchEventsByProviderId = providerId => dispatch => {
  dispatch(calendarLoading(true));

  const fetchEvents = [];
  fetchEvents.push(axios.get(`${URL.FIND_NORMAL_EVENTS_BY_PROVIDER_ID}${providerId}`));
  fetchEvents.push(axios.get(`${URL.FIND_TMP_EVENTS_BY_PROVIDER_ID}${providerId}`));
  fetchEvents.push(axios.get(`${URL.FIND_APPOINTMENTS_CUSTOMER_EVENTS_BY_PROVIDER_ID}${providerId}`));

  Promise.all(fetchEvents)
    .then((eventsResp) => {
      const tmpEvents = reduce(eventsResp, (acc, resp) => {
        const listEvent = get(resp, 'data.objects', []);
        return acc.concat(listEvent.map(e => ({
          ...e,
          providerId: resp.config.url.split('/').slice(-1)[0],
        })));
      }, []);
      const events = tmpEvents.map((e, index) => ({
        id: e.id,
        providerId: e.providerId,
        title: e.title,
        type: e.type,
        slot: { startTime: e.istart, endTime: e.iend },
        raw: { resourceId: e.resourceId, phone: e.phone, tempServiceId: e.tempServiceId },
        description: '',
      }));

      dispatch(fetchEventsByProvidersSuccess(events));
    })
    .finally(() => { dispatch(calendarLoading(false)); });
};

export const createNewEvent = newEvent => (dispatch, getState) => {
  dispatch(calendarLoading(true));

  let api = URL.NEW_NORMAL_EVENT;

  if (newEvent.type === EVENT_TYPE.TMP_SERVICE) {
    api = URL.NEW_TMP_SERVICE;
  }

  if (newEvent.type === EVENT_TYPE.CUSTOMER_APPOINTMENT) {
    api = URL.NEW_APPOINTMENTS_CUSTOMER_EVENT;
  }

  return axios
    .post(api, newEvent)
    .then(response => {
      if (response) {
        const data = get(response, 'data.object', {});
        if (response.data.success) {
          const event = {
            ...data,
            type: data.type || newEvent.type
          };

          if (newEvent.type === EVENT_TYPE.TMP_SERVICE) {
            dispatch({
              type: tmp_service.FETCH_TMP_SERVICES_SUCCESS,
              payload: [...getState().tmpServices.list, data]
            });
          } else {
            dispatch(createEventSuccess({
              id: event.id,
              providerId: event.providerId,
              title: event.title,
              type: event.type,
              slot: { startTime: event.istart, endTime: event.iend },
              raw: { resourceId: event.resourceId, phone: event.phone, tempServiceId: event.tempServiceId },
              description: '',
            }));
          }
        }
      }
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};

export const setBookingSlots = (payload) => ({
  type: FETCH_SLOTS_BY_TMP_SERVICE_SUCCESS,
  payload
});

export const getSlotsByTmpServiceId = (tmpServiceId, bookingEventId) => async dispatch => {
  const [result] = await handleRequest(axios.get, [`${URL.FIND_AVAILABILITY_BY_TMP_SERVICE}/${tmpServiceId}`]);
  if (result) {
    dispatch(setBookingSlots({ bookingSlots: result, bookingEventId }));
  }
}

export const rescheduleBookingEvent = (payload, providerId) => async dispatch => {
  dispatch(setBookingSlots({ bookingSlots: [], bookingEventId: '' }));

  const [result] = await handleRequest(axios.put, [URL.RESCHEDULE_BOOKING_EVENT, payload]);
  if (result) {
    dispatch(showAlert('success', 'Reschedule the event successfully!'));
    dispatch(fetchEventsByProviderId(providerId));
  }
}

export const cancelBookingEvent = (bookingEventId, providerId) => async dispatch => {
  const [result] = await handleRequest(axios.delete, [`${URL.CANCEL_BOOKING_EVENT}${bookingEventId}`]);
  if (result) {
    dispatch(showAlert('success', 'Cancel the event successfully!'));
    dispatch(fetchEventsByProviderId(providerId));
  }
}
