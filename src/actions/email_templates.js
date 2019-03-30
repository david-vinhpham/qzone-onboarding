import axios from 'axios';
import { eTemplateApi } from '../constants';

const axiosConfig = {
  headers: {
    'Content-Type': 'text/plain'
  }
};

export const FETCH_EMAIL_TEMPLATES_START = 'FETCH_EMAIL_TEMPLATES_START';
export const FETCH_EMAIL_TEMPLATES_SUCCESS = 'FETCH_EMAIL_TEMPLATES_SUCCESS';
export const FETCH_EMAIL_TEMPLATES_ERROR = 'FETCH_EMAIL_TEMPLATES_ERROR';
export const UPDATE_EMAIL_TEMPLATES = 'UPDATE_EMAIL_TEMPLATES';

export const FETCH_TEMPLATE_START = 'FETCH_TEMPLATE_START';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_ERROR = 'FETCH_TEMPLATE_ERROR';
export const CLEAN_TEMPLATE_EDIT_STATUS = 'CLEAN_TEMPLATE_EDIT_STATUS';

export const DELETE_TEMPLATE_START = 'DELETE_TEMPLATE_START';
export const DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS';
export const DELETE_TEMPLATE_ERROR = 'DELETE_TEMPLATE_ERROR';
export const RESET_DELETE_STATUS = 'RESET_DELETE_STATUS';

export const CREATE_TEMPLATE_START = 'CREATE_TEMPLATE_START';
export const CREATE_TEMPLATE_SUCCESS = 'CREATE_TEMPLATE_SUCCESS';
export const CREATE_TEMPLATE_ERROR = 'CREATE_TEMPLATE_ERROR';
export const CLEAN_CREATE_TEMPLATE_ERROR = 'CLEAN_CREATE_TEMPLATE_ERROR';

export const EDIT_TEMPLATE_START = 'EDIT_TEMPLATE_START';
export const EDIT_TEMPLATE_SUCCESS = 'EDIT_TEMPLATE_SUCCESS';
export const EDIT_TEMPLATE_ERROR = 'EDIT_TEMPLATE_ERROR';
export const CLEAN_EDIT_TEMPLATE_STATUS = 'CLEAN_EDIT_TEMPLATE_STATUS';

export const SAVE_TEMPLATE_NAME_LIST = 'SAVE_TEMPLATE_NAME_LIST';

export const fetchEmailTemplatesStart = () => ({ type: FETCH_EMAIL_TEMPLATES_START });
export const updateEmailTemplate = templates => ({
  type: UPDATE_EMAIL_TEMPLATES,
  payload: templates
});
export const fetchEmailTemplatesSuccess = response => ({
  type: FETCH_EMAIL_TEMPLATES_SUCCESS,
  payload: response.data
});
export const fetchEmailTemplatesError = error => ({
  type: FETCH_EMAIL_TEMPLATES_ERROR,
  payload: error.response.data
});

export const fetchTemplateStart = () => ({ type: FETCH_TEMPLATE_START });
export const fetchTemplateSuccess = response => ({
  type: FETCH_TEMPLATE_SUCCESS,
  payload: response.data
});
export const fetchTemplateError = error => ({
  type: FETCH_TEMPLATE_ERROR,
  payload: error.response.data
});
export const cleanTemplateStatus = () => ({ type: CLEAN_TEMPLATE_EDIT_STATUS });

export const deleteTemplateStart = id => ({ type: DELETE_TEMPLATE_START, payload: id });
export const deleteTemplateSuccess = response => ({
  type: DELETE_TEMPLATE_SUCCESS,
  payload: response
});
export const deleteTemplateError = error => ({ type: DELETE_TEMPLATE_ERROR, payload: error });
export const resetDeleteStatus = () => ({ type: RESET_DELETE_STATUS });

export const createTemplateStart = () => ({ type: CREATE_TEMPLATE_START });
export const createTemplateSuccess = response => ({
  type: CREATE_TEMPLATE_SUCCESS,
  payload: response.data
});
export const createTemplateError = error => ({
  type: CREATE_TEMPLATE_ERROR,
  payload: error.response.data
});
export const cleanCreateTemplateError = () => ({ type: CLEAN_CREATE_TEMPLATE_ERROR });
export const cleanEditTemplateStatus = () => ({ type: CLEAN_EDIT_TEMPLATE_STATUS });

export const editTemplateStart = () => ({ type: EDIT_TEMPLATE_START });
export const editTemplateSuccess = response => ({
  type: EDIT_TEMPLATE_SUCCESS,
  payload: response.data
});
export const editTemplateError = error => ({
  type: EDIT_TEMPLATE_ERROR,
  payload: error.response.data
});

export const saveTemplateNameList = list => ({ type: SAVE_TEMPLATE_NAME_LIST, payload: list });

export const fetchTemplates = () => dispatch => {
  dispatch(fetchEmailTemplatesStart());
  axios
    .get(eTemplateApi)
    .then(response => dispatch(fetchEmailTemplatesSuccess(response)))
    .catch(error => dispatch(fetchEmailTemplatesError(error)));
};

export const fetchTemplate = id => dispatch => {
  dispatch(fetchTemplateStart());
  axios
    .get(`${eTemplateApi}/${id}`)
    .then(response => dispatch(fetchTemplateSuccess(response)))
    .catch(error => dispatch(fetchTemplateError(error)));
};

export const deleteTemplate = id => dispatch => {
  dispatch(deleteTemplateStart(id));
  axios
    .delete(`${eTemplateApi}/{id}?id=${id}`)
    .then(response => dispatch(deleteTemplateSuccess(response)))
    .catch(error => dispatch(deleteTemplateError(error)));
};

export const createTemplate = (name, content) => dispatch => {
  dispatch(createTemplateStart());
  axios
    .post(`${eTemplateApi}/${name}`, content, axiosConfig)
    .then(response => dispatch(createTemplateSuccess(response)))
    .catch(error => dispatch(createTemplateError(error)));
};

export const editTemplate = (id, name, content) => dispatch => {
  dispatch(editTemplateStart());
  axios
    .put(`${eTemplateApi}/${id}/${name}`, content, axiosConfig)
    .then(response => dispatch(editTemplateSuccess(response)))
    .catch(error => dispatch(editTemplateError(error)));
};
