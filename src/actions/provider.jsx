import axios from 'axios';
import { provider } from '../constants/Provider.constants';
import { URL } from '../config/config';

export const fetchTimezones = () => {
  return dispatch => {
    dispatch({ type: provider.FETCH_TIMEZONES_LOADING });
    axios.get(URL.TIMEZONE)
      .then(({ data }) => {
        dispatch({
          type: provider.FETCH_TIMEZONES_SUCCESS,
          payload: data.objects
        });
      })
      .catch(err => {
        dispatch({
          type: provider.FETCH_TIMEZONES_FAILURE,
          payload: err
        });
      });
  };
};

export function fetchProvidersLoading() {
  return {
    type: provider.FETCH_PROVIDERS_LOADING
  };
}

export function fetchProvidersSuccess(providers) {
  return {
    type: provider.FETCH_PROVIDERS_SUCCESS,
    payload: { providers }
  };
}

export function fetchProvidersFailure(error) {
  return {
    type: provider.FETCH_PROVIDERS_FAILURE,
    payload: { error }
  };
}

export function fetchProvidersByOrdId(orgId) {
  return dispatch => {
    dispatch(fetchProvidersLoading());
    axios.get(`${URL.FETCH_PROVIDERS_BY_ORG_ID}/${orgId}`)
      .then(({ data }) => {
        if (data.objects) {
          dispatch(fetchProvidersSuccess(data.objects));
        } else {
          dispatch(fetchProvidersFailure('Topology Error'));
        }
        return data;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)));
  };
}

export function fetchProvidersOptionByServiceProviderId(serviceProviderId) {
  return dispatch => {
    dispatch(fetchProvidersLoading());
    axios.get(`${URL.FETCH_PROVIDERS_OPTION_BY_SERVICE_PROVIDER_ID}/${serviceProviderId}`)
      .then(({ data }) => {
        if (data.objects) {
          dispatch(fetchProvidersSuccess(data.objects));
        } else {
          dispatch(fetchProvidersFailure('Topology Error'));
        }
        return data;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)));
  };
}

export function fetchProvidersOptionByOrdId(orgId) {
  return dispatch => {
    dispatch(fetchProvidersLoading());
    axios.get(`${URL.FETCH_PROVIDERS_OPTION_BY_ORG_ID}/${orgId}`)
      .then(({ data }) => {
        if (data.objects) {
          dispatch(fetchProvidersSuccess(data.objects));
        } else {
          dispatch(fetchProvidersFailure('Topology Error'));
        }
        return data;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)));
  };
}

export function fetchProvidersOptionByServiceId(serviceId) {
  return dispatch => {
    dispatch(fetchProvidersLoading());
    axios.get(`${URL.FETCH_PROVIDERS_OPTION_BY_SERVICE_ID}/${serviceId}`)
      .then(({ data }) => {
        if (data.objects) {
          dispatch(fetchProvidersSuccess(data.objects));
        } else {
          dispatch(fetchProvidersFailure(data));
        }
        return data;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)));
  };
}
export function fetchProvidersByBusinessAdminId(businessAdminId) {
  return dispatch => {
    dispatch(fetchProvidersLoading());
    axios.get(`${URL.FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID}/${businessAdminId}`)
      .then(({ data }) => {
        if (data.objects) {
          dispatch(fetchProvidersSuccess(data.objects));
        } else {
          dispatch(fetchProvidersFailure('Topology Error'));
        }
        return data;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)));
  };
}

export const editProviderLoading = () => {
  return {
    type: provider.EDIT_PROVIDER_LOADING
  };
};

export const editProviderSuccess = data => {
  return {
    type: provider.EDIT_PROVIDER_SUCCESS,
    payload: data.object
  };
};

export const editProviderFailure = error => {
  return {
    type: provider.EDIT_PROVIDER_FAILURE,
    payload: error
  };
};

export const deleteProvider = providerId => {
  return dispatch => {
    dispatch({ type: provider.DEL_PROVIDER_LOADING });
    axios.delete(`${URL.USER}/${providerId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: provider.DEL_PROVIDER_SUCCESS,
            payload: data.object
          });
          const sub = localStorage.getItem('userSub');
          dispatch(fetchProvidersByBusinessAdminId(sub));
        } else {
          dispatch({
            type: provider.DEL_PROVIDER_FAILURE,
            payload: data
          });
        }
      });
  };
};

export function editProvider(values, history) {
  return dispatch => {
    dispatch(editProviderLoading());
    axios.put(URL.AWS_USER, values)
      .then(({ data }) => {
        if (data.success) {
          history.push('/provider/list');
        } else {
          dispatch(editProviderFailure(data));
        }
      })
      .catch(err => {
        dispatch(editProviderFailure(err));
      });
  };
}

export function createProviderSuccess(providers) {
  return {
    type: provider.CREATE_PROVIDER_SUCCESS,
    payload: { providers }
  };
}

export function createProviderFailure(error) {
  return {
    type: provider.CREATE_PROVIDER_FAILURE,
    payload: { error }
  };
}

export function createProvider(values, history) {
  return dispatch => {
    dispatch({ type: provider.CREATE_PROVIDER_LOADING });
    axios.post(URL.ADMIN_CREATE_AWS_USER, values)
      .then(({ data }) => {
        if (data.success) {
          dispatch(createProviderSuccess(data));
          history.push('/provider/list');
        } else {
          dispatch(createProviderFailure(data));
        }
      })
      .catch(err => dispatch(createProviderFailure(err)));
  };
}

export function fetchProviderLoading() {
  return {
    type: provider.FETCH_PROVIDER_LOADING
  };
}

export function fetchProviderSuccess(data) {
  return {
    type: provider.FETCH_PROVIDER_SUCCESS,
    payload: { data }
  };
}

export function fetchProviderFailure(error) {
  return {
    type: provider.FETCH_PROVIDER_FAILURE,
    payload: { error }
  };
}

export function fetchProvider(id) {
  return dispatch => {
    dispatch(fetchProviderLoading());
    axios.get(`${URL.PROVIDER}/${id}`)
      .then(({ data }) => {
        if (data.object) {
          dispatch(fetchProviderSuccess(data.object));
        } else {
          dispatch(fetchProviderFailure('Topology Error'));
        }
        return data;
      })
      .catch(err => dispatch(fetchProviderFailure(err)));
  };
}
