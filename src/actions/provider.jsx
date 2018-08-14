import axios from 'axios';

export const FETCH_PROVIDERS = 'fetch_providers';
export const CREATE_PROVIDER = 'create_provider';
export const FETCH_PROVIDER = 'fetch_provider';


const ROOT_URL = `http://5947f71e.ngrok.io/providers`
export function fetchProviders() {
  const request = axios.get(ROOT_URL)
  return {
    type: FETCH_PROVIDERS,
    payload: request
  };
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