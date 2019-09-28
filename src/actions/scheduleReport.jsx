import axios from 'axios';
import { get } from 'lodash';
import { scheduleReportConstant } from 'constants/ScheduleReport.constant';
import { URL } from 'config/config';
import { showAlert } from './alert';

const setScheduleReportLoading = payload => ({
  type: scheduleReportConstant.FETCH_SCHEDULE_REPORT_LOADING,
  payload
});

const setScheduleReportSuccess = payload => ({
  type: scheduleReportConstant.FETCH_SCHEDULE_REPORT_SUCCESS,
  payload
});

export const fetchScheduleReport = payload => dispatch => {
  dispatch(setScheduleReportLoading(true));
  axios.post(URL.FIND_SCHEDULE_REPORT_BY_TMP_SERVICE, payload)
    .then(resp => {
      if (resp && resp.data.success) {
        dispatch(setScheduleReportSuccess(get(resp, 'data.object', [])));
      } else {
        dispatch(showAlert('error', 'Failed to load data'));
        window.location.replace("/dashboard");
      }
    })
    .finally(() => { dispatch(setScheduleReportLoading(false)) });
}