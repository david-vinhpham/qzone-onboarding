import {organization} from '../constants/Organization.constants';
import {API_ROOT, URL} from '../config/config';

export const editOrganization = (values) => {
    return (dispatch) => {
        dispatch(editOrganizationLoading())
        fetch(API_ROOT + URL.ORGANIZATIONS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(editOrganizationSuccess(data))
            })
            .catch(err => {
                dispatch(editOrganizationFailure(err))
            })
    }
}

export const editOrganizationLoading = () => {
    return {
        type: organization.EDIT_ORGANIZATION_LOADING
    }
}

export const editOrganizationSuccess = (data) => {
    return {
        type: organization.EDIT_ORGANIZATION_SUCCESS,
        payload: data 
    }
}

export const editOrganizationFailure = (error) => {
    return {
        type: organization.EDIT_ORGANIZATION_FAILURE,
        payload: error 
    }
}

export const getOrganizationByAdmin = (adminId) => {
    return (dispatch) => {
        dispatch(getOrganizationByAdminLoading())
        fetch(API_ROOT + URL.ORGANIZATION_BY_ADMIN_ID + adminId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getOrganizationByAdminSuccess(data))
            localStorage.setItem('organizationId', data.object.id);
        })
        .catch(err => {
            dispatch(getOrganizationByAdminFailure(err))
        })
    }
}

export const getOrganizationByAdminLoading = () => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_LOADING
    }
}

export const getOrganizationByAdminSuccess = (data) => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_SUCCESS,
        payload: { data }
    }
}

export const getOrganizationByAdminFailure = (error) => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_FAILURE,
        payload: { error }
    }
}

export const createOrganization = (values) => {
    return (dispatch) => {
        dispatch(createOrganizationLoading())
        fetch(API_ROOT + URL.ORGANIZATIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(createOrganizationSuccess(data))
        })
        .catch(err => {
            dispatch(createOrganizationFailure(err))
        })
    }
}

export const createOrganizationLoading = () => {
    return {
        type: organization.CREATE_ORGANIZATION_LOADING
    }
}

export const createOrganizationSuccess = (data) => {
    return {
        type: organization.CREATE_ORGANIZATION_SUCCESS,
        payload: {data}
    }
}

export const createOrganizationFailure = (error) => {
    return {
        type: organization.CREATE_ORGANIZATION_FAILURE,
        payload: {error}
    }
}

export const fetchBusinessCategory = () => {
    return (dispatch) => {
        dispatch(fetchBusiness())
        fetch(API_ROOT + URL.BUSINESS_CATEGORY , {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchBusinessSucess(data))
        })
        .catch(err => {
            dispatch(fetchBusinessFailure(err))
        }) 
    }
}

export const fetchBusiness = () => {
    return {
        type: organization.FETCH_BUSINESS
    }
}

export const fetchBusinessSucess = (data) => {
    return {
        type: organization.FETCH_BUSINESS_SUCCESS,
        payload: {data}
    }
}

export const fetchBusinessFailure = (err) => {
    return {
        type: organization.FETCH_BUSINESS_FAILURE,
        payload: { err }
    }
}