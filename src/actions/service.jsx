import { API_ROOT, URL} from '../config/config';
import { service } from '../constants/Service.constants';

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
        //fetch('http://13.238.116.171:8080/api/services-by-org-id/%7BorgId%7D?orgId=5c109dc921d2880f2c9b0b8b', {
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

