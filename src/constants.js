export const eUserType = {
  guest: 'GUEST',
  customer: 'CUSTOMER',
  provider: 'PROVIDER',
  business_admin: 'BUSINESS_ADMIN',
  admin: 'ADMIN',
};


export const eSurveyStatus = {
  completed: 'COMPLETED',
  inProgress: 'INPROGRESS',
  pending: 'PENDING',
  expired: 'EXPIRED',
};

export const eRegisterPage = {
  eReceivedInfo: 'eReceivedInfo',
  registerTermAndCondition: 'registerTermAndCondition',
};

export const userStatus = {
  unconfirmed: 'UNCONFIRMED',
  confirmed: 'CONFIRMED',
  temporary: 'NEW_PASSWORD_REQUIRED',
  changePassword: 'FORCE_CHANGE_PASSWORD',

};

export const eventStatus = {
  unspecified: 'UNSPECIFIED',
  checkedIn: 'CHECKED_IN',
  started: 'STARTED',
  completed: 'COMPLETED',
  confirmed: 'CONFIRMED'
};

export const boardMode = {
  queue: 'QUEUE'
};

export const restApiResponseCodes = {
  success: 200,
  unauthorized: 401,
  forbidden: 403,
  notfound: 404
};

// API
const emailTemplate = 'http://13.238.116.171:8080/api';

// Email Templates
export const eTemplateUrl = '/email-templates';
export const eTemplateNameMax = 250;
export const eTemplateContentMax = 15000;
export const eTemplateApi = `${emailTemplate}${eTemplateUrl}`;

export const defaultDateTimeFormat = 'DD/MM/YYYY LT Z';
