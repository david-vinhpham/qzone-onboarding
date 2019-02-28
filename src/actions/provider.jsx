import {provider} from '../constants/Provider.constants';
import {API_ROOT, URL} from '../config/config';

export const fetchTimezones = () => {
  return (dispatch) => {
    dispatch({ type: provider.FETCH_TIMEZONES_LOADING })
    fetch(API_ROOT + URL.TIMEZONE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: provider.FETCH_TIMEZONES_SUCCESS,
            payload: data.objects
        })
    })
    .catch(err => {
        dispatch({
            type: provider.FETCH_TIMEZONES_FAILURE,
            payload: err
        })
    })
}
}

export function fetchProviders(orgId) {
  return (dispatch) => {
    dispatch(fetchProvidersLoading());
    fetch(API_ROOT + URL.FETCH_PROVIDERS_BY_ORG_ID + orgId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log("json-----------", json)
      if (json.objects) {
        dispatch(fetchProvidersSuccess(json.objects));
      } else {
        dispatch(fetchProvidersFailure("Topology Error"))
      }
      return json;
    })
    .catch(err => dispatch(fetchProvidersFailure(err)))
  };
};

export function fetchProvidersBySub(sub) {
  return (dispatch) => {
    dispatch(fetchProvidersLoading());
    fetch(API_ROOT + URL.FETCH_PROVIDERS_BY_USER_SUB + sub, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("json-----------", json)
        if (json.objects) {
          dispatch(fetchProvidersSuccess(json.objects));
        } else {
          dispatch(fetchProvidersFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(fetchProvidersFailure(err)))
  };
};


export function fetchProvidersLoading() {
  return {
    type: provider.FETCH_PROVIDERS_LOADING
  }
}

export function fetchProvidersSuccess(providers) {
  return {
    type: provider.FETCH_PROVIDERS_SUCCESS,
    payload: { providers }
  }
}

export function fetchProvidersFailure(error) {
  return {
    type: provider.FETCH_PROVIDERS_FAILURE,
    payload: { error }
  }
}
export const editProviderLoading = () => {
  return {
    type: provider.CREATE_PROVIDER_LOADING
  }
}

export const editProviderSuccess = (data) => {
  return {
    type: provider.EDIT_PROVIDER_SUCCESS,
    payload: data.object
  }
}

export const editProviderFailure = (error) => {
  return {
    type: provider.EDIT_PROVIDER_FAILURE,
    payload: error
  }
}
export function editProvider(values, history) {
  return (dispatch) => {
    dispatch(editProviderLoading())
    fetch(API_ROOT + URL.USER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
       // dispatch(editProviderSuccess(data))
        history.push('/provider/list')
      })
      .catch(err => {
        dispatch(editProviderFailure(err))
      })
  }
}
export function createProvider(values, history) {
  console.log("values-", values);
  if(values.userType === null || values.userType === '' || values.userType !== "PROVIDER") {
    values.userType = "PROVIDER";
  }
  let userSub = localStorage.getItem('userSub');
  values.providerInformation.businessId = userSub;

  return (dispatch) => {
      dispatch({ type: provider.CREATE_PROVIDER_LOADING })
        fetch(API_ROOT + URL.ADMIN_CREATE_AWS_USER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(json => {
          console.log("json-------", json)
          dispatch({ type: provider.CREATE_PROVIDER_SUCCESS, payload: json.object });
          history.push('/provider/list');
        })
        .catch(err => dispatch({ type: provider.CREATE_PROVIDER_FAILURE, payload: err}))
  };
}

export function createProviderSuccess(providers) {
  return {
    type: provider.CREATE_PROVIDER_SUCCESS,
    payload: { providers }
  }
}

export function createProviderFailure(error) {
  return {
    type: provider.CREATE_PROVIDER_FAILURE,
    payload: { error }
  }
}

export function fetchProvider(id) {
  return (dispatch) => {
      dispatch(fetchProviderLoading())
      fetch(API_ROOT + URL.USER + '/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log("json-----", json)
        if (json.object) {
          dispatch(fetchProviderSuccess(json.object));
        } else {
          dispatch(fetchProviderFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(fetchProviderFailure(err)))
  };
}

export function fetchProviderLoading() {
  return {
    type: provider.FETCH_PROVIDER_LOADING
  }
}

export function fetchProviderSuccess(data) {
  return {
    type: provider.FETCH_PROVIDER_SUCCESS,
    payload: { data }
  }
}

export function fetchProviderFailure(error) {
  return {
    type: provider.FETCH_PROVIDER_FAILURE,
    payload: { error }
  }
}
