import {API_ROOT, URL} from '../config/config';
import {service} from '../constants/Service.constants';

export const editService = (values, history) => {
    return (dispatch) => {
        dispatch({
            type: service.EDIT_SERVICE
        })
        fetch(API_ROOT + URL.CREATE_SERVICE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: service.EDIT_SERVICE_SUCCESS,
                payload: {data}
            })
            history.push('/services/list');
        })
        .catch(err => {
            dispatch({
                type: service.EDIT_SERVICE_FAILURE,
                payload: {err}
            })
        })
    }
}

export const fetchServiceById = (id) => {
        return (dispatch) => {
        dispatch(fetchServiceByIdLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_BY_ID + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServiceByIdSuccess(data.object))
        })
        .catch(err => {
            dispatch(fetchServiceByIdFailure(err))
        })
    }
}

export const fetchServiceByIdLoading = () => {
    return {
        type: service.FETCH_SERVICE_BY_ID
    }
}

export const fetchServiceByIdSuccess = (data) => {
    return {
        type: service.FETCH_SERVICE_BY_ID_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceByIdFailure = (error) => {
    return {
        type: service.FETCH_SERVICE_BY_ID_FAILURE,
        payload: { error }
    }
}

export const getServiceCategory = () => {
    return (dispatch) => {
        dispatch(getServiceCategoryLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_CATEGORY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getServiceCategorySuccess(data.objects))
        })
        .catch(err => {
            dispatch(getServiceCategoryFailure(err))
        })
    }
}

export const fetchServiceCategoryLoading = () => {
    return {
        type: service.FETCH_CATEGORY
    }
}

export const fetchServiceCategorySuccess = (data) => {
    return {
        type: service.FETCH_CATEGORY_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceCategoryFailure = (error) => {
    return {
        type: service.FETCH_CATEGORY_FAILURE,
        payload: { error }
    }
}

export const fetchServicesByOrganization = () => {
    let orgId = localStorage.getItem('organizationId');
    return (dispatch) => {
        dispatch(fetchServicesByOrganizationLoading())
        fetch(API_ROOT + URL.FETCH_SERVICES + orgId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServicesByOrganizationSuccess(data.objects))
        })
        .catch(err => {
            dispatch(fetchServicesByOrganizationFailure(err))
        })
    }
}

export const fetchServicesByBusinessAdminId = (businessAdminId) => {
  return (dispatch) => {
    dispatch(fetchServicesByOrganizationLoading())
    fetch(API_ROOT + URL.FETCH_SERVICES_BY_BUSINESS_ADMIN_ID + businessAdminId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(fetchServicesByBusinessAdminSuccess(data.objects))
    })
    .catch(err => {
      dispatch(fetchServicesByBusinessAdminFailure(err))
    })
  }
}

export const fetchServicesByOrganizationLoading = () => {
    return {
        type: service.FETCH_SERVICES
    }
}

export const fetchServicesByOrganizationSuccess = (data) => {
    return {
        type: service.FETCH_SERVICES_SUCCESS,
        payload: { data }
    }
}

export const fetchServicesByOrganizationFailure = (error) => {
  return {
    type: service.FETCH_SERVICES_FAILURE,
    payload: { error }
  }
}

export const fetchServicesByBusinessAdminLoading = () => {
  return {
    type: service.FETCH_SERVICES
  }
}

export const getServicesByBusinessAdminSuccess = (data) => {
  return {
    type: service.FETCH_SERVICES_SUCCESS,
    payload: { data }
  }
}

export const getServicesByBusinessAdminFailure = (error) => {
    return {
        type: service.FETCH_SERVICES_FAILURE,
        payload: { error }
    }
}

export const createService = (data, history) => {
    console.log("data---", data)
    return (dispatch) => {
        dispatch(createServiceLoading())
        fetch(API_ROOT + URL.CREATE_SERVICE, {
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
        type: service.CREATE_SERVICE
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

