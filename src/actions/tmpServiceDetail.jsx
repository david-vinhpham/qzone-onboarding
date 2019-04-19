import { API_ROOT, URL } from 'config/config';
import { tmpServiceDetail } from '../constants/TmpServiceDetail.constants';

export const fetchTmpServiceDetail = eventId => {
  return dispatch => {
    dispatch({
      type: tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_LOADING
    });
    fetch(API_ROOT + URL.FIND_TMP_SERVICE_DETAIL_BY_TMP_SERVICE_ID + eventId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        dispatch({
          type: tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_SUCCESS,
          payload: data.object
        });
      })
      .catch(err => {
        dispatch({
          type: tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_FAILURE,
          payload: err
        });
      });
  };
};
