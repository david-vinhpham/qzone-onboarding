import {
        provider
} from '../constants/Provider.constants';

const initialState = {
  providers: [],
  providersError: null,
  providersLoading: false,
  provider: [],
  providerError: null,
  providerLoading: false,
  newProvider:[],
  newProviderError: null,
  newProviderLoading: false,

  timezones: [],
  timezonesLoading: false,
  timezonesError: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case provider.FETCH_PROVIDERS:
      return { ...state, providers: null, providersLoading: true  }
    case provider.FETCH_PROVIDERS_SUCCESS:
      return { ...state, providers: action.payload.providers, providersLoading: false }
    case provider.FETCH_PROVIDERS_FAILURE:
      return { ...state, providers: [], providersError: action.payload.error, providersLoading: false}

    case provider.FETCH_PROVIDER:
      return { ...state, provider: null, providerLoading: true };
    case provider.FETCH_PROVIDER_SUCCESS:
      console.log('FETCH_PROVIDER_SUCCESS');
      return { ...state, provider: action.payload, providerLoading: false }
    case provider.FETCH_PROVIDER_FAILURE:
      return { ...state, provider: [], providerError: action.payload.error, providerLoading: false }

    case provider.CREATE_PROVIDER_LOADING:
      return { ...state, providerLoading: true };
    case provider.CREATE_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload, providerLoading: false }
    case provider.CREATE_PROVIDER_FAILURE:
      return { ...state, provider: null, providerError: action.payload, providerLoading: false }

    case provider.FETCH_TIMEZONES_LOADING:
      return { ...state, timezonesLoading:true}
    case provider.FETCH_TIMEZONES_SUCCESS:
      return { ...state, timezones: action.payload, timezonesError: false}
    case provider.FETCH_TIMEZONES_FAILURE:
      return { ...state, timezones: [], timezonesError: action.payload, timezonesLoading: false}

    default:
      return state;
  }
}
