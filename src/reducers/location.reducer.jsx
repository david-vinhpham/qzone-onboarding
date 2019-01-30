import { location } from '../constants/Location.constants';

const initialState = {
    getAllLocations: [],
    getAllLocationsLoading: false,
    getAllLocationsError: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case location.FETCH_ALL_LOCATIONS_LOADING:
            return { ...state, getAllLocationsLoading: true }
        case location.FETCH_ALL_LOCATIONS_SUCCESS:
            return { ...state, getAllLocations: action.payload, getAllLocationsLoading: false}
        case location.FETCH_ALL_LOCATIONS_FAILURE:
            return { ...state, getAllLocations: [], getAllLocationsError: action.payload, getAllLocationsLoading: false }
        
        default: 
            return state;
    }
}

export default reducer;