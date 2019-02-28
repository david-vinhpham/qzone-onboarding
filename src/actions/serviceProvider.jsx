import {API_ROOT, URL} from '../config/config';
import {serviceProvider} from '../constants/ServiceProvider.constants';

export const editServiceProvider = (values, history) => {
    return (dispatch) => {
        dispatch({
            type: serviceProvider.UPDATE_SERVICE_PROVIDER
        })
        fetch(API_ROOT + URL.UPDATE_SERVICE_PROVIDER, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: serviceProvider.FETCH_SERVICE_PROVIDER_SUCCESS
                payload: {data}
            })
            history.push('/service-providers/list');
        })
        .catch(err => {
            dispatch({
                type: serviceProvider.UPDATE_SERVICE_PROVIDER_FAILURE,
                payload: {err}
            })
        })
    }
}

export const fetchServiceProviderById = (id) => {
        return (dispatch) => {
        dispatch(fetchServiceProviderByIdLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_PROVIDER_BY_ID + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServiceProviderByIdSuccess(data.object))
        })
        .catch(err => {
            dispatch(fetchServiceProviderByIdFailure(err))
        })
    }
}

export const fetchServiceProviderByIdLoading = () => {
    return {
        type: serviceProvider.FETCH_SERVICE_PROVIDER
    }
}

export const fetchServiceProviderByIdSuccess = (data) => {
    return {
        type: serviceProvider.FETCH_SERVICE_PROVIDER_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceProviderByIdFailure = (error) => {
    return {
        type: serviceProvider.UPDATE_SERVICE_PROVIDER_FAILURE,
        payload: { error }
    }
}

export const fetchOganizationByBusinessAdminId = () => {
    return (dispatch) => {
        dispatch(getServiceCategoryLoading())
        fetch(API_ROOT + URL.GET_ORGANIZATION_BY_BUSINESS_ADMIN_ID, {
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

export const getServiceCategoryLoading = () => {
    return {
        type: service.FETCH_CATEGORY
    }
}

export const getServiceCategorySuccess = (data) => {
    return {
        type: service.FETCH_CATEGORY_SUCCESS,
        payload: { data }
    }
}

export const getServiceCategoryFailure = (error) => {
    return {
        type: service.FETCH_CATEGORY_FAILURE,
        payload: { error }
    }
}

export const getServicesByOrganization = () => {
    let orgId = localStorage.getItem('organizationId');
    return (dispatch) => {
        dispatch(getServicesByOrganizationLoading())
        fetch(API_ROOT + URL.GET_SERVICES + orgId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getServicesByOrganizationSuccess(data.objects))
        })
        .catch(err => {
            dispatch(getServicesByOrganizationFailure(err))
        })
    }
}

export const getServicesByBusinessAdminId = (businessAdminId) => {
  return (dispatch) => {
    dispatch(getServicesByOrganizationLoading())
    fetch(API_ROOT + URL.GET_SERVICES_BY_BUSINESS_ADMIN_ID + businessAdminId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(getServicesByBusinessAdminSuccess(data.objects))
    })
    .catch(err => {
      dispatch(getServicesByBusinessAdminFailure(err))
    })
  }
}

export const getServicesByOrganizationLoading = () => {
    return {
        type: service.FETCH_SERVICES
    }
}

export const getServicesByOrganizationSuccess = (data) => {
    return {
        type: service.FETCH_SERVICES_SUCCESS,
        payload: { data }
    }
}

export const getServicesByOrganizationFailure = (error) => {
  return {
    type: service.FETCH_SERVICES_FAILURE,
    payload: { error }
  }
}

export const getServicesByBusinessAdminLoading = () => {
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

