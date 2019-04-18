import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { special_event } from '../constants/SpecialEvents.constants';

const setSpecialEventsLoading = payload => ({
  type: special_event.LOADING,
  payload
});

const setSpecialEvents = payload => ({
  type: special_event.SUCCESS,
  payload
});
export const deleteSpecialEvent = eventId => {
  return dispatch => {
    dispatch({ type: special_event.DEL_SPECIAL_EVENT_LOADING });
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
          const specialEvents = localStorage.getItem('specialEvents');
          if (specialEvents !== null) {
            const listSpecialEvents = JSON.parse(specialEvents);
            for (let i = 0; i < listSpecialEvents.length; i += 1) {
              if (listSpecialEvents[i].id === eventId) {
                delete listSpecialEvents[i];
                break;
              }
            }
            if (listSpecialEvents.length > 0) {
              objects.data = listSpecialEvents; // json
              localStorage.setItem('specialEvents', JSON.stringify(listSpecialEvents));
            }
            dispatch({
              type: special_event.DEL_SPECIAL_EVENT_SUCCESS,
              payload: objects.data
            });
          }
        } else {
          dispatch({
            type: special_event.DEL_SPECIAL_EVENT_FAILURE,
            payload: []
          });
        }
      });
  };
};
export const fetchSpecialEvents = businessId => dispatch => {
  dispatch(setSpecialEventsLoading(true));
  axios.get(`${API_ROOT}${URL.FIND_TMP_SERVICES_BY_BUSINESS_ID}${businessId}`)
    .then(resp => {
      if(resp.status === 200) {
        dispatch(setSpecialEvents(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setSpecialEventsLoading(false));
    });
}
