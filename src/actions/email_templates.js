import axios from 'axios';

export const emailTemplateUrl = 'http://54.252.134.87:8999/api/email-temlplates';

export const FETCH_EMAIL_TEMPLATES_START = 'FETCH_EMAIL_TEMPLATES_START';
export const FETCH_EMAIL_TEMPLATES_SUCCESS = 'FETCH_EMAIL_TEMPLATES_SUCCESS';
export const FETCH_EMAIL_TEMPLATES_ERROR = 'FETCH_EMAIL_TEMPLATES_ERROR';

export const FETCH_TEMPLATE_START = 'FETCH_TEMPLATE_START';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_ERROR = 'FETCH_TEMPLATE_ERROR';

export const DELETE_TEMPLATE_START = 'DELETE_TEMPLATE_START';
export const DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS';
export const DELETE_TEMPLATE_ERROR = 'DELETE_TEMPLATE_ERROR';

export const fetchEmailTemplatesStart = () => ({ type: FETCH_EMAIL_TEMPLATES_START });
export const fetchEmailTemplatesSuccess = (response) => ({ type: FETCH_EMAIL_TEMPLATES_SUCCESS, payload: response.data });
export const fetchEmailTemplatesError = (error) => ({ type: FETCH_EMAIL_TEMPLATES_ERROR, payload: error.response.data });

export const fetchTemplateStart = () => ({ type: FETCH_TEMPLATE_START });
export const fetchTemplateSuccess = (response) => ({ type: FETCH_TEMPLATE_SUCCESS, payload: response.data });
export const fetchTemplateError = (error) => ({ type: FETCH_TEMPLATE_ERROR, payload: error.response.data });

export const deleteTemplateStart = () => ({ type: DELETE_TEMPLATE_START });
export const deleteTemplateSuccess = (response) => ({ type: DELETE_TEMPLATE_SUCCESS, payload: response.data });
export const deleteTemplateError = (error) => ({ type: DELETE_TEMPLATE_ERROR, payload: error.response.data });

export const fetchTemplates = () => dispatch => {
  dispatch(fetchEmailTemplatesStart());
  axios.get(emailTemplateUrl)
    .then(response => dispatch(fetchEmailTemplatesSuccess(response)))
    .catch(error => dispatch(fetchEmailTemplatesError(error)));
};

export const fetchTemplate = (id) => dispatch => {
  dispatch(fetchTemplateStart());
  axios.get(`${emailTemplateUrl}/${id}`)
    .then(response => dispatch(fetchTemplateSuccess(response)))
    .catch(error => dispatch(fetchTemplateError(error)));
};

export const deleteTemplate = (id) => dispatch => {
  dispatch(deleteTemplateStart());
  axios.delete(`${emailTemplateUrl}/{id}?id=${id}`)
    .then(response => dispatch(deleteTemplateSuccess(response)))
    .catch(error => dispatch(deleteTemplateError(error)));
};

