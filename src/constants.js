
export const restApiResponseCodes = {
  'success': 200,
  'unauthorized': 401,
  'forbidden': 403,
  'notfound': 404,
};

// API
const email_template = 'http://54.252.134.87:8999/api';

// Email Templates
export const eTemplateUrl = '/email-templates';
export const eTemplateNameMax = 250;
export const eTemplateContentMax = 15000;
export const eTemplateApi = `${email_template}${eTemplateUrl}`;

