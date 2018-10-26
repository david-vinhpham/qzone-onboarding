import axios from 'axios';

export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';
export const FETCH_PROVIDERS_SUCCESS = 'FETCH_PROVIDERS_SUCCESS';
export const FETCH_PROVIDERS_FAILURE = 'FETCH_PROVIDERS_FAILURE';

export const CREATE_PROVIDER = 'CREATE_PROVIDER';
export const CREATE_PROVIDER_SUCCESS = 'CREATE_PROVIDER_SUCCESS';
export const CREATE_PROVIDER_FAILURE = 'CREATE_PROVIDER_FAILURE';

export const FETCH_PROVIDER = 'FETCH_PROVIDER';
export const FETCH_PROVIDER_SUCCESS = 'FETCH_PROVIDER_SUCCESS';
export const FETCH_PROVIDER_FAILURE = 'FETCH_PROVIDER_FAILURE';

const ROOT_URL = `http://35.189.61.189:8080/`;

export function fetchProviders() {
  return (dispatch) => {
    fetch(ROOT_URL + `providers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        dispatch(fetchProvidersSuccess(json.success));
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
    type: FETCH_PROVIDERS
  }
}

export function fetchProvidersSuccess(providers) {
  return {
    type: FETCH_PROVIDERS_SUCCESS,
    payload: { providers }
  }
}

export function fetchProvidersFailure(error) {
  return {
    type: FETCH_PROVIDERS_FAILURE,
    payload: { error }
  }
}

export function createProvider(values) {
  return (dispatch) => {
    fetch(ROOT_URL + `providers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: values
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch(createProviderSuccess(json.success));
        } else {
          dispatch(createProviderFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(createProviderFailure(err)))
  };
}

export function postProvider() {
  return {
    type: CREATE_PROVIDER
  }
}

export function createProviderSuccess(providers) {
  return {
    type: CREATE_PROVIDER_SUCCESS,
    payload: { providers }
  }
}

export function createProviderFailure(error) {
  return {
    type: CREATE_PROVIDER_FAILURE,
    payload: { error }
  }
}

export function fetchProvider(id) {
  const request = axios.get(`${ROOT_URL}/${id}`)
  return (dispatch) => {
    fetch(ROOT_URL + `${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch(createProviderSuccess(json.success));
        } else {
          dispatch(createProviderFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(createProviderFailure(err)))
  };
}

export function getProvider() {
  return {
    type: FETCH_PROVIDER
  }
}

export function fetchProviderSuccess(provider) {
  return {
    type: FETCH_PROVIDER_SUCCESS,
    payload: { provider }
  }
}

export function fetchProviderFailure(error) {
  return {
    type: FETCH_PROVIDER_FAILURE,
    payload: { error }
  }
}