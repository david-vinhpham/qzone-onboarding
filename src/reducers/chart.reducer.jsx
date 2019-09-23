import { SET_CHART_DATA } from "actions/chart";

const initialState = {
  data: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHART_DATA:
      return { ...state, data: action.payload }
    default:
      return state;
  }
}

export default reducer;
