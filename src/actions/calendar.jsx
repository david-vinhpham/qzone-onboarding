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

export const calendarLoading = isLoading => ({
  type: CALENDAR_LOADING,
  isLoading
});

export const fetchEventsByProvidersSuccess = calendarData => ({
  type: FETCH_EVENTS_BY_PROVIDERS.SUCCESS,
  calendarData
});

export const fetchProvidersByBusinessIdSuccess = providers => ({
  type: FETCH_PROVIDER_BY_BUSINESS_ID.SUCCESS,
  providers
});

export const createEventSuccess = newEvent => ({
  type: CREATE_CALENDAR_EVENT.SUCCESS,
  newEvent
});

export const fetchGeoOptionsSuccess = geoOptions => ({
  type: FETCH_GEO_OPTIONS.SUCCESS,
  geoOptions
});

const fetchGeoLocationOptions = dispatch => {
  axios
    .get(`${API_ROOT}${URL.GET_GEO_LOCATION_OPTIONS}`)
    .then(resp => {
      const data = get(resp, 'data.objects', []);
      dispatch(fetchGeoOptionsSuccess(data));
    });
}

const fetchServiceOptions = businessAdminId => {
  return dispatch => {
    axios.get(`${API_ROOT}${URL.FETCH_SERVICES_OPTION_BY_BUSINESS_ADMIN_ID}${businessAdminId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_SERVICE_OPTIONS.SUCCESS,
          payload: data && data.objects ? data.objects : [],
        });
      });
  };
};

const fetchTimezoneOptions = dispatch => {
  axios.get(`${API_ROOT}${URL.TIMEZONE_OPTION}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_TIMEZONE_OPTIONS.SUCCESS,
        payload: data && data.objects ? data.objects : []
      });
    });
};

export const fetchNormalEventByBusinessId = businessId => dispatch => {
  dispatch(calendarLoading(true));

  return axios
    .get(`${API_ROOT}${URL.FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID}${businessId}`)
    .then(({ data }) => {
      const providers = data && data.objects ? data.objects : [];
      const providerIds = flow(
        providerData => map(providerData, data => get(data, 'id')),
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
        const tmpEvents = reduce(rep, (acc, { data }) => acc.concat(get(data, 'objects', [])), []);
        const events = tmpEvents.map(e => ({
          ...e,
          type: e.type || EVENT_TYPE.TMP_SERVICE,
          timezone: providers.find(p => p.id === e.providerId).providerInformation.timeZoneId,
        }));
        dispatch(fetchEventsByProvidersSuccess(events));
        dispatch(fetchProvidersByBusinessIdSuccess(providers));
      });
    })
    .finally(() => {
      dispatch(calendarLoading(false));
      fetchGeoLocationOptions(dispatch);
      fetchServiceOptions(businessId)(dispatch);
      fetchTimezoneOptions(dispatch);
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
      const data = get(response, 'data.object', {});
      const event = {
        ...data,
        type: data.type || newEvent.type
      };
      if(newEvent.type === EVENT_TYPE.TMP_SERVICE) {
        const tmpServices = localStorage.getItem('tmpServices');
        if (tmpServices !== null) {
          const listTmpServices = JSON.parse(tmpServices);
          listTmpServices.push(data);
          localStorage.setItem('tmpServices', JSON.stringify(listTmpServices));
        }
      }
      dispatch(createEventSuccess(event));
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};
