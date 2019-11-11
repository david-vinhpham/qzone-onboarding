import axios from 'axios';
import { URL } from 'config/config';
import { handleRequest } from 'utils/apiHelpers';

export const SET_CHART_DATA = 'SET_CHART_DATA';

export const getChartBySurveyId = surveyId => async (dispatch) => {
  const [result] = await handleRequest(axios.get, [`${URL.FETCH_CHART_BY_SURVEY_ID}/${surveyId}`], null);
  if (result) {
    dispatch({
      type: SET_CHART_DATA,
      payload: result
    });
  }
}
