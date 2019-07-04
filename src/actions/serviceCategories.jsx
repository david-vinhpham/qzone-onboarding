import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { service_category } from '../constants/ServiceCategory.constants';

const setServiceCategoriesLoading = payload => ({
  type: service_category.FETCH_SERVICE_CATEGORIES_LOADING,
  payload
});

export const setServiceCategoriesSuccess = payload => ({
  type: service_category.FETCH_SERVICE_CATEGORIES_SUCCESS,
  payload
});

export const fetchServiceCategories = () => dispatch => {
  dispatch(setServiceCategoriesLoading(true));
  axios.get(`${API_ROOT}${URL.FETCH_SERVICE_CATEGORIES}`)
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        dispatch(setServiceCategoriesSuccess(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setServiceCategoriesLoading(false));
    });
};
export const deleteServiceCategory = serviceCategoryId => {
  return (dispatch, getState) => {
    dispatch(setServiceCategoriesLoading(true));
    axios.delete(`${API_ROOT + URL.FETCH_SERVICE_CATEGORIES}/${serviceCategoryId}`)
      .then(res => {
        if (res.status === 200 || res.status === 201 || res.data.success) {
          const { serviceCategory } = getState();
          const newList = serviceCategory.list.filter(categoryObject => categoryObject.id !== serviceCategoryId);
          dispatch(setServiceCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setServiceCategoriesLoading(false));
      })
  };
};

export const createServiceCategory = (data) => {
  return (dispatch, getState) => {
    dispatch(setServiceCategoriesLoading(true));
    axios.post(API_ROOT + URL.FETCH_SERVICE_CATEGORIES, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.data.success) {
          const { serviceCategory } = getState();
          const newList = serviceCategory.list.concat([res.data.object]);
          dispatch(setServiceCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setServiceCategoriesLoading(false));
      })
  };
};

export const editServiceCategory = (data) => {
  return (dispatch, getState) => {
    dispatch(setServiceCategoriesLoading(true));
    axios.put(API_ROOT + URL.FETCH_SERVICE_CATEGORIES, data)
      .then(res => {
        if (res.status === 200 || res.status === 201 || res.data.success) {
          const { serviceCategory } = getState();
          const newList = serviceCategory.list.map(s => s.id === res.data.object.id ? res.data.object : s);
          dispatch(setServiceCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setServiceCategoriesLoading(false));
      })
  };
};
