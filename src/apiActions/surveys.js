import axios from 'axios';
import { API_SURVEY } from '../config/config';

// survey-controller

export const findSurveyByAssessorId = id => axios.get(`/find-assessor-by-id/${id}`);
export const getSurveys = () => axios.get(API_SURVEY);
export const postSurvey = data => axios.post(API_SURVEY, data);
export const editSurvey = data => axios.put(API_SURVEY, data);
export const delSurveys = () => axios.delete(API_SURVEY);
export const getSurveyById = id => axios.get(`${API_SURVEY}/${id}`);
export const delSurveyById = id => axios.delete(API_SURVEY, id);
