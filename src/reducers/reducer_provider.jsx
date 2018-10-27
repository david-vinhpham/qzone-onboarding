import { 
        FETCH_PROVIDER, 
        FETCH_PROVIDER_SUCCESS, 
        FETCH_PROVIDER_FAILURE,
        FETCH_PROVIDERS, 
        FETCH_PROVIDERS_FAILURE, 
        FETCH_PROVIDERS_SUCCESS,
        CREATE_PROVIDER,
        CREATE_PROVIDER_SUCCESS,
        CREATE_PROVIDER_FAILURE
} from './../actions/provider';

const initialState = {
  providers: [],
  providersError: null,
  providersLoading: false,
  provider: [],
  providerError: null,
  providerLoading: false,
  newProvider:[],
  newProviderError: null,
  newProviderLoading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROVIDERS:
      return { ...state, providers: null, providersLoading: true  }
    case FETCH_PROVIDERS_SUCCESS:
      return { ...state, providers: action.payload.providers, providersLoading: false }
    case FETCH_PROVIDERS_FAILURE:
      return { ...state, providers: [], providersError: action.payload.error, providersLoading: false}
    case FETCH_PROVIDER:
      return { ...state, provider: null, providerLoading: true };
    case FETCH_PROVIDER_SUCCESS:
      return { ...state, provider: action.payload.provider, providerLoading: false }
    case FETCH_PROVIDER_FAILURE:
      return { ...state, provider: [], providerError: action.payload.error, providerLoading: false }
    case CREATE_PROVIDER:
      return state;
    case CREATE_PROVIDER_SUCCESS:
      return {}
    case CREATE_PROVIDER_FAILURE:
      return {}
    default:
      return state;
  }
}