import axios from 'axios';
import { URL } from 'config/config';
import { service_category } from '../constants/ServiceCategory.constants';

const setServiceCategoriesLoading = payload => ({
  type: service_category.FETCH_SERVICE_CATEGORIES_LOADING,
  payload
});

export const setServiceCategoriesSuccess = payload => ({
  type: service_category.FETCH_SERVICE_CATEGORIES_SUCCESS,
  payload
});

export const fetchServiceCategories = () => (dispatch, getState) => {
  const { userDetail } = getState().user;

  dispatch(setServiceCategoriesLoading(true));
  axios.get(`${URL.FETCH_SERVICE_CATEGORIES_BY_BUSINESS_ADMIN_ID}/${userDetail.id}`)
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
    axios.delete(`${URL.FETCH_SERVICE_CATEGORIES}/${serviceCategoryId}`)
      .then(res => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
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
    axios.post(URL.FETCH_SERVICE_CATEGORIES, data)
      .then((res) => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
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
    axios.put(URL.FETCH_SERVICE_CATEGORIES, data)
      .then(res => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
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
