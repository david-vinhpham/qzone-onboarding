import axios from 'axios';
import { URL } from '../config/config';
import { service } from '../constants/Service.constants';
import React from "react";
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';
export const editServiceLoading = () => {
  return {
    type: service.EDIT_SERVICE_LOADING
  };
};

export const editServiceFailure = error => {
  return {
    type: service.EDIT_SERVICE_FAILURE,
    payload: { error }
  };
};

export const editServiceSuccess = data => {
  return {
    type: service.EDIT_SERVICE_SUCCESS,
    payload: { data }
  };
};

export const deleteService = id => {
  return dispatch => {
    dispatch({ type: service.DEL_SERVICE_LOADING });
    axios.delete(`${URL.SERVICE}/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: service.DEL_SERVICE_SUCCESS,
            payload: data
          });
          const sub = localStorage.getItem('userSub');
          dispatch(fetchServicesByBusinessAdminId(sub));
        } else {
          dispatch({
            type: service.DEL_SERVICE_FAILURE,
            payload: data
          });
        }
      });
  };
};

export const editService = (body, history) => {
  return dispatch => {
    dispatch(editServiceLoading());
    axios.put(URL.SERVICE, body)
      .then(({ data }) => {
        if (data.success) {
          dispatch(editServiceSuccess(data.object));
          history.push('/services/list');
        } else {
          Alert.error(<AlertMessage>Cannot edit the service, missing image !</AlertMessage>);
        }
      })
      .catch(err => {
        Alert.error(<AlertMessage>Cannot edit the service !</AlertMessage>);
      });
  };
};

export const fetchServiceLoading = () => {
  return {
    type: service.FETCH_SERVICE_LOADING
  };
};

export const fetchServiceSuccess = data => {
  return {
    type: service.FETCH_SERVICE_SUCCESS,
    payload: { data }
  };
};

export const fetchServiceFailure = error => {
  return {
    type: service.FETCH_SERVICE_FAILURE,
    payload: { error }
  };
};

export const fetchServiceById = id => {
  return dispatch => {
    dispatch(fetchServiceLoading());
    axios.get(URL.FETCH_SERVICE_BY_ID + id)
      .then(({ data }) => {
        dispatch(fetchServiceSuccess(data.object));
      })
      .catch(err => {
        dispatch(fetchServiceFailure(err));
      });
  };
};

export const fetchServiceCategoriesLoading = () => {
  return {
    type: service.FETCH_CATEGORIES_LOADING
  };
};

export const fetchServiceCategoriesSuccess = data => {
  return {
    type: service.FETCH_CATEGORIES_SUCCESS,
    payload: { data }
  };
};

export const fetchServiceCategoriesFailure = error => {
  return {
    type: service.FETCH_CATEGORIES_FAILURE,
    payload: { error }
  };
};

export const fetchServiceCategories = () => {
  return dispatch => {
    dispatch(fetchServiceCategoriesLoading());
    axios.get(URL.FETCH_SERVICE_CATEGORIES)
      .then(({ data }) => {
        dispatch(fetchServiceCategoriesSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchServiceCategoriesFailure(err));
      });
  };
};

export const fetchServicesLoading = () => {
  return {
    type: service.FETCH_SERVICES_LOADING
  };
};

export const fetchServicesSuccess = data => {
  return {
    type: service.FETCH_SERVICES_SUCCESS,
    payload: { data }
  };
};

export const fetchServicesFailure = error => {
  return {
    type: service.FETCH_SERVICES_FAILURE,
    payload: { error }
  };
};

export const fetchServicesOptionByOrgId = orgId => {
  return dispatch => {
    dispatch(fetchServicesLoading());
    axios.get(URL.FETCH_SERVICES_OPTION + orgId)
      .then(({ data }) => {
        dispatch(fetchServicesSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchServicesFailure(err));
      });
  };
};

export const createServiceLoading = () => {
  return {
    type: service.CREATE_SERVICE_LOADING
  };
};

export const createServiceSuccess = data => {
  return {
    type: service.CREATE_SERVICE_SUCCESS,
    payload: { data }
  };
};

export const createServiceFailure = error => {
  return {
    type: service.CREATE_SERVICE_FAILURE,
    payload: { error }
  };
};

export function fetchServicesByBusinessAdminId(businessAdminId) {
  return dispatch => {
    dispatch(fetchServicesLoading());
    axios.get(URL.FETCH_SERVICES_BY_BUSINESS_ADMIN_ID + businessAdminId)
      .then(({ data }) => {
        dispatch(fetchServicesSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchServicesFailure(err));
      });
  };
};

export const createService = (body, history) => {
  return dispatch => {
    dispatch(createServiceLoading());
    axios.post(URL.SERVICE, body)
      .then(({ data }) => {
        if (data.success) {
          dispatch(createServiceSuccess(data.object));
          history.push('/services/list');
        } else {
          dispatch(createServiceFailure(data));
        }
      })
      .catch(err => {
        dispatch(createServiceFailure(err));
      });
  };
};
