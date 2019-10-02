import { FETCH_CUSTOMER_REPORTS_LOADING, FETCH_CUSTOMER_REPORTS_DONE, SET_CUSTOMER_REPORTS } from "actions/reports";
import { eventStatus, boardMode } from "constants.js";

const initialState = {
  isLoading: false,
  info: {
    filename: '',
    data: {
      [eventStatus.checkedIn]: [],
      [eventStatus.started]: [],
      [eventStatus.completed]: [],
    },
    headers: [
      { label: 'Booking code', key: 'bookingCode' },
      { label: 'Position', key: 'position' },
      { label: 'Email', key: 'email' },
      { label: 'Full name', key: 'name' },
      { label: 'Phone number', key: 'phone' },
      { label: 'Service time', key: 'sserviceTime' },
      { label: 'Booking time', key: 'sbookingTime' },
      { label: 'Canceled time', key: 'scancelledTime' },
      { label: 'Checking time', key: 'scheckingTime' },
      { label: 'Completed time', key: 'scompletedTime' },
    ]
  },
};

const sanitizeListCustomer = (list, mode) => {
  return list.map(record => ({
    ...record,
    position: mode === boardMode.queue ? record.position : undefined,
		phone: `=""${record.phone}""`,
		bookingCode: `=""${record.bookingCode}""`,
  }))
}

const buildReportData = (rawData) => {
  return {
    data: {
      [eventStatus.checkedIn]: sanitizeListCustomer(rawData.listCustomersWaiting, rawData.mode),
      [eventStatus.started]: sanitizeListCustomer(rawData.listCustomersInService, rawData.mode),
      [eventStatus.completed]: sanitizeListCustomer(rawData.listCustomersFinished, rawData.mode),
      providerName: rawData.providerName,
      serviceName: rawData.serviceName,
    },
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_REPORTS_LOADING:
      return { ...state, isLoading: true };
    case FETCH_CUSTOMER_REPORTS_DONE:
      return { ...state, isLoading: false };
    case SET_CUSTOMER_REPORTS:
      return { ...state, info: { ...state.info, ...buildReportData(action.payload) } };
    default:
      return state;
  }
};

export default reducer;
