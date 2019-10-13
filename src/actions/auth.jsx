import axios from "axios";
import { Auth } from "aws-amplify";
import { URL } from "../config/config";
import { auth } from "../constants/Auth.constants";
import { eUserType, userStatus } from "constants.js";
import { resetAllStates } from './common';
import store from 'index.js';
import { showAlert } from './alert';

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
      store.dispatch(resetAllStates());
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
        preferred_username: 'BUSINESS_ADMIN',
        given_name: values.registerGivenName
      },
      validationData: []
    })
      .then(json => {
        if (json) {
          const userDetail = { ...json.user, email: json.user.username };
          localStorage.setItem('username', userDetail.username);
          localStorage.setItem('user', JSON.stringify(userDetail));
          dispatch(registerUserSuccess(userDetail));
        } else {
          dispatch(registerUserFailure('Topology Error'));
        }
      })
      .catch(err => {
        dispatch(registerUserFailure(err))
      });
  };
}

export function registerUser(values) {
  return dispatch => {
    dispatch(register(values));
  };
}

export const resetPassword = values => {
  return dispatch => {
    dispatch(storeEmail(values.email));
    dispatch({ type: auth.RESET_PASSWORD_LOADING });
    axios.post(URL.RESET_PASSWORD, values)
      .then(({ data }) => {
        if ((data.status === 200 || data.status === 201) && data.success) {
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
          if (json.signInUserSession) {
            const { idToken: { jwtToken, payload } } = json.signInUserSession;
            if (payload.email_verified) {
              axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            } else {
              dispatch(showAlert('error', 'Your email is not verified!'));
              dispatch(registerUserFailure('Email is not verified'));
            }
          }

          localStorage.setItem('userSub', json.username);
          axios.get(`${URL.USER}/${json.username}`)
            .then(resp => {
              if (resp.data.success) {
                const userDetail = resp.data.object;
                if (userDetail.userType !== eUserType.customer && userDetail.userType !== eUserType.guest) {
                  dispatch(registerUserSuccess(userDetail));
                  localStorage.setItem('user', JSON.stringify(userDetail));
                  localStorage.setItem('loginEmail', userDetail.email);
                  localStorage.setItem('userStatus', userDetail.userStatus);
                  if (userDetail.userStatus === userStatus.changePassword) {
                    history.push('/profile');
                  } else {
                    history.push('/dashboard');
                  }
                } else {
                  dispatch(showAlert('error', 'You have attempted to access a page that you are not authorized to view'));
                  dispatch(registerUserFailure('Unauthorized'));
                }
              } else {
                dispatch(showAlert('error', 'User is not existed!'));
                dispatch(registerUserFailure('fetch user failed'));
              }
            })
            .catch(err => {
              dispatch(registerUserFailure(err));
            });
        } else {
          dispatch(showAlert('error', 'Your email or password is incorrect!'));
          dispatch(registerUserFailure('Topology Error'));
        }
      })
      .catch(err => {
        dispatch(showAlert('error', err.message || 'Your email or password is incorrect!'));
        dispatch(registerUserFailure(err))
      });
  };
}

export const changePassword = (values, history) => {
  return dispatch => {
    dispatch({ type: auth.CHANGE_PASSWORD_LOADING });
    axios.post(URL.CHANGE_PASSWORD, values)
      .then(({ data }) => {
        if ((data.status === 200 || data.status === 201) && data.success) {
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
    axios.put(URL.AWS_USER, values)
      .then(({ data }) => {
        if (data.success) {
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
    axios.get(`${URL.USER}/${id}`)
      .then(resp => {
        if (resp.data.success) {
          const userDetail = resp.data.object;
          if (userDetail.userType !== eUserType.customer && userDetail.userType !== eUserType.guest) {
            dispatch(fetchUserSuccess(resp.data));
            localStorage.setItem('user', JSON.stringify(userDetail));
            localStorage.setItem('userSub', userDetail.userSub);
          } else {
            dispatch(showAlert('error', 'You have attempted to access a page that you are not authorized to view'));
            dispatch(fetchUserFailure('Unauthorized'));
            logout(history);
          }
        } else {
          dispatch(fetchUserFailure(resp.data));
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
          history.push('/login');
          dispatch(showAlert('success', 'Your email is verified successfully!'));
        } else {
          dispatch(verifyUserFailure('Topology Error'));
        }
      })
      .catch(err => dispatch(verifyUserFailure(err)));
  };
}

export function verifyResendUser(values, callback) {
  axios.post('resendEmailConfirm', values).then(
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

export function completeNewPasswordChallenge(values, history) {
  return dispatch => {
    dispatch({ type: auth.FORCE_RESET_PASSWORD_LOADING });
    axios.post(URL.FORCE_CHANGE_PASSWORD, values)
      .then(({ data }) => {
        if (data.success) {
          localStorage.setItem('userStatus', userStatus.confirmed);
          dispatch({
            type: auth.FORCE_RESET_PASSWORD_SUCCESS,
            payload: data
          });
          dispatch(showAlert('success', 'Password is successfully updated'));
          logout(history);
        } else {
          dispatch({
            type: auth.FORCE_RESET_PASSWORD_FAILURE,
            payload: data
          });
          dispatch(showAlert('error', data.message));
        }
      })
      .catch(err => {
        dispatch(showAlert('error', 'Cannot change password'));
      });
  }
};

export const refreshToken = (history) => dispatch => {
  if (!axios.defaults.headers.common['Authorization']) {
    return Auth.currentSession()
      .then(data => {
        const { idToken: { jwtToken, payload } } = data;
        if (payload.email_verified) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        } else {
          dispatch(showAlert('error', 'Your email is not verified!'));
          history.push('/login');
        }
      })
      .catch(err => {
        dispatch(showAlert('error', 'Your session is expired'));
        history.push('/login');
      });
  }
}
