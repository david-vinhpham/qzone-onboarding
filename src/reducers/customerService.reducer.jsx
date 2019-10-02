import { customer_service } from '../constants/CustomerService.constants';

const initialState = {
  isLoading: false,
  isVerifyBookingCodeSuccess: false,
  verifyData: {},

  isUpdateStatusSuccess: false,
  updateData: {},

  isBoardLoading: false,
  boardData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case customer_service.VERIFY_BOOKING_CODE_SUCCESS:
      return {
        ...state,
        verifyData: action.payload,
        isVerifyBookingCodeSuccess: true
      };
    case customer_service.VERIFY_BOOKING_CODE_FAILURE:
      return {
        ...state,
        verifyData: {},
        isVerifyBookingCodeSuccess: false
      }
    case customer_service.VERIFY_BOOKING_CODE_LOADING:
      return { ...state, isLoading: action.payload };
    case customer_service.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        isUpdateStatusSuccess: true,
        updateData: action.payload,
        verifyData: action.payload,
        isVerifyBookingCodeSuccess: false
      };
    case customer_service.FETCH_FLOW_BOARD_SUCCESS:
      return {
        ...state,
        boardData: action.payload,
      };
    case customer_service.FETCH_FLOW_BOARD_LOADING:
      return { ...state, isBoardLoading: action.payload };

    default:
      return state;
  }
};

export default reducer;
