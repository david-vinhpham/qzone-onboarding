import axios from 'axios';

//events list
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_APPOINTMENT_EVENT_SUCCESS = 'FETCH_APPOINTMENT_EVENT_SUCCESS';
export const FETCH_BREAK_EVENT_SUCCESS = 'FETCH_BREAK_EVENT_SUCCESS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const RESET_EVENTS = 'RESET_EVENTS';

//create a new event
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const RESET_NEW_EVENT = 'RESET_NEW_EVENT';

//const ROOT_URL = 'http://demo3959727.mockable.io';
const ROOT_URL = 'http://localhost:8080/appointment'
export const fetchEvents = () => {
  return (dispatch) => {
    return axios.get('http://localhost:8080/appointment/listAllEvents',{
      data: null,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let eventsArray = [];
        let appointmentArray = {};
        let breakArray = {};
        let vacationArray = {};
        let holidayArray = {};
        let offHoursArray = {};
        eventsArray.push(appointmentArray, breakArray, vacationArray, holidayArray, offHoursArray);
        
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
              appointmentArray.events.push(event);
              break;

            case 'Break':
              breakArray.events.push(event);
              break;

            case 'Off-hours':
              offHoursArray.events.push(event);
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

export function fetchAppoitmentEventSuccess(appointments) {
  return {
    type: FETCH_APPOINTMENT_EVENT_SUCCESS,
    payload: appointments
  }
}

export function fetchBreakEventsSuccess(breaks) {
  return {
    type: FETCH_BREAK_EVENT_SUCCESS,
    payload: breaks
  }
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
    type: CREATE_EVENT_SUCCESS,
    payload: newEvent
  };
}

export function createEventFailure(error) {
  return {
    type: CREATE_EVENT_FAILURE,
    payload: error
  };
}

export function resetNewEvent() {
  return {
    type: RESET_NEW_EVENT
  };
}