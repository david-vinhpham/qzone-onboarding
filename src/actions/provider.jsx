import axios from 'axios';

export const FETCH_PROVIDERS = 'fetch_providers';
export const CREATE_PROVIDER = 'create_provider';


export function fetchProviders() {
  const request = axios.get(`http://e2755470.ngrok.io/provider/list`)
  return {
    type: FETCH_PROVIDERS,
    payload: request
  };
}
export function createProvider(values, callback) {
  const request = axios.post(`http://e2755470.ngrok.io/provider/add`, values)
    .then(() => callback());
  return {
    type: CREATE_PROVIDER,
  }
}