import {
  time_zone_options
} from 'constants/TimezoneOptions.constants';

const initialState = {
  tzOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case time_zone_options.SUCCESS:
      return { ...state, tzOptions: action.payload };
    default:
      return state;
  }
};

export default reducer;
