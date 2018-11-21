import { FETCH_EMAIL_TEMPLATES_START, FETCH_EMAIL_TEMPLATES_SUCCESS, FETCH_EMAIL_TEMPLATES_ERROR } from "../actions/email_templates";

const initialState = {
  templates: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMAIL_TEMPLATES_START:
      return { ...state, loading: true };
    case FETCH_EMAIL_TEMPLATES_SUCCESS:
      return { ...state, loading: false, templates: action.payload.objects };
    case FETCH_EMAIL_TEMPLATES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
