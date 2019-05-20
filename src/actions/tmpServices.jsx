import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { tmp_service } from '../constants/TmpServices.constants';

const setTmpServicesLoading = payload => ({
  type: tmp_service.FETCH_TMP_SERVICES_LOADING,
  payload
});

export const setTmpServices = payload => ({
  type: tmp_service.FETCH_TMP_SERVICES_SUCCESS,
  payload
});

const setTmpService = payload => ({
  type: tmp_service.SET_TMP_SERVICE,
  payload
})

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
          let position = -1;
          const tmpServices = localStorage.getItem('tmpServices');
          if (tmpServices !== null) {
            let listTmpServices = JSON.parse(tmpServices);
            for (let i = 0; i < listTmpServices.length; i += 1) {
              if (listTmpServices[i].id === eventId) {
                position = i;
                listTmpServices.splice(position, 1);
                break;
              }
            }
            if(position !== -1 && listTmpServices.length > 0) {
                localStorage.setItem('tmpServices', JSON.stringify(listTmpServices));
            }
            objects.data = listTmpServices; // json
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
      if(resp && resp.status === 200) {
        dispatch(setTmpServices(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setTmpServicesLoading(false));
    });
}

export const editTmpService = payload => dispatch => {
  dispatch(setTmpServicesLoading(true));
  axios.put(`${API_ROOT}${URL.NEW_TMP_SERVICE}`, payload)
  .then(resp => {
    if(resp && resp.status === 200) {
      dispatch(setTmpService(resp.data.object));
    }
  })
  .finally(() => {
    dispatch(setTmpServicesLoading(false));
  });
}
