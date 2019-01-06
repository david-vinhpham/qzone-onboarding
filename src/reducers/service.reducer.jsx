import { service } from '../constants/Service.constants'

const initialState = {
    getServiceLodiang : false,
    getService: [],
    getServiceError: null

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case service.FETCH_SERVICES: 
            return {...state, getServiceLodiang: true}
        case service.FETCH_SERVICES_SUCCESS:
            return { ...state, getService: action.payload.data, getServiceLodiang: false}
        case service.FETCH_SERVICES_FAILURE:
            return { ...state, getService: [], getServiceError: action.payload.error, getServiceLodiang: false}

            default:
            return state;
    }
}

export default reducer;