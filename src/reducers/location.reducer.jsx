import { location } from '../constants/Location.constants';

const initialState = {
    locations: [],
    fetchLocationsLoading: false,
    fetchLocationsError: null,

    location: [],
    fetchLocationLoading: false,
    fetchLocationError: null,

    createLocationLoading: false,
    createLocationError: null,

    editLocationLoading: false,
    editLocationError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case location.FETCH_ALL_LOCATIONS_LOADING:
            return { ...state, fetchLocationsLoading: true }
        case location.FETCH_ALL_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload, fetchLocationsLoading: false}
        case location.FETCH_ALL_LOCATIONS_FAILURE:
            return { ...state, locations: [], fetchLocationsError: action.payload, fetchLocationsLoading: false }
        
        case location.FETCH_LOCATION_LOADING:
            return { ...state, fetchLocationLoading: true }
        case location.FETCH_LOCATION_SUCCESS:
            return { ...state, location: action.payload, fetchLocationLoading: false}
        case location.FETCH_LOCATION_FAILURE:
            return { ...state, location: [], getLocationError: action.payload, fetchLocationLoading: false }
        
        case location.CREATE_LOCATION_LOADING:
            return { ...state, editLocationLoading: true }
        case location.CREATE_LOCATION_SUCCESS:
            return { ...state, location: action.payload, editLocationLoading: false}
        case location.CREATE_LOCATION_FAILURE:
            return { ...state, location: [], createLocationError: action.payload, editLocationLoading: false }
        
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
