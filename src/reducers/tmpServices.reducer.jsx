import { tmp_service } from '../constants/TmpServices.constants';

const initialState = {
  isLoading: false,
  list: [],

  tmp_service: [],

  editTmpServiceError: null,
  editTmpServiceLoading: false,

  delTmpServiceLoading: false,

  reportData: {
    filename: '',
    data: [],
    headers: [
      { label: 'Email', key: 'customerEmail' },
      { label: 'Full name', key: 'customerName' },
      { label: 'Phone number', key: 'customerPhone' },
      { label: 'Start time', key: 'startTime' },
      { label: 'To time', key: 'toTime' },
      { label: 'Status', key: 'status' }
    ]
  },
  isReportLoading: false,
};

const reducer = (state = initialState, action) => {
  console.log('SET_SCHEDULE_REPORT_DATA...')
  switch (action.type) {
    case tmp_service.FETCH_TMP_SERVICES_SUCCESS:
      return {
        ...state,
        list: action.payload.sort((prev, next) => {
          return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
        }),
      };
    case tmp_service.FETCH_TMP_SERVICES_LOADING:
      return { ...state, isLoading: action.payload };

    case tmp_service.DEL_TMP_SERVICE_LOADING:
      return { ...state, isLoading: true };

    case tmp_service.DEL_TMP_SERVICE_SUCCESS:
      return { ...state, list: action.payload, isLoading: false };

    case tmp_service.SET_TMP_SERVICE:
      return {
        ...state,
        list: state.list
          .map(service => service.id === action.payload.id ? action.payload : service)
          .sort((prev, next) => {
            return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
          })
      };
    case tmp_service.SET_SCHEDULE_REPORT_DATA:
      return {
        ...state,
        reportData: {
          ...state.reportData,
          filename: action.payload.providerName
            ? `Quezone schedule report ${action.payload.providerName} - ${action.payload.dateEvent}.csv`
            : '',
          data: action.payload.tmServiceReportList.map(item => ({
            customerEmail: item.customerEmail,
            customerName: item.customerName,
            customerPhone: `=""${item.customerPhone}""`,
            startTime: item.startTime,
            toTime: item.toTime,
            status: item.status
          })),
        }
      };
    case tmp_service.SET_SCHEDULE_REPORT_LOADING:
      return {
        ...state,
        isReportLoading: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
