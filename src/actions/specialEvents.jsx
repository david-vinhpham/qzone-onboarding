import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { FETCH_SPECIAL_EVENTS } from 'constants/SpecialEvents.constants';

const setSpecialEventsLoading = payload => ({
  type: FETCH_SPECIAL_EVENTS.LOADING,
  payload
});

const setSpecialEvents = payload => ({
  type: FETCH_SPECIAL_EVENTS.SUCCESS,
  payload
});

export const fetchSpecialEvents = businessId => dispatch => {
  dispatch(setSpecialEventsLoading(true));
  axios.get(`${API_ROOT}${URL.FIND_SPECIAL_EVENTS_BY_BUSINESS_ID}${businessId}`)
    .then(resp => {
      if(resp.status === 200) {
        dispatch(setSpecialEvents(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setSpecialEventsLoading(false));
    });
}
