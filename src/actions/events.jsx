import axios from 'axios';
import {API_ROOT, URL} from "../config/config";
import {event} from "../constants/Event.constants";

const ROOT_URL = 'http://localhost:8080/appointment'
export const fetchEvents = () => {
  return (dispatch) => {
    return axios.get('https://demo3959727.mockable.io/events',{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let eventsArray = [
          {
            "id": 0,
            "title": "Demo 1",
            "type": "Appointment",
            "start": '2019-03-04 15:30:00',
            "end": '2019-03-04 18:25:00'
          },
          {
            "id": 1,
            "title": "Demo 2",
            "type": "Off-hours",
            "start": '2019-03-11T14:00:00',
            "end": '2019-03-11T15:00:00'
          },
          {
            "id": 2,
            "title": "Demo 3",
            "type": "Break",
            "start": '2019-03-12T12:00:00',
            "end": '2019-03-12T13:00:00'
          },
          {
            "id": 3,
            "title": "Demo 4",
            "type": "Off-hours",
            "start": '2019-03-13T13:00:00',
            "end": '2019-03-13T14:00:00'
          }
        ];
        let appointmentArray = {};
        let breakArray = {};
        let vacationArray = {};
        let holidayArray = {};
        let offHoursArray = {};
        //eventsArray.push(appointmentArray, breakArray, vacationArray, holidayArray, offHoursArray);

        appointmentArray.events = [];
        breakArray.events = [];
        vacationArray.events = [];
        holidayArray.events = [];
        offHoursArray.events = [];

        breakArray.color = 'grey';
        breakArray.rendering = 'background'
        breakArray.overlap = false;
        breakArray.textColor = 'white';

        offHoursArray.color = 'grey';
        offHoursArray.rendering = 'background';

        appointmentArray.color = 'light blue';
        console.log('response data---------',response.data);
        response.data.events.forEach(function(event) {
          switch (event.type) {
            case 'Appointment':
              //eventsArray.events.push(event);
              break;

            case 'Break':
             // eventsArray.events.push(event);
              break;

            case 'Off-hours':
              //eventsArray.events.push(event);
              break;

            default:
              break;
          }
        })
        dispatch(fetchEventsSuccess(eventsArray));
      })
      .catch(error => {
        console.log("error--------", error)
        dispatch(fetchEventsFailure(error))
      });
  };
};

export function fetchEventsCalendarByCustomerId(customerId) {
  console.log('fetchEventsCalendarByCustomerId');
  return (dispatch) => {
    dispatch(fetchEventsLoading());
    fetch(API_ROOT + URL.FETCH_EVENTS_CALENDAR_BY_CUSTOMER_ID + customerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("json-----------", json)
        if (json.objects) {
          dispatch(fetchEventsSuccess(json.objects));
        } else {
          dispatch(fetchEventsFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(fetchEventsFailure(err)))
  };
};

export function fetchEventsCalendarByProviderId(providerId) {
  console.log('fetchEventsCalendarByProviderId');
  return (dispatch) => {
    dispatch(fetchEventsLoading());
    fetch(API_ROOT + URL.FETCH_EVENTS_CALENDAR_BY_PROVIDER_ID + providerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("json-----------", json)
        if (json.objects) {
          dispatch(fetchEventsSuccess(json.objects));
        } else {
          dispatch(fetchEventsFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(fetchEventsFailure(err)))
  };
};


export function fetchEventSuccess(payload) {
  return {
    type: event.FETCH_EVENT_SUCCESS,
    payload: payload
  }
}
export function fetchEventLoading() {
  return {
    type: event.FETCH_EVENT_LOADING
  }
}

export function fetchEventFailure(error) {
  return {
    type: event.FETCH_EVENT_FAILURE,
    payload: error
  };
}

export function fetchEventsLoading() {
  return {
    type: event.FETCH_EVENTS_LOADING
  }
}
export function fetchEventsSuccess(events) {
  console.log('fetchEventsSuccess');
  return {
    type: event.FETCH_EVENTS_SUCCESS,
    payload: {events}
  };
}

export function fetchEventsFailure(error) {
  return {
    type: event.FETCH_EVENTS_FAILURE,
    payload: {error}
  };
}

export function createEvent(props) {
  return (dispatch) => {
    return axios.post(ROOT_URL + '/createEvent', props)
      .then(response => {
        dispatch(createEventSuccess(response.data))
      })
      .catch(error => {
        dispatch(createEventFailure(error))
      });
  };
};


export function createEventSuccess(newEvent) {
  return {
    type: event.CREATE_EVENT_SUCCESS,
    payload: newEvent
  };
}

export function createEventFailure(error) {
  return {
    type: event.CREATE_EVENT_FAILURE,
    payload: error
  };
}
