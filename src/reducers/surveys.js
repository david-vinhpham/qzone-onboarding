import {
  SET_SURVEYS,
} from "../actions/surveys";

const initState = {
  surveys: null,
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case SET_SURVEYS:
      return {
        ...state,
        surveys: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
