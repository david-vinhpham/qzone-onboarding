import axios from 'axios';
import { API_SURVEY, URL } from '../config/config';

export const getSurveys = assessorId => axios.get(`${URL.FIND_SURVEYS_BY_ASSESSOR_ID}/${assessorId}`);
export const postSurvey = data => axios.post(API_SURVEY, data);
export const editSurvey = data => axios.put(API_SURVEY, data);
export const deleteSurveys = () => axios.delete(API_SURVEY);
export const deleteSurveyById = id => axios.delete(`${API_SURVEY}/${id}`);
export const getSurveyById = id => axios.get(`${API_SURVEY}/${id}`);
