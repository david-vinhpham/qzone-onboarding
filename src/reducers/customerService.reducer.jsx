import { customer_service } from '../constants/CustomerService.constants';
import { eventStatus } from "../constants";

const initialState = {
  isLoading: false,
  isVerifyBookingCodeSuccess: false,
  verifyData: {},

  isUpdateStatusSuccess: false,
  updateData: {},

  isBoardLoading: false,
  boardData: {},

  isFetchServiceOptionsByBusinessAdminIdSuccess: false,
  serviceOptions: [],

  isFetchProviderOptionsByBusinessAdminIdSuccess: false,
  providerOptions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case customer_service.VERIFY_BOOKING_CODE_SUCCESS:
      return {
        ...state,
        verifyData: action.payload,
        isVerifyBookingCodeSuccess: true
      };
    case customer_service.VERIFY_BOOKING_CODE_LOADING:
      return { ...state, isLoading: action.payload };
    case customer_service.FETCH_SERVICES_OPTIONS_BY_BUSINESS_ADMIN_ID_SUCCESS:
      return {
        ...state,
        serviceOptions: action.payload,
        isFetchServiceOptionsByBusinessAdminIdSuccess: true
      };
    case customer_service.FETCH_PROVIDERS_OPTIONS_BY_BUSINESS_ADMIN_ID_SUCCESS:
      return {
        ...state,
        providerOptions: action.payload,
        isFetchProviderOptionsByBusinessAdminIdSuccess: true
      };
    case customer_service.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        isUpdateStatusSuccess: true,
        updateData: action.payload,
        verifyData: action.payload.isFromBookingData ? { ...state.verifyData, status: eventStatus.checkedIn } : state.verifyData
      };
    case customer_service.FETCH_FLOW_BOARD_SUCCESS:
      return {
        ...state,
        boardData: action.payload
      };
    case customer_service.FETCH_FLOW_BOARD_LOADING:
      return { ...state, isBoardLoading: action.payload };

    default:
      return state;
  }
};

export default reducer;
