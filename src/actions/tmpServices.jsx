import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { tmp_service } from '../constants/TmpServices.constants';

const setTmpServicesLoading = payload => ({
  type: tmp_service.FETCH_TMP_SERVICES_LOADING,
  payload
});

const setTmpServices = payload => ({
  type: tmp_service.FETCH_TMP_SERVICES_SUCCESS,
  payload
});

export const deleteTmpService = eventId => {
  return dispatch => {
    dispatch({ type: tmp_service.DEL_TMP_SERVICE_LOADING });
    fetch(`${API_ROOT + URL.NEW_TMP_SERVICE}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success === true) {
          const objects = {
            data: []
          };
          const tmpServices = localStorage.getItem('tmpServices');
          if (tmpServices !== null) {
            const listTmpServices = JSON.parse(tmpServices);
            for (let i = 0; i < listTmpServices.length; i += 1) {
              if (listTmpServices[i].id === eventId) {
                delete listTmpServices[i];
                break;
              }
            }
            if (listTmpServices.length > 0) {
              objects.data = listTmpServices; // json
              localStorage.setItem('tmpServices', JSON.stringify(listTmpServices));
            }
            dispatch({
              type: tmp_service.DEL_TMP_SERVICE_SUCCESS,
              payload: objects.data
            });
          }
        } else {
          dispatch({
            type: tmp_service.DEL_TMP_SERVICE_FAILURE,
            payload: []
          });
        }
      });
  };
};

export const fetchTmpServices = businessId => dispatch => {
  dispatch(setTmpServicesLoading(true));
  axios.get(`${API_ROOT}${URL.FIND_TMP_SERVICES_BY_BUSINESS_ID}${businessId}`)
    .then(resp => {
      if(resp.status === 200) {
        dispatch(setTmpServices(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setTmpServicesLoading(false));
    });
}
