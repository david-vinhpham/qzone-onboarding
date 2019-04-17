import { combineReducers } from 'redux';

import ProvidersReducer from './provider.reducer';
import EventsReducer from './event.reducer';
import UserReducer from './reducer_auth';
import TemplateReducer from './email_templates';
import OrganizationReducer from './organization.reducer';
import ServiceReducer from './service.reducer';
import ImageUploadReducer from './imageUpload.reducer';
import LocationReducer from './location.reducer';
import ServiceProviderReducer from './serviceProvider.reducer';
import calendarManage from './calendar.reducer';
import specialEventsReducer from './specialEvents.reducer';
import specialEventDetail from './specialEventDetail.reducer';

const rootReducer = combineReducers({
  provider: ProvidersReducer,
  event: EventsReducer,
  user: UserReducer,
  email: TemplateReducer,
  organization: OrganizationReducer,
  service: ServiceReducer,
  image: ImageUploadReducer,
  location: LocationReducer,
  serviceProvider: ServiceProviderReducer,
  calendarManage,
  specialEvents: specialEventsReducer,
  specialEventDetail: specialEventDetail,
});

export default rootReducer;
