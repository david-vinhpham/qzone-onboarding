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
} from '../apiActions/surveys';

export const SET_SURVEYS = 'SURVEY.SET_SURVEYS';
export const SAVE_SURVEY = 'SURVEY.SAVE_SURVEY';

const setSurveys = payload => ({
  type: SET_SURVEYS,
  payload,
});
const saveSurvey = payload => ({
  type: SAVE_SURVEY,
  payload,
});

export const setSurveysAction = () => async dispatch => {
  dispatch(setLoading(true));
  const [surveys, error] = await handleRequest(getSurveys, []);
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
  console.log('saving survey data---> ', data);
  console.log('saving survey result---> ', result);
  console.log('saving survey error---> ', error);
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(saveSurvey(result));
  }
  dispatch(setLoading(false));
};
