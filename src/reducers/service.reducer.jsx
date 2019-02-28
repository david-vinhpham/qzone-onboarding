import { service } from '../constants/Service.constants'

const initialState = {
    service: [],
    fetchServiceLoading : false,
    fetchServiceError: null,

    createServiceLoading:false,
    createServiceError: null,

    editServiceLoading:false,
    editServiceError: null,

    services: [],
    fetchServicesLoading : false,
    fetchServicesError: null,

    serviceCategories: [],
    fetchServiceCategoryLoading: false,
    fetchServiceCategoryError: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case service.FETCH_SERVICES_LOADING:
            return { ...state, fetchServicesLoading: true }
        case service.FETCH_SERVICES_SUCCESS:
            return { ...state, services: action.payload.data, fetchServicesLoading: false }
        case service.FETCH_SERVICES_FAILURE:
            return { ...state, services: [], fetchServicesError: action.payload.error, fetchServicesLoading: false }

        case service.CREATE_SERVICE_LOADING:
            return { ...state, createServiceLoading: true }
        case service.CREATE_SERVICE_SUCCESS:
            return { ...state, service: action.payload.data, createServiceLoading: false }
        case service.CREATE_SERVICE_FAILURE:
            return { ...state, service:[], createServiceError: action.payload.error, createServiceLoading: false }

        case service.EDIT_SERVICE_LOADING:
            return { ...state, editServiceLoading: true }
        case service.EDIT_SERVICE_SUCCESS:
            return { ...state, service: action.payload.data, editServiceLoading: false }
        case service.EDIT_SERVICE_FAILURE:
            return { ...state, service:[], editServiceError: action.payload.error, editServiceLoading: false }

        case service.FETCH_CATEGORY_LOADING:
            return { ...state, fetchServiceCategoryLoading: true }
        case service.FETCH_CATEGORY_SUCCESS:
            return { ...state, serviceCategories: action.payload.data, fetchServiceCategoryLoading: false }
        case service.FETCH_CATEGORY_FAILURE:
            return { ...state, serviceCategories: [], fetchServiceCategoryError: action.payload.error, fetchServiceCategoryLoading: false }

        case service.FETCH_SERVICE_LOADING:
            return { ...state, fetchServiceLoading: true }
        case service.FETCH_SERVICE_SUCCESS:
            return { ...state, service: action.payload.data, fetchServiceLoading: false }
        case service.FETCH_SERVICE_FAILURE:
            return { ...state, service: [], fetchServiceCategoryError: action.payload.error, fetchServiceLoading: false }

        default:
            return state;
    }
}

export default reducer;
