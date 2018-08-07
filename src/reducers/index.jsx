import { combineReducers } from 'redux';
import ProvidersReducer from 'reducers/reducer_provider';
const rootReducer = combineReducers({
  providers: ProvidersReducer
});

export default rootReducer;
