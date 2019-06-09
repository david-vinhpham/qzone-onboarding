import axios from 'axios';
import { API_ROOT } from '../config/config';

// survey-controller

export const findSurveyByAssessorId = id => axios.get(`/find-assessor-by-id/${id}`);
export const getSurveys = () => axios.get(`${API_ROOT}surveys`);
export const postSurvey = data => axios.post('/surveys', data);
export const editSurvey = data => axios.put('/surveys', data);
export const delSurveys = () => axios.delete('/surveys');
export const getSurveyById = id => axios.get(`/surveys/${id}`);
export const delSurveyById = id => axios.delete('/surveys', id);
