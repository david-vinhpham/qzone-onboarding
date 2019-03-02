import {API_ROOT, URL} from '../config/config';
import {service} from '../constants/Service.constants';


export const editServiceLoading = () => {
  return {
    type: service.EDIT_SERVICE_LOADING
  }
}

export const editServiceSuccess = (data) => {
  return {
    type: service.EDIT_SERVICE_SUCCESS,
    payload: { data }
  }
}

export const editServiceFailure = (error) => {
  return {
    type: service.EDIT_SERVICE_FAILURE,
    payload: { error }
  }
}


export const editService = (data, history) => {
  console.log("editService: ", data)
  return (dispatch) => {
    dispatch(editServiceLoading())
    fetch(API_ROOT + URL.SERVICE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        dispatch(editServiceSuccess(data.objects))
        history.push('/services/list')
      })
      .catch(err => {
        dispatch(editServiceFailure(err))
      })
  }
}

export const fetchServiceById = (id) => {
        return (dispatch) => {
        dispatch(fetchServiceLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_BY_ID + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServiceSuccess(data.object))
        })
        .catch(err => {
            dispatch(fetchServiceFailure(err))
        })
    }
}

export const fetchServiceLoading = () => {
    return {
        type: service.FETCH_SERVICE_LOADING
    }
}

export const fetchServiceSuccess = (data) => {
    return {
        type: service.FETCH_SERVICE_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceFailure = (error) => {
    return {
        type: service.FETCH_SERVICE_FAILURE,
        payload: { error }
    }
}

export const fetchServiceCategories = () => {
    console.log('fetchServiceCategories');
    return (dispatch) => {
        dispatch(fetchServiceCategoriesLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_CATEGORIES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServiceCategoriesSuccess(data.objects))
        })
        .catch(err => {
            dispatch(fetchServiceCategoriesFailure(err))
        })
    }
}

export const fetchServiceCategoriesLoading = () => {
    return {
        type: service.FETCH_CATEGORIES_LOADING
    }
}

export const fetchServiceCategoriesSuccess = (data) => {
    return {
        type: service.FETCH_CATEGORIES_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceCategoriesFailure = (error) => {
    return {
        type: service.FETCH_CATEGORIES_FAILURE,
        payload: { error }
    }
}

export const fetchServicesByOrgId = (orgId) => {
    return (dispatch) => {
        dispatch(fetchServicesLoading())
        fetch(API_ROOT + URL.FETCH_SERVICES + orgId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServicesSuccess(data.objects))
        })
        .catch(err => {
            dispatch(fetchServicesFailure(err))
        })
    }
}

export const fetchServicesByBusinessAdminId = (businessAdminId) => {
  return (dispatch) => {
    dispatch(fetchServicesLoading())
    fetch(API_ROOT + URL.FETCH_SERVICES_BY_BUSINESS_ADMIN_ID + businessAdminId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchServicesSuccess(data.objects))
    })
    .catch(err => {
      dispatch(fetchServicesFailure(err))
    })
  }
}

export const fetchServicesLoading = () => {
    return {
        type: service.FETCH_SERVICES_LOADING
    }
}

export const fetchServicesSuccess = (data) => {
    return {
        type: service.FETCH_SERVICES_SUCCESS,
        payload: { data }
    }
}

export const fetchServicesFailure = (error) => {
  return {
    type: service.FETCH_SERVICES_FAILURE,
    payload: { error }
  }
}

export const createService = (data, history) => {
    console.log("data---", data)
    return (dispatch) => {
        dispatch(createServiceLoading())
        fetch(API_ROOT + URL.SERVICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(createServiceSuccess(data.objects))
            history.push('/services/list')
        })
        .catch(err => {
            dispatch(createServiceFailure(err))
        })
    }
}

export const createServiceLoading = () => {
    return {
        type: service.CREATE_SERVICE_LOADING
    }
}

export const createServiceSuccess = (data) => {
    return {
        type: service.CREATE_SERVICE_SUCCESS,
        payload: { data }
    }
}

export const createServiceFailure = (error) => {
    return {
        type: service.CREATE_SERVICE_FAILURE,
        payload: { error }
    }
}

