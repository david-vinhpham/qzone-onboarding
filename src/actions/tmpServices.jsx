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
  return (dispatch, getState) => {
    dispatch({ type: tmp_service.DEL_TMP_SERVICE_LOADING });
    fetch(`${API_ROOT + URL.NEW_TMP_SERVICE}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: tmp_service.DEL_TMP_SERVICE_SUCCESS,
            payload: getState().tmpServices.list.filter(tmpService => tmpService.id !== eventId)
          });
        }
      });
  };
};

export const fetchTmpServicesByAdminId = businessId => dispatch => {
  dispatch(setTmpServicesLoading(true));
  axios.get(`${API_ROOT}${URL.FIND_TMP_SERVICES_BY_BUSINESS_ID}${businessId}`)
    .then(resp => {
      if (resp && resp.status === 200 && resp.data.success) {
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
      if (resp && resp.status === 200 && resp.data.success) {
        dispatch(setTmpService(resp.data.object));
      }
    })
    .finally(() => {
      dispatch(setTmpServicesLoading(false));
    });
}

export const setScheduleReportData = payload => ({
  type: tmp_service.SET_SCHEDULE_REPORT_DATA,
  payload
});

const setScheduleReportLoading = payload => ({
  type: tmp_service.SET_SCHEDULE_REPORT_LOADING,
  payload
});

export const getScheduleReport = tmpServiceId => dispatch => {
  dispatch(setScheduleReportLoading(true));
  axios.post(`${API_ROOT}${URL.SCHEDULE_REPORT}`, { tmpServiceId })
    .then(resp => {
      if (resp && resp.data.success) {
        dispatch(setScheduleReportData(resp.data.object));
      }
    })
    .finally(() => {
      dispatch(setScheduleReportLoading(false));
    });
}

export const fetchTmpServicesByProviderId = providerId => dispatch => {
  dispatch(setTmpServicesLoading(true));
  axios.get(`${API_ROOT}${URL.FIND_TMP_SERVICES_BY_PROVIDER_ID}${providerId}`)
    .then(resp => {
      if (resp && resp.status === 200 && resp.data.success) {
        dispatch(setTmpServices(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setTmpServicesLoading(false));
    });
}
