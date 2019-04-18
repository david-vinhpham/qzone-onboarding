import { special_event } from '../constants/SpecialEvents.constants';

const initialState = {
  isLoading: false,
  list: [],

  special_event: [],

  editSpecialEventError: null,
  editSpecialEventLoading: false,

  delSpecialEventError: null,
  delSpecialEventLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case special_event.SUCCESS:
      return {
        ...state,
        list: action.payload.sort((prev, next) => {
          return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
        }),
      };
    case special_event.LOADING:
      return { ...state, isLoading: action.payload };

    case special_event.DEL_SPECIAL_EVENT_LOADING:
      return { ...state, delSpecialEventLoading: true };

    case special_event.DEL_SPECIAL_EVENT_SUCCESS:
      return { ...state, special_event: action.payload , delSpecialEventLoading: false };

    case special_event.DEL_SPECIAL_EVENT_FAILURE:
      return {
        ...state,
        special_event: [],
        delSpecialEventError: action.payload.error,
        delSpecialEventLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
