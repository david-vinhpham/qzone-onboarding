import axios from 'axios';
import { URL } from 'config/config';
import { business_category } from '../constants/BusinessCategory.constants';

const setBusinessCategoriesLoading = payload => ({
  type: business_category.FETCH_BUSINESS_CATEGORIES_LOADING,
  payload
});

export const setBusinessCategoriesSuccess = payload => ({
  type: business_category.FETCH_BUSINESS_CATEGORIES_SUCCESS,
  payload
});

export const fetchBusinessCategories = () => dispatch => {
  dispatch(setBusinessCategoriesLoading(true));
  axios.get(URL.FETCH_BUSINESS_CATEGORIES)
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        dispatch(setBusinessCategoriesSuccess(resp.data.objects));
      }
    })
    .finally(() => {
      dispatch(setBusinessCategoriesLoading(false));
    });
};
export const deleteBusinessCategory = businessCategoryId => {
  return (dispatch, getState) => {
    dispatch(setBusinessCategoriesLoading(true));
    axios.delete(`${URL.FETCH_BUSINESS_CATEGORIES}/${businessCategoryId}`)
      .then(res => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
          const { businessCategory } = getState();
          const newList = businessCategory.businessCategories.filter(categoryObject => categoryObject.id !== businessCategoryId);
          dispatch(setBusinessCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setBusinessCategoriesLoading(false));
      })
  };
};

export const createBusinessCategory = (data) => {
  return (dispatch, getState) => {
    dispatch(setBusinessCategoriesLoading(true));
    axios.post(URL.FETCH_BUSINESS_CATEGORIES, data)
      .then((res) => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
          const { businessCategory } = getState();
          const newList = businessCategory.businessCategories.concat([res.data.object]);
          dispatch(setBusinessCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setBusinessCategoriesLoading(false));
      })
  };
};

export const editBusinessCategory = (data) => {
  return (dispatch, getState) => {
    dispatch(setBusinessCategoriesLoading(true));
    axios.put(URL.FETCH_BUSINESS_CATEGORIES, data)
      .then(res => {
        if ((res.status === 200 || res.status === 201) && res.data.success) {
          const { businessCategory } = getState();
          const newList = businessCategory.businessCategories.map(s => s.id === res.data.object.id ? res.data.object : s);
          dispatch(setBusinessCategoriesSuccess(newList));
        }
      })
      .finally(() => {
        dispatch(setBusinessCategoriesLoading(false));
      })
  };
};
