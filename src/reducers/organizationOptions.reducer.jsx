import { FETCH_ORG_OPTIONS_SUCCESS } from "actions/organizationOptions";

const initialState = {
  orgOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORG_OPTIONS_SUCCESS:
      return { ...state, orgOptions: action.payload };
    default:
      return state;
  }
};

export default reducer;
