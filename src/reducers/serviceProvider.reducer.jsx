import {location} from '../constants/Location.constants'
import {serviceProvider} from '../constants/ServiceProvider.constants'

const initialState = {

    serviceProviders: [],
    fetchServiceProvidersLoading: false,
    fetchServiceProvidersError: null,

    serviceProvider: [],
    fetchServiceProviderLoading: false,
    fetchServiceProviderError: null,

    createServiceProviderLoading: false,
    createServiceProviderError: null,

    editServiceProviderLoading: false,
    editServiceProviderError: null,

    locations: [],
    locationLoading: false,
    locationLoadingError: false,

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case serviceProvider.FETCH_SERVICE_PROVIDERS_LOADING:
            return { ...state, fetchServiceProvidersLoading: true }
        case serviceProvider.FETCH_SERVICE_PROVIDERS_SUCCESS:
            return { ...state, serviceProviders: action.payload.data, fetchServiceProvidersLoading: false }
        case serviceProvider.FETCH_SERVICE_PROVIDERS_FAILURE:
            return { ...state, serviceProvidersError: [], fetchServiceProvidersError: action.payload.error, fetchServiceProvidersLoading: false }

        case serviceProvider.CREATE_SERVICE_PROVIDER_LOADING:
            return { ...state, createServiceProviderLoading: true }
        case serviceProvider.CREATE_SERVICE_PROVIDER_SUCCESS:
            return { ...state, serviceProvider: action.payload.data, createServiceProviderLoading: false }
        case serviceProvider.CREATE_SERVICE_PROVIDER_FAILURE:
            console.log("CREATE_SERVICE_PROVIDER_FAILURE");
            return { ...state, serviceProvider:[], createServiceProviderError: action.payload.error, createServiceProviderLoading: false }

      case serviceProvider.EDIT_SERVICE_PROVIDER_LOADING:
        return { ...state, editServiceProviderLoading: true }
      case serviceProvider.EDIT_SERVICE_PROVIDER_SUCCESS:
        return { ...state, serviceProvider: action.payload.data, editServiceProviderLoading: false }
      case serviceProvider.EDIT_SERVICE_PROVIDER_FAILURE:
        return { ...state, serviceProvider:[], editServiceProviderError: action.payload.error, editServiceProviderLoading: false }

      case serviceProvider.FETCH_SERVICE_PROVIDER_LOADING:
            return { ...state, fetchProviderLoading: true }
        case serviceProvider.FETCH_SERVICE_PROVIDER_SUCCESS:
            return { ...state, serviceProvider: action.payload.data, fetchProviderLoading: false }
        case serviceProvider.FETCH_SERVICE_PROVIDER_FAILURE:
            return { ...state, serviceProvider:[], fetchProviderError: action.payload.error, fetchProviderLoading: false }

        case location.FETCH_LOCATIONS_LOADING:
          return { ...state, locationLoading: true }
        case location.FETCH_LOCATIONS_SUCCESS:
          return { ...state, locations: action.payload.data, locationLoading: false }
        case location.FETCH_LOCATIONS_FAILURE:
          return { ...state, locations: [], locationLoadingError: action.payload.error, locationLoading: false }

        default:
              return state;
    }
}

export default reducer;
