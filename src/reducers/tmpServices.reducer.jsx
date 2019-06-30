import { tmp_service } from '../constants/TmpServices.constants';

const initialState = {
  isLoading: false,
  list: [],

  tmp_service: [],

  editTmpServiceError: null,
  editTmpServiceLoading: false,

  tmpServiceError: null,
  delTmpServiceLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tmp_service.FETCH_TMP_SERVICES_SUCCESS:
      return {
        ...state, tmpServiceError:[],
        list: action.payload.sort((prev, next) => {
          return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
        }),
      };
    case tmp_service.FETCH_TMP_SERVICES_LOADING:
      return { ...state, isLoading: action.payload };

    case tmp_service.DEL_TMP_SERVICE_LOADING:
      return { ...state, isLoading: true };

    case tmp_service.DEL_TMP_SERVICE_SUCCESS:
      return { ...state,  tmpServiceError:[], list: action.payload, isLoading: false };

    case tmp_service.TMP_SERVICE_FAILURE:
      return {
        ...state,
        tmpServiceError: action.payload,
        isLoading: false
      };
    case tmp_service.SET_TMP_SERVICE:
      return {
        ...state,  tmpServiceError:[],
        list: action.payload.sort((prev, next) => {
          return prev.slot.startTime <= next.slot.startTime ? -1 : 1;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
