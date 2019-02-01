import { location } from '../constants/Location.constants';

const initialState = {
    getAllLocations: [],
    getAllLocationsLoading: false,
    getAllLocationsError: null,

    getLocation: [],
    getLocationLoading: false,
    getLocationError: null,

    location: [],
    locationLoading: false,
    locationError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case location.FETCH_ALL_LOCATIONS_LOADING:
            return { ...state, getAllLocationsLoading: true }
        case location.FETCH_ALL_LOCATIONS_SUCCESS:
            return { ...state, getAllLocations: action.payload, getAllLocationsLoading: false}
        case location.FETCH_ALL_LOCATIONS_FAILURE:
            return { ...state, getAllLocations: [], getAllLocationsError: action.payload, getAllLocationsLoading: false }
        
        case location.FETCH_LOCATION_LOADING:
            return { ...state, getLocationLoading: true }
        case location.FETCH_LOCATION_SUCCESS:
            return { ...state, getLocation: action.payload, getLocationLoading: false}
        case location.FETCH_LOCATION_FAILURE:
            return { ...state, getLocation: [], getLocationError: action.payload, getLocationLoading: false }
        
        case location.CREATE_LOCATION_LOADING:
            return { ...state, locationLoading: true }
        case location.CREATE_LOCATION_SUCCESS:
            return { ...state, location: action.payload, locationLoading: false}
        case location.CREATE_LOCATION_FAILURE:
            return { ...state, location: [], locationError: action.payload, locationLoading: false }
        
        case location.EDIT_LOCATION_LOADING:
            return { ...state, locationLoading: true }
        case location.EDIT_LOCATION_SUCCESS:
            return { ...state, location: action.payload, locationLoading: false}
        case location.EDIT_LOCATION_FAILURE:
            return { ...state, location: [], locationError: action.payload, locationLoading: false }
        
        default: 
            return state;
    }
}

export default reducer;