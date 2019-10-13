import axios from 'axios';
import { organization } from '../constants/Organization.constants';
import { URL } from '../config/config';

export const fetchOrganization = id => {
  return dispatch => {
    dispatch({ type: organization.FETCH_ORGANIZATION_LOADING });
    axios.get(URL.FETCH_ORGANIZATION + id)
      .then(({ data }) => {
        dispatch({
          type: organization.FETCH_ORGANIZATION_SUCCESS,
          payload: data.object
        });
      })
      .catch(err => {
        dispatch({
          type: organization.FETCH_ORGANIZATION_FAILURE,
          payload: err
        });
      });
  };
};

export const editOrganizationLoading = () => {
  return {
    type: organization.EDIT_ORGANIZATION_LOADING
  };
};

export const editOrganizationSuccess = data => {
  return {
    type: organization.EDIT_ORGANIZATION_SUCCESS,
    payload: data
  };
};

export const editOrganizationFailure = error => {
  return {
    type: organization.EDIT_ORGANIZATION_FAILURE,
    payload: error
  };
};

export const editOrganization = (values, history) => {
  return dispatch => {
    dispatch(editOrganizationLoading());
    axios.put(URL.ORGANIZATION, values)
      .then(({ data }) => {
        dispatch(editOrganizationSuccess(data));
        history.push('/organization/list');
      })
      .catch(err => {
        dispatch(editOrganizationFailure(err));
      });
  };
};

export const fetchOrganizationsLoading = () => {
  return {
    type: organization.FETCH_ORGANIZATIONS_LOADING
  };
};

export const fetchOrganizationsSuccess = organizations => {
  return {
    type: organization.FETCH_ORGANIZATIONS_SUCCESS,
    payload: { organizations }
  };
};

export const fetchOrganizationsFailure = error => {
  return {
    type: organization.FETCH_ORGANIZATIONS_FAILURE,
    payload: { error }
  };
};

export const fetchOrganizationsByBusinessAdminId = adminId => {
  return dispatch => {
    dispatch(fetchOrganizationsLoading());
    axios.get(URL.FETCH_ORGANIZATIONS_BY_BUSINESS_ADMIN_ID + adminId)
      .then(({ data }) => {
        dispatch(fetchOrganizationsSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchOrganizationsFailure('Cannot fetch organizations'));
      });
  };
};

export const fetchOrganizationsOptionByBusinessAdminId = adminId => {
  return dispatch => {
    dispatch(fetchOrganizationsLoading());
    axios.get(URL.FETCH_ORGANIZATIONS_OPTION_BY_BUSINESS_ADMIN_ID + adminId)
      .then(({ data }) => {
        dispatch(fetchOrganizationsSuccess(data.objects));
      })
      .catch(err => {
        dispatch(fetchOrganizationsFailure('Cannot fetch organizations options'));
      });
  };
};

export const createOrganizationLoading = () => {
  return {
    type: organization.CREATE_ORGANIZATION_LOADING
  };
};

export const createOrganizationSuccess = data => {
  return {
    type: organization.CREATE_ORGANIZATION_SUCCESS,
    payload: { data }
  };
};

export const createOrganizationFailure = error => {
  return {
    type: organization.CREATE_ORGANIZATION_FAILURE,
    payload: { error }
  };
};

export const createOrganization = (values, history) => {
  return dispatch => {
    dispatch(createOrganizationLoading());
    axios.get(URL.ORGANIZATION_NAME_VALIDATE + values.name)
      .then((resp) => {
        if (resp.data.object === 'VALID') {
          axios.post(URL.ORGANIZATION, values)
            .then(({ data }) => {
              if ((data.status === 200 || data.status === 201) && data.success) {
                dispatch(createOrganizationSuccess(data));
                history.goBack();
              } else {
                dispatch(createOrganizationFailure(data));
              }
            })
            .catch(err => {
              dispatch(createOrganizationFailure(err));
            });
        } else {
          alert('Already registered organization. Please enter a unique name');
        }
      })
      .catch(err => console.log('error', err));
  };
};
