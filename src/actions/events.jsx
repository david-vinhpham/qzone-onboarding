import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const RESET_EVENTS = 'RESET_EVENTS';

const ROOT_URL = 'http://demo8985813.mockable.io';

export function fetchEvents() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/events`,
    headers: []
  });

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function fetchEventsSuccess(events) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events
  };
}

export function fetchEventsFailure(error) {
  return {
    type: FETCH_EVENTS_FAILURE,
    payload: error
  };
}
