import { combineReducers } from 'redux';

import ProvidersReducer from './reducer_provider';
import EventsReducer from './reducer_events';
import UserReducer from './reducer_auth';
import TemplateReducer from './email_templates';
import OrganizationReducer from './organization.reducer';

const rootReducer = combineReducers({
  providers: ProvidersReducer,
  events: EventsReducer,
  user: UserReducer,
  email: TemplateReducer,
  organization: OrganizationReducer
});

export default rootReducer;
