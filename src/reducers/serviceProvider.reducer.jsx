import { service } from '../constants/Service.constants'
import { provider } from '../constants/Provider.constants'
import { organization } from '../constants/Organization.constants'
import { location } from '../constants/Location.constants'

const initialState = {

    serviceProviders: [],
    serviceProvider: [],
    serviceProviderLoading: false,
    serviceProviderError: null,

    providers: [],
    providerLoading: false,
    providerLoadingError: false,

    organizations: [],
    organizationLoading: false,
    organizationLoadingError: false,

    locations: [],
    locationLoading: false,
    locationLoadingError: false,

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case service.FETCH_SERVICE_PROVIDERS:
            return { ...state, serviceProviderLoading: true }
        case service.FETCH_SERVICE_PROVIDERS_SUCCESS:
            return { ...state, serviceProviders: action.payload.data, serviceProviderLoading: false }
        case service.FETCH_SERVICE_PROVIDERS_FAILURE:
            return { ...state, serviceProviders: [], serviceProviderError: action.payload.error, serviceProviderLoading: false }

        case service.UPDATE_SERVICE_PROVIDER:
            return { ...state, serviceProviderLoading: true }
        case service.UPDATE_SERVICE_PROVIDER_SUCCESS:
            return { ...state, serviceProvider: action.payload.data, serviceProviderLoading: false }
        case service.UPDATE_SERVICE_PROVIDER_FAILURE:
            return { ...state, serviceProvider:[], serviceProviderError: action.payload.error, serviceProviderLoading: false }

        case service.FETCH_SERVICE_PROVIDER:
            return { ...state, serviceProviderLoading: true }
        case service.FETCH_SERVICE_PROVIDER_SUCCESS:
            return { ...state, serviceProvider: action.payload.data, serviceProviderLoading: false }
        case service.FETCH_SERVICE_PROVIDER_FAILURE:
            return { ...state, serviceProvider:[], getServiceProviderError: action.payload.error, serviceProviderLoading: false }

        case provider.FETCH_PROVIDER:
            return { ...state, providerLoading: true }
        case provider.FETCH_PROVIDER_SUCCESS:
            return { ...state, providers: action.payload.data, providerLoading: false }
        case provider.FETCH_PROVIDER_FAILURE:
            return { ...state, providers: [], providerLoadingError: action.payload.error, providerLoading: false }

      case organization.ORGANIZATION_BY_ADMIN_LOADING:
            return { ...state, organizationLoading: true }
      case organization.ORGANIZATION_BY_ADMIN_SUCCESS:
            return { ...state, organizations: action.payload.data, organizationLoading: false }
      case organization.ORGANIZATION_BY_ADMIN_FAILURE:
            return { ...state, organizations: [], organizationLoadingError: action.payload.error, organizationLoading: false }

      case location.FETCH_ALL_LOCATIONS_LOADING:
        return { ...state, locationLoading: true }
      case location.FETCH_ALL_LOCATIONS_SUCCESS:
        return { ...state, locations: action.payload.data, locationLoading: false }
      case location.FETCH_ALL_LOCATIONS_FAILURE:
        return { ...state, locations: [], locationLoadingError: action.payload.error, locationLoading: false }


      default:
            return state;
    }
}

export default reducer;
