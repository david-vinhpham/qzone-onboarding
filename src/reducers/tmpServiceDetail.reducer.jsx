import { tmpServiceDetail } from '../constants/TmpServiceDetail.constants';

const initialState = {
  isLoading: false,
  isError: null,
  eventDetail: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_LOADING:
      return { ...state, isLoading: true };
    case tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_SUCCESS:
      return { ...state, eventDetail: action.payload, isLoading: false };
    case tmpServiceDetail.FETCH_TMP_SERVICE_DETAIL_FAILURE:
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
