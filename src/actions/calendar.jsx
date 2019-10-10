import axios from 'axios';
import { get, reduce } from 'lodash';

import { URL } from 'config/config';
import {
  CALENDAR_LOADING,
  FETCH_EVENTS_BY_PROVIDERS,
  FETCH_PROVIDER_BY_BUSINESS_ID,
  CREATE_CALENDAR_EVENT,
  EVENT_TYPE
} from 'constants/Calendar.constants';
import { tmp_service } from "../constants/TmpServices.constants";

const calendarLoading = isLoading => ({
  type: CALENDAR_LOADING,
  isLoading
});

const fetchEventsByProvidersSuccess = calendarData => ({
  type: FETCH_EVENTS_BY_PROVIDERS.SUCCESS,
  calendarData
});

export const fetchProvidersByBusinessIdSuccess = providers => ({
  type: FETCH_PROVIDER_BY_BUSINESS_ID.SUCCESS,
  providers
});

const createEventSuccess = newEvent => ({
  type: CREATE_CALENDAR_EVENT.SUCCESS,
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
        type: e.type || EVENT_TYPE.TMP_EVENTS,
        slot: { startTime: e.istart, endTime: e.iend },
        raw: e.resourceId,
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

  if (newEvent.type === EVENT_TYPE.APPOINTMENT) {
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
          }

          dispatch(createEventSuccess(event));
        }
      }
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};
