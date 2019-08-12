import { scheduleReportConstant } from 'constants/ScheduleReport.constant';

const initialState = {
  isLoading: false,
  list: [],
  providerName: '',
  dateEvent: '',
};

const reducer = (state = initialState, action) => {
  console.log('scheduleReportsConstant reducer...');
  switch (action.type) {
    case scheduleReportConstant.FETCH_SCHEDULE_REPORT_LOADING:
      return { ...state, isLoading: action.payload };
    case scheduleReportConstant.FETCH_SCHEDULE_REPORT_SUCCESS:
      return { ...state, list: action.payload.tmServiceReportList, providerName: action.payload.providerName,
        dateEvent: action.payload.dateEvent, isLoading:false };
    default:
      return state;
  }
};

export default reducer;
