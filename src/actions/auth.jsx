import axios from 'axios';
import { Auth } from 'aws-amplify';
import { API_ROOT, URL } from '../config/config';
import { auth } from '../constants/Auth.constants';

const client_id = '3ov1blo2eji4acnqfcv88tcidn'

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      var userSub = localStorage.getItem('userSub');
      var token = localStorage.getItem('CognitoIdentityServiceProvider.'+ client_id +'.'+ userSub +'.idToken');
        console.log("token---------", token);
        if(token) {
          resolve(token)
        } else {
          console.log("please login first")
          reject();
        }
    });
    return promise;
  }
}

export function logout() {
  Auth.signOut({ global: true })
    .then(data => {
      console.log(data);
      localStorage.clear();
      window.location = "/login";
    })
    .catch(err => console.log(err));
}

export const storeEmail = (email)  =>{
  return {
    type: auth.STORE_EMAIL,
    payload: {email}
  }
}

export function register(values) {
  console.log("values-------", values);
  return (dispatch) => {
    dispatch(storeEmail(values.registerEmail))
    dispatch(getUser())
    Auth.signUp({
      username: values.registerEmail,
      password: values.registerPassword,
      attributes: {
        email: values.registerEmail,
        'custom:user_type': 'BUSINESS_ADMIN',
        given_name:values.registerGivenName,
      },
      validationData: []
    })
      .then(json => {
        console.log("json-------", json)
        if (json) {
          localStorage.setItem('username', json.username);
          dispatch(registerUserSuccess(json));

        } else {
          dispatch(registerUserFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(registerUserFailure(err)))
  };
}

export function registerUser(values) {
  console.log('registerUser');
  return (dispatch) => {
    dispatch(register(values));
    //if (values.registrationType === 'Organization') {
      //Call organization api
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
  }
}

export function loginUser(values, history) {
  console.log("loginUser: ", values);
  return (dispatch) => {
    dispatch(storeEmail(values.loginEmail))
    dispatch(getUser())
    Auth.signIn(values.loginEmail, values.loginPassword)
      .then(json => {
        console.log("json-------", json);
        if (json) {
          localStorage.setItem('userSub', json.username);
          localStorage.setItem('loginEmail', values.loginEmail);
          fetch(API_ROOT + URL.USERS + '/' + json.username, {
            method: 'GET',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => {
            dispatch(registerUserSuccess(json));
            localStorage.setItem('user', JSON.stringify(json));
            console.log("loginUser succeeded -> dashboard");
            history.push('/dashboard');
          })
          .catch(err => {
            dispatch(registerUserFailure(err))
          })
        } else {
          dispatch(registerUserFailure("Topology Error"))
        }
        //return json;
      })
      .catch(err => dispatch(registerUserFailure(err)))
  };
}

export function getUser() {
  return {
      type: auth.REGISTER_USER
  }
}

export function registerUserSuccess(user) {
  return {
      type: auth.REGISTER_USER_SUCCESS,
      payload: {user}
  };
}

export function registerUserFailure(error) {
  return {
      type: auth.REGISTER_USER_FAILURE,
      payload: {error}
  };
}

export function verifyUserCode(user, email, code, history) {
  return (dispatch) => {
    dispatch(verifyUser())
    Auth.confirmSignUp(email, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
  })
      .then(json => {
        console.log("json-------")
        if(json) {
            dispatch(verifyUserSuccess(json));
            history.push('/registerorganization');
        } else {
            dispatch(verifyUserFailure("Topology Error"))
        }
        //return json;
      })
      .catch(err => dispatch(verifyUserFailure(err)))
  };
}

export function verifyUser() {
  return {
      type: auth.VERIFY_USER
  }
}

export function verifyUserSuccess(user) {
  return {
      type: auth.VERIFY_USER_SUCCESS,
      payload: {user}
  };
}

export function verifyUserFailure(error) {
  return {
      type: auth.VERIFY_USER_FAILURE,
      payload: {error}
  };
}

export function verifyResendUser(values, callback) {
  console.log('verifyResendUser');
  axios.post(`${API_ROOT}/resendEmailConfirm`,values)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
        return error.response;
      }
    )
  return {
    type: auth.VERIFY_RESEND_USER
  }
}

export function facebookSignIn() {
  return (dispatch) => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function (response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,user_likes' });
  }
}

