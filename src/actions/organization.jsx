import {organization} from '../constants/Organization.constants';
import {API_ROOT, URL} from '../config/config';

export const fetchOrganization = (id) => {
  return (dispatch) => {
    dispatch({ type: organization.FETCH_ORGANIZATION_FAILURE })
    fetch(API_ROOT + URL.FETCH_ORGANIZATION + id ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: organization.FETCH_ORGANIZATION_SUCCESS,
          payload: data.object
        })
      })
      .catch(err => {
        dispatch({
          type: organization.FETCH_ORGANIZATION_FAILURE,
          payload: err
        })
      })
  }
}

export const editOrganization = (values, history) => {
    console.log('editOrganization');
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
                history.push('/organization/list')
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

export const fetchOrganizationByBusinessAdminId = (adminId) => {
    return (dispatch) => {
        dispatch(getOrganizationByAdminLoading())
        fetch(API_ROOT + URL.FETCH_ORGANIZATION_BY_BUSINESS_ADMIN_ID + adminId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            dispatch(fetchOrganizationByAdminSuccess(json.objects))
        })
        .catch(err => {
            dispatch(fetchOrganizationByAdminFailure(err))
        })
    }
}

export const fetchOrganizationByAdminLoading = () => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_LOADING
    }
}

export const fetchOrganizationByAdminSuccess = (organizations) => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_SUCCESS,
        payload: {organizations}
    }
}

export const fetchOrganizationByAdminFailure = (error) => {
    return {
        type: organization.ORGANIZATION_BY_ADMIN_FAILURE,
        payload: { error }
    }
}

export const createOrganization = (values, history) => {
    return (dispatch) => {
        dispatch(createOrganizationLoading())
        fetch(API_ROOT + URL.ORGANIZATION_NAME_VALIDATE + values.registerOrganizationName, {
            method: 'GET',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => {
            console.log("json-------", json)
            if (json.object === 'VALID') {
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
                    history.push('/dashboard');
                })
                .catch(err => {
                    dispatch(createOrganizationFailure(err))
                })
            } else {
              alert("Already registered organization. Please enter a unique name");
            }
          })
          .catch(err => console.log("error", err))

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
