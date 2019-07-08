import { service_options } from '../constants/ServiceOptions.constants';

const initialState = {
  isFetchServiceOptionsByBusinessAdminIdSuccess: false,
  serviceOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case service_options.FETCH_SERVICES_OPTIONS_BY_BUSINESS_ADMIN_ID_SUCCESS:
      return {
        ...state,
        serviceOptions: action.payload,
        isFetchServiceOptionsByBusinessAdminIdSuccess: true
      };
    default:
      return state;
  }
};

export default reducer;
