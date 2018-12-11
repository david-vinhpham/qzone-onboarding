export const FETCH_BUSINESS = 'FETCH_BUSINESS'
export const FETCH_BUSINESS_SUCCESS = 'FETCH_BUSINESS_SUCCESS'
export const FETCH_BUSINESS_FAILURE = 'FETCH_BUSINESS_FAILURE'

export const CREATE_ORGANIZATION_LOADING = 'CREATE_ORGANIZATION_LOADING'
export const CREATE_ORGANIZATION_SUCCESS = 'CREATE_ORGANIZATION_SUCCESS'
export const CREATE_ORGANIZATION_FAILURE = 'CREATE_ORGANIZATION_FAILURE'

const API = 'http://13.238.116.171:8080/api/'

export const createOrganization = (values) => {
    return (dispatch) => {
        dispatch(createOrganizationLoading())
        fetch(API + 'organizations', {
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
        type: CREATE_ORGANIZATION_LOADING
    }
}

export const createOrganizationSuccess = (data) => {
    return {
        type: CREATE_ORGANIZATION_SUCCESS,
        payload: {data}
    }
}

export const createOrganizationFailure = (error) => {
    return {
        type: CREATE_ORGANIZATION_FAILURE,
        payload: {error}
    }
}

export const fetchBusinessCategory = () => {
    return (dispatch) => {
        dispatch(fetchBusiness())
        fetch(API + 'business-categories', {
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
        type: FETCH_BUSINESS
    }
}

export const fetchBusinessSucess = (data) => {
    return {
        type: FETCH_BUSINESS_SUCCESS,
        payload: {data}
    }
}

export const fetchBusinessFailure = (err) => {
    return {
        type: FETCH_BUSINESS_FAILURE,
        payload: { err }
    }
}