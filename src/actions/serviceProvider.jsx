import {API_ROOT, URL} from '../config/config';
import {serviceProvider} from '../constants/ServiceProvider.constants';

export const editServiceProvider = (values, history) => {
    return (dispatch) => {
        dispatch({
            type: serviceProvider.EDIT_SERVICE_PROVIDER_LOADING
        })
        fetch(API_ROOT + URL.SERVICE_PROVIDER, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === 200 || data.status === 201 || data.success === true) {
            let serviceProviders = localStorage.getItem('serviceProvider');
            if (serviceProviders !== null) {
              let listServiceProviders = JSON.parse(serviceProviders);
              for (let i = 0; i < listServiceProviders.length; i++) {
                // look for the entry with a matching `code` value
                if (listServiceProviders[i].id === data.object.id) {
                  // we found it
                  listServiceProviders[i] = data.object;
                  break;
                }
              }
              localStorage.setItem('serviceProvider', JSON.stringify(listServiceProviders));
            }
            history.push('/service-provider/list');
          }
          else {
            dispatch({
              type: serviceProvider.EDIT_SERVICE_PROVIDER_FAILURE,
              payload: {data}
            })
          }
        })
        .catch(err => {
            dispatch({
                type: serviceProvider.EDIT_SERVICE_PROVIDER_FAILURE,
                payload: {err}
            })
        })
    }
}

export const fetchServiceProvidersByUserSub = (userSub) => {
  return (dispatch) => {
    dispatch(fetchServiceProvidersLoading())
    fetch(API_ROOT + URL.FETCH_SERVICE_PROVIDERS_BY_BUSINESS_ADMIN_ID + userSub, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchServiceProvidersSuccess(data.objects))
      })
      .catch(err => {
        dispatch(fetchServiceProvidersFailure(err))
      })
  }
}

export const fetchServiceProvidersByServiceId = (serviceId) => {
  return (dispatch) => {
    dispatch(fetchServiceProvidersLoading())
    fetch(API_ROOT + URL.FETCH_SERVICE_PROVIDERS_BY_SERVICE_ID + serviceId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchServiceProvidersSuccess(data.object))
      })
      .catch(err => {
        dispatch(fetchServiceProvidersFailure(err))
      })
  }
}

export const fetchServiceProvidersLoading = () => {
  return {
    type: serviceProvider.FETCH_SERVICE_PROVIDERS_LOADING
  }
}

export const fetchServiceProvidersSuccess = (data) => {
  return {
    type: serviceProvider.FETCH_SERVICE_PROVIDERS_SUCCESS,
    payload: { data }
  }
}

export const fetchServiceProvidersFailure = (error) => {
  return {
    type: serviceProvider.FETCH_SERVICE_PROVIDERS_FAILURE,
    payload: { error }
  }
}

export const fetchServiceProviderById = (id) => {
        return (dispatch) => {
        dispatch(fetchServiceProviderLoading())
        fetch(API_ROOT + URL.FETCH_SERVICE_PROVIDER_BY_ID + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchServiceProviderSuccess(data.object));
            localStorage.setItem('originServiceTimeSlot', JSON.stringify(data.object.serviceTimeSlot));

        })
        .catch(err => {
            dispatch(fetchServiceProviderFailure(err))
        })
    }
}

export const fetchServiceProviderLoading = () => {
    return {
        type: serviceProvider.FETCH_SERVICE_PROVIDER_LOADING
    }
}

export const fetchServiceProviderSuccess = (data) => {
    return {
        type: serviceProvider.FETCH_SERVICE_PROVIDER_SUCCESS,
        payload: { data }
    }
}

export const fetchServiceProviderFailure = (error) => {
    return {
        type: serviceProvider.FETCH_SERVICE_PROVIDER_FAILURE,
        payload: { error }
    }
}

export const deleteServiceProvider = (id) => {
  return (dispatch) => {
    dispatch({ type: serviceProvider.DEL_SERVICE_PROVIDER_LOADING })
    fetch(API_ROOT + URL.SERVICE_PROVIDER + '/' + id ,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if(data.status === 200 || data.status === 201 || data.success === true) {
          let objects = {
            data:[],
          }
          let serviceProviders = localStorage.getItem('serviceProvider');
          if (serviceProviders !== null) {
            let listServiceProviders = JSON.parse(serviceProviders);
            for (let i = 0; i < listServiceProviders.length; i++) {
              if (listServiceProviders[i].id === id) {
                // we found it
                console.log('delete obj ' + id);
                delete listServiceProviders[i];
                break;
              }
            }
            if(listServiceProviders.length > 0) {
              objects.data = listServiceProviders;//json
              localStorage.setItem('serviceProvider', JSON.stringify(listServiceProviders));
            }
            dispatch({
              type: serviceProvider.DEL_SERVICE_PROVIDER_SUCCESS,
              payload: objects
            });
        }}
        else {
          dispatch({
            type: serviceProvider.DEL_SERVICE_PROVIDER_FAILURE,
            payload: data
          })
        }
      })
  }
}

export const createServiceProvider = (data, history) => {
    return (dispatch) => {
        dispatch(createServiceProviderLoading())
        fetch(API_ROOT + URL.SERVICE_PROVIDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            //adding to cached
          if(data.status === 200 || data.status === 201 || data.success === true) {
            let serviceProviders = localStorage.getItem('serviceProvider');
            if (serviceProviders !== null) {
              var listServiceProviders = JSON.parse(serviceProviders);
              listServiceProviders.push(data.object);
              localStorage.setItem('serviceProvider', JSON.stringify(listServiceProviders));
              history.push('/service-provider/list');
            }
          }
          else {
            dispatch(createServiceProviderFailure(data))
          }
        })
        .catch(err => {
            dispatch(createServiceProviderFailure(err))
        })
    }
}

export const createServiceProviderLoading = () => {
    return {
        type: serviceProvider.CREATE_SERVICE_PROVIDER_LOADING
    }
}

export const createServiceProviderSuccess = (data) => {
    return {
        type: serviceProvider.CREATE_SERVICE_PROVIDER_SUCCESS,
        payload: { data }
    }
}

export const createServiceProviderFailure = (error) => {
    return {
        type: serviceProvider.CREATE_SERVICE_PROVIDER_FAILURE,
        payload: { error }
    }
}

