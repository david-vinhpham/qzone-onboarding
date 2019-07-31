import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { service_options } from '../constants/ServiceOptions.constants';

export const setServiceOptionsSuccess = payload => ({
  type: service_options.FETCH_SERVICES_OPTIONS_SUCCESS,
  payload
});

export const fetchServiceOptionsByBusinessAdminId = businessAdminId => dispatch => {
  return axios.get(`${API_ROOT}${URL.FETCH_SERVICES_OPTION_BY_BUSINESS_ADMIN_ID}${businessAdminId}`)
    .then(res => {
      if (res && res.data.success) {
        dispatch(setServiceOptionsSuccess(res.data.objects));
      }
    });
};
