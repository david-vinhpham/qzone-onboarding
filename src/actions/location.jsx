import { location } from '../constants/Location.constants';
import { API_ROOT, URL } from '../config/config';

export const fetchAllLocations = () => {
    return (dispatch) => {
        dispatch({ type: location.FETCH_ALL_LOCATIONS_LOADING })
        fetch(API_ROOT + URL.GET_ALL_LOCATIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: location.FETCH_ALL_LOCATIONS_SUCCESS,
                payload: data.objects
            })
        })
        .catch(err => {
            dispatch({
                type: location.FETCH_ALL_LOCATIONS_FAILURE,
                payload: err
            })
        })
    }
}