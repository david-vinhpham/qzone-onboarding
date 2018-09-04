import { FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE, RESET_EVENTS} from './../actions/events';
//import events from './../models/events.model';

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
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
      
  case FETCH_EVENTS:
  	return { ...state, eventsList: {events:[], error: null, loading: true} }; 
  case FETCH_EVENTS_SUCCESS:
    return { ...state, eventsList: {events: action.payload, error:null, loading: false} };
  case FETCH_EVENTS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, eventsList: {events: [], error: error, loading: false} };
  case RESET_EVENTS:
    return { ...state, eventsList: {events: [], error:null, loading: false} };
  default:
    return state;
  }
}
