import axios from 'axios';

export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';
export const FETCH_PROVIDERS_SUCCESS = 'FETCH_PROVIDERS_SUCCESS';
export const FETCH_PROVIDERS_FAILURE = 'FETCH_PROVIDERS_FAILURE';

export const CREATE_PROVIDER = 'CREATE_PROVIDER';

export const FETCH_PROVIDER = 'FETCH_PROVIDER';
export const FETCH_PROVIDER_SUCCESS = 'FETCH_PROVIDER_SUCCESS';
export const FETCH_PROVIDER_FAILURE = 'FETCH_PROVIDER_FAILURE';


const ROOT_URL = `http://35.189.61.189:8080/`;

export function fetchProviders() {
  return (dispatch) => {
    dispatch(getProviders())
      .then(token => {
        return (
          fetch(ROOT_URL + `providers`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          })
        )
      })
      .catch(() => {
        alert("No token found");
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
    type: FETCH_PROVIDER_SUCCESS,
    payload: { providers }
  }
}

export function fetchProvidersFailure(error) {
  return {
    type: FETCH_PROVIDERS_FAILURE,
    payload: { error }
  }
}

export function createProvider(values, callback) {
  const request = axios.post(ROOT_URL, values)
    .then(() => callback());
  return {
    type: CREATE_PROVIDER,
    payload: request
  }
}

export function fetchProvider(id, callback) {
  const request = axios.get(`${ROOT_URL}/${id}`)
  return {
    type: FETCH_PROVIDER,
    payload: request
  };
}