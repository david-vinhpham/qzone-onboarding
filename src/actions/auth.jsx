import axios from 'axios';
import { Auth } from 'aws-amplify';
import { API_ROOT, URL } from '../config/config';
import { auth } from '../constants/Auth.constants';

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

export function logout() {
  Auth.signOut({ global: true })
    .then(data => {
      console.log(data);
      localStorage.clear();
      window.location = '/login';
    })
    .catch(err => console.log(err));
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
  console.log('>>register');
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
  console.log('registerUser');
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
    //   console.log("json-------", json)
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
        if (data.status === 200 || data.status === 201 || data.success === true) {
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
  console.log('>>loginUser');
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
            .then(user => {
              dispatch(registerUserSuccess(user.object));
              localStorage.setItem('user', JSON.stringify(user.object));
              localStorage.removeItem('serviceProvider');
              history.push('/dashboard');
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
        if (data.status === 200 || data.status === 201 || data.success === true) {
          dispatch({
            type: auth.CHANGE_PASSWORD_SUCCESS,
            payload: data
          });
          history.push('/login');
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
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'email,user_likes' }
    );
  };
}
