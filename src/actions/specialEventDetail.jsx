import { API_ROOT, URL } from 'config/config';
import { specialEventDetail } from '../constants/SpecialEventDetail.constants';

export const fetchSpecialEventDetail = eventId => {
  return dispatch => {
    dispatch({
      type: specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_LOADING
    });
    fetch(API_ROOT + URL.FIND_SPECIAL_EVENT_DETAIL_BY_SPECIAL_EVENT_ID + eventId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        dispatch({
          type: specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_SUCCESS,
          payload: data.object
        });
      })
      .catch(err => {
        dispatch({
          type: specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_FAILURE,
          payload: err
        });
      });
  };
};
