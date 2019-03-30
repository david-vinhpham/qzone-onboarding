import { location } from '../constants/Location.constants';
import { API_ROOT, URL } from '../config/config';

export const fetchLocations = () => {
  return dispatch => {
    dispatch({ type: location.FETCH_LOCATIONS_LOADING });
    fetch(API_ROOT + URL.LOCATION, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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

export const fetchLocationsOption = () => {
  return dispatch => {
    dispatch({ type: location.FETCH_LOCATIONS_LOADING });
    fetch(API_ROOT + URL.LOCATIONS_OPTION, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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
    fetch(`${API_ROOT + URL.LOCATION}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success === true) {
          dispatch({
            type: location.DEL_LOCATION_SUCCESS,
            payload: data.objects
          });
          // history.push('/location/list');
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
    fetch(`${API_ROOT + URL.LOCATION}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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
    fetch(API_ROOT + URL.LOCATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: location.CREATE_LOCATION_SUCCESS,
          payload: data.object
        });
        history.push('/location/list');
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
    fetch(API_ROOT + URL.LOCATION, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(() => {
        // dispatch({
        //    type: location.EDIT_LOCATION_SUCCESS,
        //    payload: data.object
        // })
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
