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
  editLocationError: null,

  delLocationLoading: false,
  delLocationError: null

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case location.FETCH_LOCATIONS_LOADING:
      return { ...state, fetchLocationsLoading: true }
    case location.FETCH_LOCATIONS_SUCCESS:
      return { ...state, locations: action.payload, fetchLocationsLoading: false }
    case location.FETCH_LOCATIONS_FAILURE:
      return { ...state, locations: [], fetchLocationsError: action.payload.error, fetchLocationsLoading: false }

    case location.FETCH_LOCATION_LOADING:
      return { ...state, fetchLocationLoading: true }
    case location.FETCH_LOCATION_SUCCESS:
      return { ...state, location: action.payload, fetchLocationLoading: false }
    case location.FETCH_LOCATION_FAILURE:
      return { ...state, location: [], fetchLocationError: action.payload.error, fetchLocationLoading: false }

    case location.CREATE_LOCATION_LOADING:
      return { ...state, fetchLocationLoading: true }
    case location.CREATE_LOCATION_SUCCESS:
      return { ...state, location: action.payload, fetchLocationLoading: false }
    case location.CREATE_LOCATION_FAILURE:
      return { ...state, location: [], createLocationError: action.payload.error, fetchLocationLoading: false }

    case location.EDIT_LOCATION_LOADING:
      return { ...state, locationLoading: true }
    case location.EDIT_LOCATION_SUCCESS:
      return { ...state, location: action.payload, locationLoading: false }
    case location.EDIT_LOCATION_FAILURE:
      return { ...state, location: [], locationError: action.payload.error, locationLoading: false }

    case location.DEL_LOCATION_LOADING:
      return { ...state, delLocationLoading: true }
    case location.DEL_LOCATION_SUCCESS:
      return { ...state, locations: action.payload, delLocationLoading: false }
    case location.DEL_LOCATION_FAILURE:
      return { ...state, location: [], delLocationError: action.payload.error, delLocationLoading: false }

    default:
      return state;
  }
}

export default reducer;
