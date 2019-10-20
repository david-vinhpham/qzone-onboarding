import { combineReducers } from 'redux';

import commonReducer from './common';
import ProvidersReducer from './provider.reducer';
import UserReducer from './auth.reducer';
import TemplateReducer from './email_templates';
import OrganizationReducer from './organization.reducer';
import ServiceReducer from './service.reducer';
import ImageUploadReducer from './imageUpload.reducer';
import PictureUploadReducer from './pictureUpload.reducer';
import LocationReducer from './location.reducer';
import manageCalendarReducer from './calendar.reducer';
import tmpServicesReducer from './tmpServices.reducer';
import customerServiceReducer from './customerService.reducer';
import serviceOptionsReducer from './serviceOptions.reducer';
import serviceCategoryReducer from './serviceCategory.reducer';
import businessCategoryReducer from './businessCategory.reducer';
import tmpServiceDetailReducer from './tmpServiceDetail.reducer';
import availabilitySlotsReducer from './availabilitySlots.reducer';
import scheduleReportsReducer from './scheduleReport.reducer';
import timezoneOptionsReducer from './timezoneOptions.reducer';
import surveysReducer from './surveys';
import geoOptionsReducer from './geoOptions.reducer';
import surveyOptionsReducer from './surveyOptions.reducer';
import chartReducer from './chart.reducer';
import alertReducer from './alert.reducer';
import providerOptionsReducer from './providerOptions.reducer';
import reportsReducer from './reports.reducer';
import organizationOptionsReducer from './organizationOptions.reducer';

const rootReducer = combineReducers({
  common: commonReducer,
  provider: ProvidersReducer,
  user: UserReducer,
  email: TemplateReducer,
  organization: OrganizationReducer,
  service: ServiceReducer,
  image: ImageUploadReducer,
  picture: PictureUploadReducer,
  location: LocationReducer,
  manageCalendar: manageCalendarReducer,
  tmpServices: tmpServicesReducer,
  serviceCategory: serviceCategoryReducer,
  businessCategory: businessCategoryReducer,
  tmpServiceDetail: tmpServiceDetailReducer,
  availabilitySlots: availabilitySlotsReducer,
  scheduleReports: scheduleReportsReducer,
  customerService: customerServiceReducer,
  surveys: surveysReducer,
  chart: chartReducer,
  alert: alertReducer,
  reports: reportsReducer,
  options: combineReducers({
    geo: geoOptionsReducer,
    timezone: timezoneOptionsReducer,
    service: serviceOptionsReducer,
    survey: surveyOptionsReducer,
    provider: providerOptionsReducer,
    organization: organizationOptionsReducer
  })
});

export default rootReducer;
