import { provider } from '../constants/Provider.constants';

const initialState = {
  providers: [],
  fetchProvidersError: null,
  fetchProvidersLoading: false,

  provider: [],
  fetchProviderError: null,
  fetchProviderLoading: false,

  createProviderError: null,
  createProviderLoading: false,

  editProviderError: null,
  editProviderLoading: false,

  delProviderError: null,
  delProviderLoading: false,

  timezones: [],
  fetchTimezonesLoading: false,
  fetchTimezonesError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case provider.FETCH_PROVIDERS_LOADING:
      return { ...state, providers: null, fetchProvidersLoading: true };
    case provider.FETCH_PROVIDERS_SUCCESS:
      return { ...state, providers: action.payload.providers, fetchProvidersLoading: false };
    case provider.FETCH_PROVIDERS_FAILURE:
      return {
        ...state,
        providers: [],
        fetchProvidersError: action.payload.error,
        fetchProvidersLoading: false
      };

    case provider.FETCH_PROVIDER_LOADING:
      return { ...state, provider: null, fetchProviderLoading: true };
    case provider.FETCH_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload, fetchProviderLoading: false };
    case provider.FETCH_PROVIDER_FAILURE:
      return {
        ...state,
        provider: [],
        fetchProviderError: action.payload.error,
        fetchProviderLoading: false
      };

    case provider.CREATE_PROVIDER_LOADING:
      return { ...state, createProviderLoading: true };
    case provider.CREATE_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload, createProviderLoading: false };
    case provider.CREATE_PROVIDER_FAILURE:
      return {
        ...state,
        provider: [],
        createProviderError: action.payload.error,
        createProviderLoading: false
      };

    case provider.EDIT_PROVIDER_LOADING:
      return { ...state, fetchProviderLoading: true };
    case provider.EDIT_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload, fetchProviderLoading: false };
    case provider.EDIT_PROVIDER_FAILURE:
      return {
        ...state,
        provider: [],
        editProviderError: action.payload.error,
        fetchProviderLoading: false
      };

    case provider.DEL_PROVIDER_LOADING:
      return { ...state, delProviderLoading: true };
    case provider.DEL_PROVIDER_SUCCESS:
      return { ...state, provider: [], delProviderLoading: false };
    case provider.DEL_PROVIDER_FAILURE:
      return {
        ...state,
        provider: [],
        delProviderError: action.payload.error,
        delProviderLoading: false
      };

    case provider.FETCH_TIMEZONES_LOADING:
      return { ...state, fetchTimezonesLoading: true };
    case provider.FETCH_TIMEZONES_SUCCESS:
      return { ...state, timezones: action.payload, fetchTimezonesLoading: false };
    case provider.FETCH_TIMEZONES_FAILURE:
      return {
        ...state,
        timezones: [],
        fetchTimezonesError: action.payload.error,
        fetchTimezonesLoading: false
      };

    default:
      return state;
  }
}
