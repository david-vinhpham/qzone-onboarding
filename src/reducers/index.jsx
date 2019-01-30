import { combineReducers } from 'redux';

import ProvidersReducer from './provider.reducer';
import EventsReducer from './reducer_events';
import UserReducer from './reducer_auth';
import TemplateReducer from './email_templates';
import OrganizationReducer from './organization.reducer';
import ServiceReducer from './service.reducer';
import ImageUploadReducer from './imageUpload.reducer';
import LocationReducer from './location.reducer';

const rootReducer = combineReducers({
  providers: ProvidersReducer,
  events: EventsReducer,
  user: UserReducer,
  email: TemplateReducer,
  organization: OrganizationReducer,
  service: ServiceReducer,
  image: ImageUploadReducer,
  location: LocationReducer
});

export default rootReducer;
