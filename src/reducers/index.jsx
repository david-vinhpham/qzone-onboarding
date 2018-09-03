import { combineReducers } from 'redux';
import ProvidersReducer from './reducer_provider';
import EventsReducer from './reducer_events';
const rootReducer = combineReducers({
  providers: ProvidersReducer,
  events: EventsReducer,
});

export default rootReducer;
