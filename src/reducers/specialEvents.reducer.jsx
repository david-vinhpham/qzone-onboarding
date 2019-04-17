import { FETCH_SPECIAL_EVENTS } from 'constants/SpecialEvents.constants';

const initialState = {
  isLoading: false,
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPECIAL_EVENTS.SUCCESS:
      return {
        ...state,
        list: action.payload.sort((prev, next) => {
          return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
        }),
      };
    case FETCH_SPECIAL_EVENTS.LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
