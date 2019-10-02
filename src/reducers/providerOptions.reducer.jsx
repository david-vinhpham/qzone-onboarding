import { FETCH_PROVIDERS_OPTIONS_SUCCESS } from "actions/providerOptions";

const initialState = {
  isFetchProviderOptionsSuccess: false,
  providerOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROVIDERS_OPTIONS_SUCCESS:
      return {
        ...state,
        providerOptions: action.payload,
        isFetchProviderOptionsSuccess: true
      };
    default:
      return state;
  }
};

export default reducer;
