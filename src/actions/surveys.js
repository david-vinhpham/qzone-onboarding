import {
  setLoading,
  setError,
} from '../actions/common';
import {
  handleRequest,
} from '../utils/apiHelpers';
import {
  getSurveys,
  postSurvey,
  deleteSurveyById,
} from '../apiActions/surveys';

export const SET_SURVEYS = 'SURVEY.SET_SURVEYS';
export const SAVE_SURVEY = 'SURVEY.SAVE_SURVEY';
export const DELETE_SURVEY_BY_ID = 'SURVEY.DELETE_SURVEY_BY_ID';
export const RESET_SURVEY_STATUS = 'SURVEY.RESET_SURVEY_STATUS';

const setSurveys = payload => ({
  type: SET_SURVEYS,
  payload,
});
const saveSurvey = payload => ({
  type: SAVE_SURVEY,
  payload,
});
const deleteSurvey = payload => ({
  type: DELETE_SURVEY_BY_ID,
  payload,
});
export const resetSurveyStatus = () => ({
  type: RESET_SURVEY_STATUS,
});

export const setSurveysAction = assessorId => async dispatch => {
  dispatch(setLoading(true));
  const [surveys, error] = await handleRequest(getSurveys, [assessorId]);
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(setSurveys(surveys));
  }
  dispatch(setLoading(false));
};
export const saveSurveyAction = data => async dispatch => {
  dispatch(setLoading(true));
  const [result, error] = await handleRequest(postSurvey, [data]);
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(saveSurvey(result));
  }
  dispatch(setLoading(false));
};

export const deleteSurveyByIdAction = data => async dispatch => {
  dispatch(setLoading(true));
  const [result, error] = await handleRequest(deleteSurveyById, [data]);
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(deleteSurvey(result || true));
  }
  dispatch(setLoading(false));
};
