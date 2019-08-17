import axios from 'axios';
import { location } from '../constants/Location.constants';
import { URL } from '../config/config';

export const fetchLocations = () => {
  return dispatch => {
    dispatch({ type: location.FETCH_LOCATIONS_LOADING });
    axios.get(URL.GEO_LOCATIONS)
      .then(({ data }) => {
        dispatch({
          type: location.FETCH_LOCATIONS_SUCCESS,
          payload: data.objects
        });
      })
      .catch(err => {
        dispatch({
          type: location.FETCH_LOCATIONS_FAILURE,
          payload: err
        });
      });
  };
};

export const delLocation = id => {
  return dispatch => {
    dispatch({ type: location.DEL_LOCATION_LOADING });
    axios.delete(`${URL.GEO_LOCATIONS}/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: location.DEL_LOCATION_SUCCESS,
            payload: data.object,
          });
          dispatch(fetchLocations());
        } else {
          dispatch({
            type: location.DEL_LOCATION_FAILURE,
            payload: data
          });
        }
      });
  };
};

export const fetchLocation = id => {
  return dispatch => {
    dispatch({ type: location.FETCH_LOCATION_LOADING });
    axios.get(`${URL.GEO_LOCATIONS}/${id}`)
      .then(({ data }) => {
        dispatch({
          type: location.FETCH_LOCATION_SUCCESS,
          payload: data.object
        });
      })
      .catch(err => {
        dispatch({
          type: location.FETCH_LOCATION_FAILURE,
          payload: err
        });
      });
  };
};

export const createLocation = (values, history) => {
  return dispatch => {
    dispatch({ type: location.CREATE_LOCATION_LOADING });
    axios.post(URL.GEO_LOCATIONS, values)
      .then(({ data }) => {
        dispatch({
          type: location.CREATE_LOCATION_SUCCESS,
          payload: data.object
        });
        if (history.location.state) {
          const { prevPage, prevState } = history.location.state;
          history.push(prevPage, {
            prevState: {
              ...prevState,
              addEventData: {
                ...prevState.addEventData,
                tmpService: {
                  ...prevState.addEventData.tmpService,
                  geoLocationId: data.object.id
                }
              }
            }
          });
        } else {
          history.push('/location/list');
        }
      })
      .catch(err => {
        dispatch({
          type: location.CREATE_LOCATION_FAILURE,
          payload: err
        });
      });
  };
};

export const editLocation = (values, history) => {
  return dispatch => {
    dispatch({ type: location.EDIT_LOCATION_LOADING });
    axios.put(URL.GEO_LOCATIONS, values)
      .then(() => {
        history.push('/location/list');
      })
      .catch(err => {
        dispatch({
          type: location.EDIT_LOCATION_FAILURE,
          payload: err
        });
      });
  };
};
