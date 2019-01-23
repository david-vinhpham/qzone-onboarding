import { service } from '../constants/Service.constants'
import { stat } from 'fs';

const initialState = {
    getServiceLodiang : false,
    getService: [],
    getServiceError: null,

    service: [],
    serviceLoading: false,
    serviceError: null,

    serviceCategory: [],
    serviceCategoryLoading: false,
    serviceCategoryError: null,

    getServiceById: [],
    getServiceByIdLoading: false,
    getServiceByIdError: null

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case service.FETCH_SERVICES: 
            return { ...state, getServiceLodiang: true } 
        case service.FETCH_SERVICES_SUCCESS:
            return { ...state, getService: action.payload.data, getServiceLodiang: false }
        case service.FETCH_SERVICES_FAILURE:
            return { ...state, getService: [], getServiceError: action.payload.error, getServiceLodiang: false } 

        case service.CREATE_SERVICE: 
            return { ...state, serviceLoading: true }
        case service.CREATE_SERVICE_SUCCESS:
            return { ...state, service: action.payload.data, serviceLoading: false }
        case service.CREATE_SERVICE_FAILURE:
            return { ...state, service:[], serviceError: action.payload.error, serviceLoading: false }

        case service.EDIT_SERVICE: 
            return { ...state, serviceLoading: true }
        case service.EDIT_SERVICE_SUCCESS:
            return { ...state, service: action.payload.data, serviceLoading: false }
        case service.EDIT_SERVICE_FAILURE:
            return { ...state, service:[], serviceError: action.payload.error, serviceLoading: false }

        case service.FETCH_CATEGORY: 
            return { ...state, serviceCategoryLoading: true } 
        case service.FETCH_CATEGORY_SUCCESS:
            return { ...state, serviceCategory: action.payload.data, serviceCategoryLoading: false }
        case service.FETCH_CATEGORY_FAILURE:
            return { ...state, serviceCategory: [], serviceCategoryError: action.payload.error, serviceCategoryLoading: false } 

        case service.FETCH_SERVICE_BY_ID: 
            return { ...state, getServiceByIdLoading: true } 
        case service.FETCH_SERVICE_BY_ID_SUCCESS:
            return { ...state, getServiceById: action.payload.data, getServiceByIdLoading: false }
        case service.FETCH_SERVICE_BY_ID_FAILURE:
            return { ...state, getServiceById: [], getServiceByIdError: action.payload.error, getServiceByIdLoading: false } 

        default:
            return state;
    }
}

export default reducer;