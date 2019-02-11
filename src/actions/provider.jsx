import {provider} from '../constants/Provider.constants';
import {API_ROOT, URL} from '../config/config';

export const fetchTimezones = () => {
  return (dispatch) => {
    dispatch({ type: provider.FETCH_TIMEZONES_LOADING })
    fetch(API_ROOT + URL.GET_TIMEZONES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: provider.FETCH_TIMEZONES_SUCCESS,
            payload: data.objects
        })
    })
    .catch(err => {
        dispatch({
            type: provider.FETCH_TIMEZONES_FAILURE,
            payload: err
        })
    })
}
}

export function fetchProviders() {
  let orgId = localStorage.getItem('organizationId');

  return (dispatch) => {
    dispatch(getProviders());
    fetch(API_ROOT + URL.FETCH_PROVIDERS_BY_ORG_ID + orgId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log("json-----------", json)
      if (json.objects) {
        dispatch(fetchProvidersSuccess(json.objects));
      } else {
        dispatch(fetchProvidersFailure("Topology Error"))
      }
      return json;
    })
    .catch(err => dispatch(fetchProvidersFailure(err)))
  };
};

export function getProviders() {
  return {
    type: provider.FETCH_PROVIDERS
  }
}

export function fetchProvidersSuccess(providers) {
  return {
    type: provider.FETCH_PROVIDERS_SUCCESS,
    payload: { providers }
  }
}

export function fetchProvidersFailure(error) {
  return {
    type: provider.FETCH_PROVIDERS_FAILURE,
    payload: { error }
  }
}

export function createProvider(values, history) {
  console.log("values-", values);
  return (dispatch) => {
      dispatch({ type: provider.CREATE_PROVIDER_LOADING })
        fetch(API_ROOT + URL.PROVIDER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(json => {
          console.log("json-------", json)
          dispatch({ type: provider.CREATE_PROVIDER_SUCCESS, payload: json.object });
          history.push('/provider/list');
        })
        .catch(err => dispatch({ type: provider.CREATE_PROVIDER_FAILURE, payload: err}))
  };
}

export function postProvider() {
  return {
    type: provider.CREATE_PROVIDER
  }
}

export function createProviderSuccess(providers) {
  return {
    type: provider.CREATE_PROVIDER_SUCCESS,
    payload: { providers }
  }
}

export function createProviderFailure(error) {
  return {
    type: provider.CREATE_PROVIDER_FAILURE,
    payload: { error }
  }
}

export function fetchProvider(id) {
  return (dispatch) => {
      fetch(API_ROOT + URL.PROVIDER + '/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log("jaon-----", json)
        if (json.object) {
          dispatch(fetchProviderSuccess(json.object));
        } else {
          dispatch(fetchProviderFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(fetchProviderFailure(err)))
  };
}

export function getProvider() {
  return {
    type: provider.FETCH_PROVIDER
  }
}

export function fetchProviderSuccess(data) {
  return {
    type: provider.FETCH_PROVIDER_SUCCESS,
    payload: { data }
  }
}

export function fetchProviderFailure(error) {
  return {
    type: provider.FETCH_PROVIDER_FAILURE,
    payload: { error }
  }
}
