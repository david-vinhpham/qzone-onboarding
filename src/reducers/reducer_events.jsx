import { 
  FETCH_EVENTS, 
  FETCH_EVENTS_SUCCESS, 
  FETCH_EVENTS_FAILURE, 
  FETCH_APPOINTMENT_EVENT_SUCCESS,
  FETCH_BREAK_EVENT_SUCCESS,
  RESET_EVENTS,
  CREATE_EVENT, 
  CREATE_EVENT_SUCCESS, 
  CREATE_EVENT_FAILURE, 
  RESET_NEW_EVENT

} from './../actions/events';

const INITIAL_STATE = 
{ 
  eventsList:{
      events: [
        {
          id: Number,
          title: String,
	        start: new Date(),
	        end: new Date(),
        }
    ], 
    error:null, 
    loading: false
  },  
  newEvent:{
    event: null, 
    error: null, 
    loading: false
  }, 
  
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
      
    case FETCH_EVENTS:
      return { ...state, eventsList: {events:[], error: null, loading: true}}; 
    case FETCH_EVENTS_SUCCESS:
      return { ...state, eventsList: {events: action.payload, error:null, loading: false}};
    case FETCH_EVENTS_FAILURE:
      error = action.payload || {message: action.payload.message};
      return { ...state, eventsList: {events: [], error: error, loading: false}};
    case FETCH_APPOINTMENT_EVENT_SUCCESS:
      return { ...state, appointmentEvent: {events: action.payload, error: null, loading: false}};
    case FETCH_BREAK_EVENT_SUCCESS:
      return { ...state, breakEvent: {breakEvent: action.payload, error:null, loading: false}};
    case RESET_EVENTS:
      return { ...state, eventsList: {events: [], error:null, loading: false} };

    case CREATE_EVENT:
      return {...state, newEvent: {...state.newEvent, loading: true}};
    case CREATE_EVENT_SUCCESS:
      return {...state, newEvent: {event:action.payload, error:null, loading: false}};
    case CREATE_EVENT_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, newEvent: {event:null, error:error, loading: false}};
    case RESET_NEW_EVENT:
      return {...state, newEvent:{event:null, error:null, loading: false}};
    default:
      return state;
  }
}
