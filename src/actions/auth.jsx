import React from 'react';
import axios from "axios";
import { Auth } from "aws-amplify";
import { API_ROOT, URL } from "../config/config";
import { auth } from "../constants/Auth.constants";
import { eUserType } from "constants.js";
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';

const clientId = '3ov1blo2eji4acnqfcv88tcidn';

export const authGetToken = () => {
  return () => {
    const promise = new Promise((resolve, reject) => {
      const userSub = localStorage.getItem('userSub');
      const token = localStorage.getItem(
        `CognitoIdentityServiceProvider.${clientId}.${userSub}.idToken`
      );
      if (token) {
        resolve(token);
      } else {
        reject();
      }
    });
    return promise;
  };
};

export function logout(history) {
  Auth.signOut({ global: true })
    .catch(console.log)
    .finally(() => {
      localStorage.clear();
      if (history) history.push('/login');
    });
}

export const storeEmail = email => {
  return {
    type: auth.STORE_EMAIL,
    payload: { email }
  };
};

export function getUser() {
  return {
    type: auth.REGISTER_USER
  };
}

export function registerUserSuccess(user) {
  return {
    type: auth.REGISTER_USER_SUCCESS,
    payload: { user }
  };
}

export function registerUserFailure(error) {
  return {
    type: auth.REGISTER_USER_FAILURE,
    payload: { error }
  };
}

export function register(values) {
  return dispatch => {
    dispatch(storeEmail(values.registerEmail));
    dispatch(getUser());
    Auth.signUp({
      username: values.registerEmail,
      password: values.registerPassword,
      attributes: {
        email: values.registerEmail,
        'custom:user_type': 'BUSINESS_ADMIN',
        given_name: values.registerGivenName
      },
      validationData: []
    })
      .then(json => {
        if (json) {
          localStorage.setItem('username', json.object.email);
          localStorage.setItem('user', JSON.stringify(json.object));
          dispatch(registerUserSuccess(json.object));
        } else {
          dispatch(registerUserFailure('Topology Error'));
        }
        return json;
      })
      .catch(err => dispatch(registerUserFailure(err)));
  };
}

export function registerUser(values) {
  return dispatch => {
    dispatch(register(values));
    // if (values.registrationType === 'Organization') {
    // Call organization api
    //  fetch(API_ROOT + URL.ORGANIZATION_NAME_VALIDATE + values.registerOrganizationName, {
    //    method: 'GET',
    //   headers: {
    //     'Accept': '*/*',
    //      'Content-Type': 'application/json'
    //    }
    //  })
    // .then(res => res.json())
    // .then(json => {
    //    if (json.object === 'VALID') {
    //      dispatch(register(values));
    //   } else {
    //     alert("Already registered organization please login");
    //   }
    //  })
    //  .catch(err => console.log("error", err))
    // }
    // else // for customer
    //   dispatch(register(values));
  };
}
export const resetPassword = values => {
  return dispatch => {
    dispatch(storeEmail(values.email));
    dispatch({ type: auth.RESET_PASSWORD_LOADING });
    fetch(API_ROOT + URL.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success) {
          dispatch({
            type: auth.RESET_PASSWORD_SUCCESS,
            payload: data
          });
        } else {
          dispatch({
            type: auth.RESET_PASSWORD_FAILURE,
            payload: data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: auth.RESET_PASSWORD_FAILURE,
          payload: err
        });
      });
  };
};


