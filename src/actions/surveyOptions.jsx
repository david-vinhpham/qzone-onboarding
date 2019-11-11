import axios from 'axios';
import { URL } from 'config/config';

export const FETCH_SURVEY_OPTIONS_SUCCESS = 'FETCH_SURVEY_OPTIONS_SUCCESS';

const setSurveyOptionsSuccess = payload => ({
  type: FETCH_SURVEY_OPTIONS_SUCCESS,
  payload
});

export const fetchSurveyOptionsByAssessorId = assessorId => dispatch => {
  return axios.get(`${URL.FETCH_SURVEY_OPTIONS_BY_ASSESSOR_ID}/${assessorId}`)
    .then(res => {
      if (res && res.data.success) {
        dispatch(setSurveyOptionsSuccess(res.data.objects));
      }
    });
};
