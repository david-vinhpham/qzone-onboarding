import axios from 'axios';
import { URL } from 'config/config';

const FETCH_PROVIDERS_OPTIONS_SUCCESS = 'FETCH_PROVIDERS_OPTIONS_SUCCESS';

const setProviderOptionsSuccess = payload => ({
  type: FETCH_PROVIDERS_OPTIONS_SUCCESS,
  payload
});

const fetchProviderOptionsByBusinessAdminId = (businessAdminId) => dispatch => {
  return axios.get(`${URL.FETCH_PROVIDERS_OPTION_BY_BUSINESS_ADMIN_ID}/${businessAdminId}`)
    .then(res => {
      if (res && res.status === 200 && res.data.success) {
        dispatch(setProviderOptionsSuccess(res.data.objects));
      }
    });
};

export { setProviderOptionsSuccess, fetchProviderOptionsByBusinessAdminId, FETCH_PROVIDERS_OPTIONS_SUCCESS };
