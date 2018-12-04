import {
  CREATE_TEMPLATE_ERROR,
  CREATE_TEMPLATE_START,
  CREATE_TEMPLATE_SUCCESS,
  EDIT_TEMPLATE_ERROR,
  EDIT_TEMPLATE_START,
  EDIT_TEMPLATE_SUCCESS,
  CLEAN_EDIT_TEMPLATE_STATUS,
  CLEAN_CREATE_TEMPLATE_ERROR,
  DELETE_TEMPLATE_ERROR,
  DELETE_TEMPLATE_START,
  DELETE_TEMPLATE_SUCCESS,
  FETCH_EMAIL_TEMPLATES_ERROR,
  FETCH_EMAIL_TEMPLATES_START,
  FETCH_EMAIL_TEMPLATES_SUCCESS,
  CLEAN_TEMPLATE_EDIT_STATUS,
  UPDATE_EMAIL_TEMPLATES,
  FETCH_TEMPLATE_ERROR,
  FETCH_TEMPLATE_START,
  FETCH_TEMPLATE_SUCCESS,
  RESET_DELETE_STATUS,
  SAVE_TEMPLATE_NAME_LIST,
} from "../actions/email_templates";

const initialState = {
  templates: [],
  templateName: '',
  templateContent: '',
  loading: false,
  error: null,
  deleteStatus: 404,
  isTemplateCreated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMAIL_TEMPLATES_START:
      return { ...state, loading: true };
    case FETCH_EMAIL_TEMPLATES_SUCCESS:
      return { ...state, loading: false, templates: action.payload.objects };
    case FETCH_EMAIL_TEMPLATES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_EMAIL_TEMPLATES:
      return { ...state, templates: action.payload };
    case FETCH_TEMPLATE_START:
      return { ...state, loading: true };
    case FETCH_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templateContent: action.payload.object.content, templateName: action.payload.object.name };
    case FETCH_TEMPLATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAN_TEMPLATE_EDIT_STATUS:
      return { ...state, templateContent: '', templateName: ''};
    case DELETE_TEMPLATE_START:
      return { ...state, loading: true, templateIdDeleted: action.payload };
    case DELETE_TEMPLATE_SUCCESS:
      return { ...state, loading: false, deleteStatus: action.payload.status };
    case DELETE_TEMPLATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case EDIT_TEMPLATE_START:
      return { ...state, loading: true };
    case EDIT_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templateId: action.payload.object.id, isTemplateEdited: action.payload.success };
    case EDIT_TEMPLATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAN_EDIT_TEMPLATE_STATUS:
      return { ...state, isTemplateEdited: false };
    case CREATE_TEMPLATE_START:
      return { ...state, loading: true };
    case CREATE_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templateId: action.payload.object.id, isTemplateCreated: action.payload.success };
    case CREATE_TEMPLATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAN_CREATE_TEMPLATE_ERROR:
      return { ...state, error: ''};
    case RESET_DELETE_STATUS: 
      return { ...state, deleteStatus: 404 };
    case SAVE_TEMPLATE_NAME_LIST:
      return { ...state, templateNameList: action.payload };
    default:
      return state;
  }
};
export default reducer;
