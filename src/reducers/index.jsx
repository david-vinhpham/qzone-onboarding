import { combineReducers } from 'redux';
import ProvidersReducer from './reducer_provider';
const rootReducer = combineReducers({
  providers: ProvidersReducer
});

export default rootReducer;
