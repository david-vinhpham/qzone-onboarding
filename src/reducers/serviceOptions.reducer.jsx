import { service_options } from '../constants/ServiceOptions.constants';

const initialState = {
  isFetchServiceOptionsSuccess: false,
  serviceOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case service_options.FETCH_SERVICES_OPTIONS_SUCCESS:
      return {
        ...state,
        serviceOptions: action.payload,
        isFetchServiceOptionsSuccess: true
      };
    default:
      return state;
  }
};

export default reducer;
