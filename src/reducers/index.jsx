import { combineReducers } from 'redux';

import ProvidersReducer from './provider.reducer';
import UserReducer from './reducer_auth';
import TemplateReducer from './email_templates';
import OrganizationReducer from './organization.reducer';
import ServiceReducer from './service.reducer';
import ImageUploadReducer from './imageUpload.reducer';
import LocationReducer from './location.reducer';
import ServiceProviderReducer from './serviceProvider.reducer';
import calendarManage from './calendar.reducer';
import tmpServicesReducer from './tmpServices.reducer';
import customerServiceReducer from './customerService.reducer';
import serviceCategoryReducer from './serviceCategory.reducer';
import businessCategoryReducer from './businessCategory.reducer';
import tmpServiceDetail from './tmpServiceDetail.reducer';
import availabilitySlots from './availabilitySlots.reducer';

const rootReducer = combineReducers({
  provider: ProvidersReducer,
  user: UserReducer,
  email: TemplateReducer,
  organization: OrganizationReducer,
  service: ServiceReducer,
  image: ImageUploadReducer,
  location: LocationReducer,
  serviceProvider: ServiceProviderReducer,
  calendarManage,
  tmpServices: tmpServicesReducer,
  serviceCategory: serviceCategoryReducer,
  businessCategory: businessCategoryReducer,
  tmpServiceDetail,
  availabilitySlots,
  customerService: customerServiceReducer
});

export default rootReducer;
