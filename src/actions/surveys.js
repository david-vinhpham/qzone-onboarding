import {
  setLoading,
  setError,
} from '../actions/common';
import {
  handleRequest,
} from '../utils/apiHelpers';
import {
  getSurveys,
} from '../apiActions/surveys';

export const SET_SURVEYS = 'SURVEY.SET_SURVEYS';

const setSurveys = payload => ({
  type: SET_SURVEYS,
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
