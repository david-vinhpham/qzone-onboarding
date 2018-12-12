import {organization} from '../constants/Organization.constants';
import {API_ROOT, URL} from '../config/config';


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