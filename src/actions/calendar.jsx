import axios from 'axios';
import { get, reduce, flow, compact, map } from 'lodash';

import { API_ROOT, URL } from 'config/config';
import {
  CALENDAR_LOADING,
  FETCH_NORM_EVENTS_BY_PROVIDER,
  FETCH_PROVIDER_BY_ORG,
  CREATE_NORM_EVENT,
  EVENT_TYPE
} from 'constants/Calendar.constants';

export const calendarLoading = isLoading => ({
  type: CALENDAR_LOADING,
  isLoading
});

export const fetchNormalEventByProvidersSuccess = calendarData => ({
  type: FETCH_NORM_EVENTS_BY_PROVIDER.SUCCESS,
  calendarData
});

export const fetchProvidersByOrgSuccess = providers => ({
  type: FETCH_PROVIDER_BY_ORG.SUCCESS,
  providers
});

export const createNormalEventSuccess = newEvent => ({
  type: CREATE_NORM_EVENT.SUCCESS,
  newEvent
});

export const fetchNormalEventByBusinessId = businessId => dispatch => {
  dispatch(calendarLoading(true));

  /* Fetch orgs by business Id */
  return axios
    .get(`${API_ROOT}${URL.FIND_ORGS_BY_BUSINESS_ID}${businessId}`)
    .then(({ data: orgData }) => {
      const orgIds = get(orgData, 'objects', []);

      /* Fetch providers by Organization Ids */
      const orgFetchMap = orgIds.map(({ id }) =>
        axios.get(`${API_ROOT}${URL.FIND_PROVIDER_BY_ORG_ID}${id}`)
      );
      return Promise.all(orgFetchMap).then(responses => {
        const providers = reduce(responses, (a, d) => a.concat(get(d, 'data.objects', [])), []);
        const providerIds = flow(
          providerData => map(providerData, data => get(data, 'id')),
          providerData => compact(providerData)
        )(providers);

        /* Fetch events of providers */
        const providerFetchMap = providerIds.map(providerId =>
          axios.get(`${API_ROOT}${URL.FIND_NORMAL_EVENTS_BY_PROVIDER_ID}${providerId}`)
        );

        return Promise.all(providerFetchMap).then(rep => {
          const events = reduce(rep, (acc, { data }) => acc.concat(get(data, 'objects', [])), []);
          dispatch(fetchNormalEventByProvidersSuccess(events));
          dispatch(fetchProvidersByOrgSuccess(providers));
        });
      });
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};

export const createNewEvent = newEvent => dispatch => {
  dispatch(calendarLoading(true));

  const api = newEvent.type === EVENT_TYPE.SPECIAL ? URL.NEW_SPECIAL_EVENT : URL.NEW_NORMAL_EVENT;
  return axios
    .post(`${API_ROOT}${api}`, newEvent)
    .then(response => {
      const data = get(response, 'data.object', {});
      dispatch(createNormalEventSuccess(data));
    })
    .finally(() => {
      dispatch(calendarLoading(false));
    });
};
