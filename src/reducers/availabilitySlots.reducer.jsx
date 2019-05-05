import { availabilitySlots } from 'constants/AvailabilitySlots';

const initialState = {
  isLoading: false,
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case availabilitySlots.FETCH_AVAILABILITY_LOADING:
      return { ...state, isLoading: action.payload };
    case availabilitySlots.FETCH_AVAILABILITY_SUCCESS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

export default reducer;
