import axios from 'axios';
import { get } from 'lodash';
import { availabilitySlots } from 'constants/AvailabilitySlots';
import { API_ROOT, URL } from 'config/config';
import Alert from "react-s-alert";

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
  axios.post(`${API_ROOT}${URL.FIND_AVAILABILITY_BY_TMP_SERVICE}`, payload)
    .then(resp => {
      if (resp && resp.data.success) {
        dispatch(setAvailabilitySlots(get(resp, 'data', [])));
      }
      else {
        Alert.success("Failed to load data");
        window.location.replace("/dashboard");
      }
    })
    .finally(() => { dispatch(setAvailabilityLoading(false)) });
}