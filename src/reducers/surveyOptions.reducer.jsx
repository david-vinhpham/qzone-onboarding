import { FETCH_SURVEY_OPTIONS_SUCCESS } from "actions/surveyOptions";

const initialState = {
  surveyOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEY_OPTIONS_SUCCESS:
      return {
        ...state,
        surveyOptions: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
