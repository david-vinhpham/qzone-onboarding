import axios from 'axios';
import {
  time_zone_options
} from "../constants/TimezoneOptions.constants"
import { API_ROOT, URL } from 'config/config';

export const fetchTimezoneOptions = () => dispatch => {
  axios.get(`${API_ROOT}${URL.TIMEZONE_OPTIONS}`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: time_zone_options.SUCCESS,
          payload: data && data.objects ? data.objects : []
        });
      }
    });
};
