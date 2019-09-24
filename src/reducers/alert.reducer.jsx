import { SHOW_ALERT, CLOSE_ALERT } from "actions/alert";

const initialState = {
  open: false,
  variant: 'success',
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, ...action.payload, open: true };
    case CLOSE_ALERT:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
