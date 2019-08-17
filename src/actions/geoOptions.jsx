import axios from 'axios';
import { get } from 'lodash';

import { URL } from 'config/config';
import { FETCH_GEO_OPTIONS } from 'constants/GeoOptions.constants';

const fetchGeoOptionsSuccess = geoOptions => ({
  type: FETCH_GEO_OPTIONS.SUCCESS,
  geoOptions
});

export const fetchGeoLocationOptions = () => dispatch => {
  axios.get(URL.GEO_LOCATION_OPTIONS)
    .then(resp => {
      if(resp && resp.data.success) {
        const data = get(resp, 'data.objects', []);
        dispatch(fetchGeoOptionsSuccess(data));
      }
    });
};
