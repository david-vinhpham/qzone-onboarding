import { API_ROOT, URL} from '../config/config';
import { service } from '../constants/Service.constants';

export const editService = (values) => {
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
        })
        .catch(err => {
            dispatch({
                type: service.EDIT_SERVICE_FAILURE,
                payload: {err}
            })
        })
    }
}

export const getServiceById = (id) => {
    return (dispatch) => {
        dispatch(getServiceByIdLoading())
        fetch(API_ROOT + URL.GET_SERVICE_BY_ID + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getServiceByIdSuccess(data.object))
        })
        .catch(err => {
            dispatch(getServiceByIdFailure(err))
        })
    }
}

export const getServiceByIdLoading = () => {
    return {
        type: service.FETCH_SERVICE_BY_ID
    }
}

export const getServiceByIdSuccess = (data) => {
    return {
        type: service.FETCH_SERVICE_BY_ID_SUCCESS,
        payload: { data }
    }
}

export const getServiceByIdFailure = (error) => {
    return {
        type: service.FETCH_SERVICE_BY_ID_FAILURE,
        payload: { error }
    }
}

export const getServiceCategory = () => {
    return (dispatch) => {
        dispatch(getServiceCategoryLoading())
        fetch(API_ROOT + URL.GET_SERVICE_CATEGORY, {
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

export const createService = (data) => {
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

