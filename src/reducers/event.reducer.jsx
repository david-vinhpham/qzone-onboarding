import {event} from "../constants/Event.constants";
const initialState = {
  event: [],
  fetchEventLoading : false,
  fetchEventError: null,

  createEventLoading:false,
  createEventError: null,

  editEventLoading:false,
  editEventError: null,

  events: [],
  fetchEventsLoading : false,
  fetchEventsError: null,

}
const reducer = (state = initialState, action) => {
  console.log('reducer');
  switch(action.type) {
    case event.FETCH_EVENTS_LOADING:
      return { ...state, fetchEventsLoading: true }
    case event.FETCH_EVENTS_SUCCESS:
      console.log('FETCH_EVENTS_SUCCESS');
      return { ...state, events: action.payload.events, fetchEventsLoading: false }
    case event.FETCH_EVENTS_FAILURE:
      return { ...state, events: [], fetchEventsError: action.payload.error, fetchEventsLoading: false }
    case event.CREATE_EVENT_LOADING:
      return { ...state, createEventLoading: true }
    case event.CREATE_EVENT_SUCCESS:
      return { ...state, event: action.payload.event, createEventLoading: false }
    case event.CREATE_EVENT_FAILURE:
      return { ...state, event:[], createEventError: action.payload.error, createEventLoading: false }
    default:
      return state;
  }
}
export default reducer;
