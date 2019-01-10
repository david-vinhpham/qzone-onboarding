import { service } from '../constants/Service.constants'
import { stat } from 'fs';

const initialState = {
    getServiceLodiang : false,
    getService: [],
    getServiceError: null,

    createService: [],
    createServiceLoading: false,
    createServiceError: null,

    serviceCategory: [],
    serviceCategoryLoading: false,
    serviceCategoryError: null

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
            return { ...state, createServiceLoading: true }
        case service.CREATE_SERVICE_SUCCESS:
            return { ...state, createService: action.payload.data, createServiceLoading: false }
        case service.CREATE_SERVICE_FAILURE:
            return { ...state, createService:[], createServiceError: action.payload.error, createServiceLoading: false }

        case service.FETCH_CATEGORY: 
            return { ...state, serviceCategoryLoading: true } 
        case service.FETCH_CATEGORY_SUCCESS:
            return { ...state, serviceCategory: action.payload.data, serviceCategoryLoading: false }
        case service.FETCH_CATEGORY_FAILURE:
            return { ...state, serviceCategory: [], serviceCategoryError: action.payload.error, serviceCategoryLoading: false } 

        

            default:
            return state;
    }
}

export default reducer;