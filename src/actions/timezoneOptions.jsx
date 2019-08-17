import axios from 'axios';
import {
  time_zone_options
} from "../constants/TimezoneOptions.constants"
import { URL } from 'config/config';

export const fetchTimezoneOptions = () => dispatch => {
  axios.get(URL.TIMEZONE_OPTIONS)
    .then((resp) => {
      if (resp && resp.data.success) {
        const { data } = resp;
        dispatch({
          type: time_zone_options.SUCCESS,
          payload: data.objects || []
        });
      }
    });
};
