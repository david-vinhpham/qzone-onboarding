import axios from 'axios';
import { URL } from 'config/config';
import { showAlert } from './alert';
import { handleRequest } from 'utils/apiHelpers';

const FETCH_WAITLIST_REPORT_LOADING = 'FETCH_WAITLIST_REPORT_LOADING';
const FETCH_WAITLIST_REPORT_SUCCESS = 'FETCH_WAITLIST_REPORT_SUCCESS';

const setWaitlistReportLoading = payload => ({
  type: FETCH_WAITLIST_REPORT_LOADING,
  payload
});

const setWaitlistReportSuccess = payload => ({
  type: FETCH_WAITLIST_REPORT_SUCCESS,
  payload
});

export const fetchWaitlistReport = tmpServiceId => async dispatch => {
  dispatch(setWaitlistReportLoading(true));

  const [result] = await handleRequest(axios.get, [`${URL.FETCH_WAITLIST_REPORT}${tmpServiceId}`]);
  if (result) {
    dispatch(setWaitlistReportSuccess(result));
  } else {
    dispatch(showAlert('error', 'Failed to load data'));
  }

  dispatch(setWaitlistReportLoading(false));
}