import axios from 'axios';
import { get } from 'lodash';
import { availabilitySlots } from 'constants/AvailabilitySlots';
import { URL } from 'config/config';
import { showAlert } from './alert';

const setAvailabilityLoading = payload => ({
  type: availabilitySlots.FETCH_AVAILABILITY_LOADING,
  payload
});

const setAvailabilitySlots = payload => ({
  type: availabilitySlots.FETCH_AVAILABILITY_SUCCESS,
  payload
});

export const fetchAvailability = payload => dispatch => {
  dispatch(setAvailabilityLoading(true));
  axios.post(URL.FIND_AVAILABILITY_BY_TMP_SERVICE, payload)
    .then(resp => {
      if (resp && resp.data.success) {
        dispatch(setAvailabilitySlots(get(resp, 'data', [])));
      } else {
        dispatch(showAlert('error', 'Failed to load data'));
        window.location.replace("/dashboard");
      }
    })
    .finally(() => { dispatch(setAvailabilityLoading(false)) });
}