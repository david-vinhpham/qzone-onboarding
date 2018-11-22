import axios from 'axios';
export const FETCH_EMAIL_TEMPLATES_START = 'FETCH_EMAIL_TEMPLATES_START';
export const FETCH_EMAIL_TEMPLATES_SUCCESS = 'FETCH_EMAIL_TEMPLATES_SUCCESS';
export const FETCH_EMAIL_TEMPLATES_ERROR = 'FETCH_EMAIL_TEMPLATES_ERROR';

export const FETCH_TEMPLATE_START = 'FETCH_TEMPLATE_START';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_ERROR = 'FETCH_TEMPLATE_ERROR';

export const fetchEmailTemplatesStart = () => ({ type: FETCH_EMAIL_TEMPLATES_START });
export const fetchEmailTemplatesSuccess = (response) => ({ type: FETCH_EMAIL_TEMPLATES_SUCCESS, payload: response.data });
export const fetchEmailTemplatesError = (error) => ({ type: FETCH_EMAIL_TEMPLATES_ERROR, payload: error.response.data });

export const fetchTemplateStart = () => ({ type: FETCH_TEMPLATE_START });
export const fetchTemplateSuccess = (response) => ({ type: FETCH_TEMPLATE_SUCCESS, payload: response.data });
export const fetchTemplateError = (error) => ({ type: FETCH_TEMPLATE_ERROR, payload: error.response.data });

export const fetchTemplates = () => dispatch => {
  dispatch(fetchEmailTemplatesStart());
  axios.get('http://54.252.134.87:8999/api/email-temlplates')
    .then(response => dispatch(fetchEmailTemplatesSuccess(response)))
    .catch(error => dispatch(fetchEmailTemplatesError(error)));
};

export const fetchTemplate = (id) => dispatch => {
  dispatch(fetchTemplateStart());
  axios.get(`http://54.252.134.87:8999/api/email-temlplates/${id}`)
    .then(response => dispatch(fetchTemplateSuccess(response)))
    .catch(error => dispatch(fetchTemplateError(error)));
};

