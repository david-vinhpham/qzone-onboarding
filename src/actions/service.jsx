import { API_ROOT, URL } from '../config/config';
import { service } from '../constants/Service.constants';

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

export const deleteService = id => {
  return dispatch => {
    dispatch({ type: service.DEL_SERVICE_LOADING });
    fetch(`${API_ROOT + URL.SERVICE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success) {
          const objects = {
            data: []
          };
          let serviceCached = localStorage.getItem('serviceCached');
          if (serviceCached !== null) {
            serviceCached = JSON.parse(serviceCached); // json
            for (let i = 0; i < serviceCached.length; i += 1) {
              if (serviceCached[i].id === id) {
                delete serviceCached[i];
                break;
              }
            }
            if (serviceCached.length > 0) {
              objects.data = serviceCached; // json
              localStorage.setItem('serviceCached', JSON.stringify(serviceCached));
            }
          }
          dispatch({
            type: service.DEL_SERVICE_SUCCESS,
            payload: objects
          });
        } else {
          dispatch({
            type: service.DEL_SERVICE_FAILURE,
            payload: data
          });
        }
      });
  };
};

export const editService = (data, history) => {
  return dispatch => {
    dispatch(editServiceLoading());
    fetch(API_ROOT + URL.SERVICE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(svc => {
        if (svc.status === 200 || svc.status === 201 || svc.success) {
          let serviceCached = localStorage.getItem('serviceCached');
          if (serviceCached !== null) {
            serviceCached = JSON.parse(serviceCached);
            for (let i = 0; i < serviceCached.length; i += 1) {
              // look for the entry with a matching `code` value
              if (serviceCached[i].id === svc.object.id) {
                // we found it
                serviceCached[i] = svc.object;
                break;
              }
            }
            if (serviceCached.length > 0) {
              localStorage.setItem('serviceCached', JSON.stringify(serviceCached));
            }
          }
          history.push('/services/list');
        } else {
          dispatch(editServiceFailure(svc));
        }
      })
      .catch(err => {
        dispatch(editServiceFailure(err));
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
    fetch(API_ROOT + URL.FETCH_SERVICE_BY_ID + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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
    fetch(API_ROOT + URL.FETCH_SERVICE_CATEGORIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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
    fetch(API_ROOT + URL.FETCH_SERVICES_OPTION + orgId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
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

export const fetchServicesByBusinessAdminId = businessAdminId => {
  return dispatch => {
    dispatch(fetchServicesLoading());
    fetch(API_ROOT + URL.FETCH_SERVICES_BY_BUSINESS_ADMIN_ID + businessAdminId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchServicesSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchServicesFailure(err));
      });
  };
};

export const createService = (data, history) => {
  return dispatch => {
    dispatch(createServiceLoading());
    fetch(API_ROOT + URL.SERVICE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(svc => {
        if (svc.status === 200 || svc.status === 201 || svc.success) {
          dispatch(createServiceSuccess(svc.object));
          let serviceCached = localStorage.getItem('serviceCached');
          if (serviceCached !== null) {
            serviceCached = JSON.parse(serviceCached);
            serviceCached.push(svc.object);
            localStorage.setItem('serviceCached', JSON.stringify(serviceCached));
            history.push('/services/list');
          }
        } else {
          dispatch(createServiceFailure(svc));
        }
      })
      .catch(err => {
        dispatch(createServiceFailure(err));
      });
  };
};
