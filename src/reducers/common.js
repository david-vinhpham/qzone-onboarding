import {
  SET_LOADING,
  SET_ERROR,
  RESET_ERROR,
} from '../actions/common';

const initState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default reducer;
