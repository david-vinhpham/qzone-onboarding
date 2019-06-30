import axios from 'axios';
import { get, reduce, flow, compact, map } from 'lodash';

import { API_ROOT, URL } from 'config/config';
import {
  CALENDAR_LOADING,
  FETCH_EVENTS_BY_PROVIDERS,
  FETCH_PROVIDER_BY_BUSINESS_ID,
  CREATE_CALENDAR_EVENT,
  EVENT_TYPE,
  FETCH_GEO_OPTIONS,
  FETCH_TIMEZONE_OPTIONS,
  FETCH_SERVICE_OPTIONS
} from 'constants/Calendar.constants';
import {tmp_service} from "../constants/TmpServices.constants";

const calendarLoading = isLoading => ({
  type: CALENDAR_LOADING,
  isLoading
});

const fetchEventsByProvidersSuccess = calendarData => ({
  type: FETCH_EVENTS_BY_PROVIDERS.SUCCESS,
  calendarData
});

const fetchProvidersByBusinessIdSuccess = providers => ({
  type: FETCH_PROVIDER_BY_BUSINESS_ID.SUCCESS,
  providers
});

const createEventSuccess = newEvent => ({
  type: CREATE_CALENDAR_EVENT.SUCCESS,
  newEvent
});

const fetchGeoOptionsSuccess = geoOptions => ({
  type: FETCH_GEO_OPTIONS.SUCCESS,
  geoOptions
});

export const fetchGeoLocationOptions = () => dispatch => {
  axios
    .get(`${API_ROOT}${URL.GET_GEO_LOCATION_OPTIONS}`)
    .then(resp => {
      const data = get(resp, 'data.objects', []);
      dispatch(fetchGeoOptionsSuccess(data));
    });
}

export const fetchServiceOptions = businessAdminId => dispatch => {
  axios.get(`${API_ROOT}${URL.FETCH_SERVICES_OPTION_BY_BUSINESS_ADMIN_ID}${businessAdminId}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_SERVICE_OPTIONS.SUCCESS,
        payload: data && data.objects ? data.objects : [],
      });
    });
};

export const fetchTimezoneOptions = () => dispatch => {
  axios.get(`${API_ROOT}${URL.TIMEZONE_OPTION}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_TIMEZONE_OPTIONS.SUCCESS,
        payload: data && data.objects ? data.objects : []
      });
    });
};

export const fetchProvidersByBusinessId = businessId => dispatch => {
  return axios
    .get(`${API_ROOT}${URL.FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID}${businessId}`)
    .then((response) => {
      if (response) {
        const providers = get(response, 'data.objects', []);
        dispatch(fetchProvidersByBusinessIdSuccess(providers));
      }
    });
};

export const fetchEventsByBusinessId = businessId => dispatch => {
  dispatch(calendarLoading(true));

  return axios
    .get(`${API_ROOT}${URL.FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID}${businessId}`)
    .then((response) => {
      if (response) {
        const data = response.data;
        const providers = data && data.objects ? data.objects : [];
        const providerIds = flow(
          providerData => map(providerData, pData => get(pData, 'id')),
          providerData => compact(providerData)
        )(providers);

        /* Fetch events of providers */
        const fetchEvents = [];
        providerIds.forEach(providerId => {
          fetchEvents.push(axios.get(`${API_ROOT}${URL.FIND_NORMAL_EVENTS_BY_PROVIDER_ID}${providerId}`));
          fetchEvents.push(axios.get(`${API_ROOT}${URL.FIND_TMP_SERVICES_BY_PROVIDER_ID}${providerId}`));
          fetchEvents.push(axios.get(`${API_ROOT}${URL.FIND_APPOINTMENTS_CUSTOMER_EVENTS_BY_PROVIDER_ID}${providerId}`));
        });

        return Promise.all(fetchEvents).then(rep => {
          const tmpEvents = reduce(rep, (acc, event) => acc.concat(get(event, 'data.objects', [])), []);
          const events = [];
          tmpEvents.forEach(e => {
            let slots = [];
            if (e.slots && e.slots.length > 0) {
              slots = e.slots.slice();
              delete e.slots;
            } else {
              slots = [{ ...e.slot }];
            }

            slots.forEach((slot, index) => {
              events.push({
                ...e,
                id: `${e.id}-repeat-${index}`,
                slot,
                type: e.type || EVENT_TYPE.TMP_SERVICE,
                timezone: providers.find(p => p.id === e.providerId).providerInformation.timeZoneId,
              })
            });
          });
          dispatch(fetchEventsByProvidersSuccess(events));
          dispatch(fetchProvidersByBusinessIdSuccess(providers));
        });
      }
    })
    .finally(() => {
      dispatch(calendarLoading(false));
      fetchGeoLocationOptions()(dispatch);
      fetchServiceOptions(businessId)(dispatch);
      fetchTimezoneOptions()(dispatch);
    });
};

export const createNewEvent = newEvent => dispatch => {
  dispatch(calendarLoading(true));

  let api = URL.NEW_NORMAL_EVENT;

  if (newEvent.type === EVENT_TYPE.TMP_SERVICE) {
    api = URL.NEW_TMP_SERVICE;
  }

  if (newEvent.type === EVENT_TYPE.APPOINTMENT) {
    api = URL.NEW_APPOINTMENTS_CUSTOMER_EVENT;
  }

  return axios
    .post(`${API_ROOT}${api}`, newEvent)
    .then(response => {
      if (response) {
        const data = get(response, 'data.object', {});
        if (response.data.success === false) {
          dispatch({
            type: tmp_service.TMP_SERVICE_FAILURE,
            payload: response.data.message
          });
        } else {
          const event = {
            ...data,
            type: data.type || newEvent.type
          };
          if (newEvent.type === EVENT_TYPE.TMP_SERVICE) {
            const tmpServices = localStorage.getItem('tmpServices');
            if (tmpServices !== null) {
              const listTmpServices = JSON.parse(tmpServices);
              listTmpServices.push(data);
              localStorage.setItem('tmpServices', JSON.stringify(listTmpServices));
              console.log('listTmpServices {}', listTmpServices.length)
              dispatch({
                type: tmp_service.SET_TMP_SERVICE,
                payload: listTmpServices
              });
            }
          }
          dispatch(createEventSuccess(event));
        }
      }
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};
