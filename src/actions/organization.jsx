import {organization} from '../constants/Organization.constants';
import {API_ROOT, URL} from '../config/config';

export const fetchOrganization = (id) => {
  return (dispatch) => {
    dispatch({ type: organization.FETCH_ORGANIZATION_LOADING })
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
        fetch(API_ROOT + URL.ORGANIZATION, {
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

export const fetchOrganizationsByBusinessAdminId = (adminId) => {
    return (dispatch) => {
        dispatch(fetchOrganizationsLoading())
        fetch(API_ROOT + URL.FETCH_ORGANIZATIONS_BY_BUSINESS_ADMIN_ID + adminId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            dispatch(fetchOrganizationsSuccess(json.objects))
        })
        .catch(err => {
            dispatch(fetchOrganizationsFailure(err))
        })
    }
}

export const fetchOrganizationsLoading = () => {
    return {
        type: organization.FETCH_ORGANIZATIONS_LOADING
    }
}

export const fetchOrganizationsSuccess = (organizations) => {
    return {
        type: organization.FETCH_ORGANIZATIONS_SUCCESS,
        payload: {organizations}
    }
}

export const fetchOrganizationsFailure = (error) => {
    return {
        type: organization.FETCH_ORGANIZATIONS_FAILURE,
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
                fetch(API_ROOT + URL.ORGANIZATION, {
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

export const fetchBusinessCategories = () => {
    return (dispatch) => {
        dispatch(fetchBusinessCategoriesLoading())
        fetch(API_ROOT + URL.FETCH_BUSINESS_CATEGORIES , {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchBusinessCategoriesSucess(data))
        })
        .catch(err => {
            dispatch(fetchBusinessCategoriesFailure(err))
        })
    }
}

export const fetchBusinessCategoriesLoading = () => {
    return {
        type: organization.FETCH_BUSINESS_CATEGORIES_LOADING
    }
}

export const fetchBusinessCategoriesSucess = (data) => {
    return {
        type: organization.FETCH_BUSINESSES_CATEGORIES_SUCCESS,
        payload: {data}
    }
}

export const fetchBusinessCategoriesFailure = (err) => {
    return {
        type: organization.FETCH_BUSINESSES_CATEGORIES_FAILURE,
        payload: { err }
    }
}
