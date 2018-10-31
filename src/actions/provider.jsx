import axios from 'axios';
import {authGetToken} from './auth'
export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';
export const FETCH_PROVIDERS_SUCCESS = 'FETCH_PROVIDERS_SUCCESS';
export const FETCH_PROVIDERS_FAILURE = 'FETCH_PROVIDERS_FAILURE';

export const CREATE_PROVIDER = 'CREATE_PROVIDER';
export const CREATE_PROVIDER_SUCCESS = 'CREATE_PROVIDER_SUCCESS';
export const CREATE_PROVIDER_FAILURE = 'CREATE_PROVIDER_FAILURE';

export const FETCH_PROVIDER = 'FETCH_PROVIDER';
export const FETCH_PROVIDER_SUCCESS = 'FETCH_PROVIDER_SUCCESS';
export const FETCH_PROVIDER_FAILURE = 'FETCH_PROVIDER_FAILURE';

const ROOT_URL = `http://35.189.61.189:8080/api/`;

export function fetchProviders() {
  return (dispatch) => {
    dispatch(getProviders());
    dispatch(authGetToken())
      .then(token => {
        console.log("token inside provider--------", token)
        return (
          fetch(ROOT_URL + `providers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            }
          })
        )
      })
      .catch(() => {
        alert("No token found");
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
  console.log("values-", values)
  return (dispatch) => {
    dispatch(authGetToken())
      .then(token => {
        console.log("token inside provider--------", token)
        return (
          fetch(ROOT_URL + `providers`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({provider: values})
          })
        )
      })
      .catch(() => {
        alert("No token found");
      })
      .then(res => res.json())
      .then(json => {
        console.log("json-------", json)
        if (json) {
          dispatch(createProviderSuccess(json));
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
  return (dispatch) => {
    dispatch(authGetToken())
      .then(token => {
        console.log("token inside provider--------", token)
        return (
          fetch(ROOT_URL + `providers/` + `${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        )
      })
      .catch(() => {
        alert("No token found");
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