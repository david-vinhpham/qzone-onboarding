
export const restApiResponseCodes = {
  'success': 200,
  'unauthorized': 401,
  'forbidden': 403,
  'notfound': 404,
};

// API
const email_template = 'http://13.238.116.171:8080/api';

// Email Templates
export const eTemplateUrl = '/email-templates';
export const eTemplateNameMax = 250;
export const eTemplateContentMax = 15000;
export const eTemplateApi = `${email_template}${eTemplateUrl}`;

