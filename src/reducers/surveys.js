import {
  SET_SURVEYS,
  SAVE_SURVEY,
  DELETE_SURVEY_BY_ID,
  RESET_SURVEY_STATUS,
} from "../actions/surveys";

const initState = {
  surveys: null,
  isSavedSurvey: null,
  isDeletedSurveyById: null,
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case SET_SURVEYS:
      return {
        ...state,
        surveys: action.payload,
      };
    case SAVE_SURVEY:
      return {
        ...state,
        isSavedSurvey: action.payload,
      };
    case RESET_SURVEY_STATUS:
      return {
        ...state,
        isSavedSurvey: null,
        isDeletedSurveyById: null,
      };
    case DELETE_SURVEY_BY_ID:
      return {
        ...state,
        isDeletedSurveyById: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
