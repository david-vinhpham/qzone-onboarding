export const API_ROOT = process.env.NODE_ENV === 'development'
  ? 'http://54.252.134.87:8080/api/' : 'https://api.quezone.com.au/api/';
export const API_SURVEY = `${API_ROOT}surveys`;
export const API_MEDIA_URL = 'https://communication.quezone.com.au/api/media/medias';
export const URL = {
  ORGANIZATION_NAME_VALIDATE: 'validate?name=',
  ORGANIZATION: 'organizations',
  FETCH_BUSINESS_CATEGORIES: 'business-categories',
  FETCH_ORGANIZATIONS_BY_ADMIN_ID: 'organizations-by-admin-id/',
  FETCH_ORGANIZATIONS_BY_BUSINESS_ADMIN_ID: 'organizations-by-business-admin-id/',
  FETCH_ORGANIZATIONS_OPTION_BY_BUSINESS_ADMIN_ID: 'organizations-option-by-business-admin-id/',
  FETCH_ORGANIZATION: 'organizations/',

  FETCH_SERVICES_BY_BUSINESS_ADMIN_ID: 'services-by-business-admin-id/',
  FETCH_SERVICES_BY_ORG_ID: 'services-by-org-id/',

  FETCH_SERVICES: 'services-by-org-id/',
  FETCH_SERVICES_OPTION_BY_ORG_ID: 'services-option-by-org-id/',
  FETCH_SERVICES_OPTION_BY_BUSINESS_ADMIN_ID: 'services-option-by-business-admin-id/',
  SERVICE: 'services',
  FETCH_SERVICE_CATEGORIES: 'service-categories',
  FETCH_SERVICE_BY_ID: 'services/',

  GEO_LOCATIONS: 'geo-locations',
  GEO_LOCATION_OPTIONS: 'geo-locations-option',

  USER: 'users',
  PROVIDER: 'providers',
  AWS_USER: 'aws-users',
  RESET_PASSWORD: 'users/reset-password',
  CHANGE_PASSWORD: 'users/change-password/',
  FORCE_CHANGE_PASSWORD: 'users/completeNewPasswordChallenge',
  TIMEZONE: 'timezones',
  TIMEZONE_OPTIONS: 'timezones-option',
  FETCH_PROVIDERS_OPTION_BY_ORG_ID: 'providers-by-org-id/',
  FETCH_PROVIDERS_BY_ORG_ID: 'providers-option-by-org-id/',
  FETCH_PROVIDERS_OPTION_BY_SERVICE_ID: 'providers-option-by-service-id/',
  FETCH_PROVIDERS_OPTION_BY_SERVICE_PROVIDER_ID: 'providers-option-by-service-provider-id/',
  FETCH_PROVIDERS_OPTION_BY_BUSINESS_ADMIN_ID: 'providers-option-by-business-admin-id/',
  FETCH_PROVIDERS_BY_BUSINESS_ADMIN_ID: 'providers-by-business-admin-id/',
  ADMIN_CREATE_AWS_USER: 'users/admin-create-new-users',

  FIND_ORGS_BY_BUSINESS_ID: 'organizations-by-business-admin-id/',
  FIND_PROVIDER_BY_ORG_ID: 'providers-by-org-id/',
  FIND_NORMAL_EVENTS_BY_PROVIDER_ID: 'find-normal-events-by-provider-id/',
  FIND_APPOINTMENTS_CUSTOMER_EVENTS_BY_PROVIDER_ID: 'find-appointment-customer-events-by-provider-id/',
  FIND_TMP_EVENTS_BY_PROVIDER_ID: 'find-events-calendar-by-provider-id/',
  NEW_NORMAL_EVENT: 'normal-events',
  NEW_TMP_SERVICE: 'temporary-services',
  NEW_APPOINTMENTS_CUSTOMER_EVENT: 'appointment-customer-events',

  FIND_TMP_SERVICES_BY_BUSINESS_ID: 'find-temporary-services-by-business-admin-id/',
  FIND_TMP_SERVICES_BY_PROVIDER_ID: 'find-temporary-services-by-provider-id/',
  FIND_TMP_SERVICE_DETAIL_BY_TMP_SERVICE_ID: 'temporary-services/',

  FIND_AVAILABILITY_BY_TMP_SERVICE: 'availabilities/temporary/service',

  VERIFY_BOOKING_CODE: 'verify',
  UPDATE_CUSTOMER_FLOW_STATUS: 'customer/flow/status',
  FETCH_CUSTOMER_FLOW_BOARD: 'customer/flow/board',
  UPDATE_GUEST_INFO: 'guest-users',

  SCHEDULE_REPORT: 'availabilities/temporary/report',
};

export const GOOGLE_ID = '166981643559-r54fbu1evv6cpfpphqjtlo4j950vdmvn.apps.googleusercontent.com';

export const GEO_CODING_KEY = 'AIzaSyCM4fZfA-m2F6ekcl4IyN77YZJlAdydxlc';
