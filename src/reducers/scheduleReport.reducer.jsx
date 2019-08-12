import { scheduleReportConstant } from 'constants/ScheduleReport.constant';

const initialState = {
  isLoading: false,
  list: [],
  providerName: '',
  dateEvent: '',
  timezone: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case scheduleReportConstant.FETCH_SCHEDULE_REPORT_LOADING:
      return { ...state, isLoading: action.payload };
    case scheduleReportConstant.FETCH_SCHEDULE_REPORT_SUCCESS:
      return { ...state, list: action.payload.tmServiceReportList, providerName: action.payload.providerName,
        timezone:  action.payload.timezoneId,
        dateEvent: action.payload.dateEvent, isLoading:false };
    default:
      return state;
  }
};

export default reducer;
