import axios from 'axios';
import { authGetToken } from './auth'
import { provider } from '../constants/Provider.constants';
import {API_ROOT, URL } from '../config/config';
const ROOT_URL = `http://13.238.116.171:8080/api/providers-by-org-id/5c020fc6ab6aee3dc499e2e6`;

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
  return (dispatch) => {
    dispatch(getProviders());
    fetch(ROOT_URL, {
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

export function createProvider(values) {
  console.log("values-", values);
  
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
    type: provider.FETCH_PROVIDER
  }
}

export function fetchProviderSuccess(provider) {
  return {
    type: provider.FETCH_PROVIDER_SUCCESS,
    payload: { provider }
  }
}

export function fetchProviderFailure(error) {
  return {
    type: provider.FETCH_PROVIDER_FAILURE,
    payload: { error }
  }
}