export function loginUser(values, history) {
  return dispatch => {
    dispatch(storeEmail(values.loginEmail));
    dispatch(getUser());
    Auth.signIn(values.loginEmail, values.loginPassword)
      .then(json => {
        if (json) {
          localStorage.setItem('userSub', json.username);
          fetch(`${API_ROOT + URL.USER}/${json.username}`, {
            method: 'GET',
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(resp => {
              const userDetail = resp.object;
              if (userDetail.userType !== eUserType.customer && userDetail.userType !== eUserType.guest) {
                dispatch(registerUserSuccess(userDetail));
                localStorage.setItem('user', JSON.stringify(userDetail));
                localStorage.removeItem('tmpServices');
                localStorage.removeItem('serviceCached');
                history.push('/dashboard');
              } else {
                Alert.error(<AlertMessage>You have attempted to access a page that you are not authorized to view</AlertMessage>);
                dispatch(registerUserFailure('Unauthorized'));
              }
            })
            .catch(err => {
              dispatch(registerUserFailure(err));
            });
        } else {
          dispatch(registerUserFailure('Topology Error'));
        }
      })
      .catch(err => dispatch(registerUserFailure(err)));
  };
}

export const changePassword = (values, history) => {
  return dispatch => {
    dispatch({ type: auth.CHANGE_PASSWORD_LOADING });
    fetch(API_ROOT + URL.CHANGE_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success) {
          dispatch({
            type: auth.CHANGE_PASSWORD_SUCCESS,
            payload: data
          });
          logout(history);
        } else {
          dispatch({
            type: auth.CHANGE_PASSWORD_FAILURE,
            payload: data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: auth.RESET_PASSWORD_FAILURE,
          payload: err
        });
      });
  };
};

export const editUserLoading = () => {
  return {
    type: auth.EDIT_USER_LOADING
  };
};

export const editUserSuccess = data => {
  return {
    type: auth.EDIT_USER_SUCCESS,
    payload: data.object
  };
};

export const editUserFailure = error => {
  return {
    type: auth.EDIT_USER_FAILURE,
    payload: error
  };
};

export function editProfile(values) {
  return dispatch => {
    dispatch(editUserLoading());
    fetch(API_ROOT + URL.AWS_USER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 || data.status === 201 || data.success) {
          localStorage.setItem('user', JSON.stringify(data));
          dispatch(editUserSuccess(data));
        } else {
          dispatch(editUserFailure(data));
        }
      })
      .catch(err => {
        dispatch(editUserFailure(err));
      });
  };
}
export function fetchUserLoading() {
  return {
    type: auth.FETCH_USER_LOADING
  };
}

export function fetchUserSuccess(data) {
  return {
    type: auth.FETCH_USER_SUCCESS,
    payload: data.object
  };
}

export function fetchUserFailure(error) {
  return {
    type: auth.FETCH_USER_FAILURE,
    payload: error
  };
}

export function fetchUser(id, history) {
  return dispatch => {
    dispatch(fetchUserLoading());
    fetch(`${API_ROOT + URL.USER}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const userDetail = data.object;
        if (data.success) {
          if (userDetail.userType !== eUserType.customer && userDetail.userType !== eUserType.guest) {
            dispatch(fetchUserSuccess(data));
          } else {
            Alert.error(<AlertMessage>You have attempted to access a page that you are not authorized to view</AlertMessage>);
            dispatch(fetchUserFailure('Unauthorized'));
            logout(history);
          }
        } else {
          dispatch(fetchUserFailure(data));
          logout(history);
        }

      })
      .catch(err => {
        dispatch(fetchUserFailure(err));
        logout(history);
      });
  }
}

export function verifyUser() {
  return {
    type: auth.VERIFY_USER
  };
}

export function verifyUserSuccess(user) {
  return {
    type: auth.VERIFY_USER_SUCCESS,
    payload: { user }
  };
}

export function verifyUserFailure(error) {
  return {
    type: auth.VERIFY_USER_FAILURE,
    payload: { error }
  };
}

export function verifyUserCode(user, email, code, history) {
  return dispatch => {
    dispatch(verifyUser());
    Auth.confirmSignUp(email, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(json => {
        if (json) {
          dispatch(verifyUserSuccess(json));
          history.push('/registerorganization');
        } else {
          dispatch(verifyUserFailure('Topology Error'));
        }
        // return json;
      })
      .catch(err => dispatch(verifyUserFailure(err)));
  };
}

export function verifyResendUser(values, callback) {
  axios.post(`${API_ROOT}/resendEmailConfirm`, values).then(
    response => {
      callback(response);
    },
    error => {
      callback(error.response);
      return error.response;
    }
  );
  return {
    type: auth.VERIFY_RESEND_USER
  };
}

export function facebookSignIn() {
  return () => {
    window.FB.login(
      response => {
        if (response.authResponse) {
          window.FB.api('/me', user => {
            console.log(`Good to see you, ${user.name}.`);
          });
        }
      },
      { scope: 'email,user_likes' }
    );
  };
}
