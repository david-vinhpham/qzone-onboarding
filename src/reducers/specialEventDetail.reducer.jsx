import { specialEventDetail } from '../constants/SpecialEventDetail.constants';

const initialState = {
  isLoading: false,
  isError: null,
  eventDetail: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_LOADING:
      return { ...state, isLoading: true };
    case specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_SUCCESS:
      return { ...state, eventDetail: action.payload, isLoading: false };
    case specialEventDetail.FETCH_SPECIAL_EVENT_DETAIL_FAILURE:
      return {
        ...state,
        eventDetail: {},
        isError: action.payload.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
