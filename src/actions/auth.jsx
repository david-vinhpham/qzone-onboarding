import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { Auth } from 'aws-amplify';

export const AUTH_REMOVE_TOKEN = 'AUTH_REMOVE_TOKEN';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const VERIFY_USER = 'VERIFY_USER';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILURE = 'VERIFY_USER_FAILURE';

export const STORE_EMAIL = 'STORE_EMAIL';

export const LOGIN_USER = 'login_user';
export const CHECK_AUTH = 'check_auth';
export const RESET_PASSWORD = 'reset_password';
export const CHANGE_PASSWORD = 'change_password';
export const VERIFY_RESEND_USER = 'verify_resend_user';
export const FETCH_USERTYPE_LIST = 'fetch_usertype_list';
export const FETCH_USER_BY_USERID = 'fetch_user_by_userid';

const ROOT_URL = `http://13.238.116.171:8080/api`
const client_id = '3ov1blo2eji4acnqfcv88tcidn'

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      var username = localStorage.getItem('username');
      var token = localStorage.getItem('CognitoIdentityServiceProvider.'+ client_id +'.'+ username +'.idToken');
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
      window.location = "/login";
    })
    .catch(err => console.log(err));
}

export function facebookSignIn() {
  return (dispatch) => {
    window.FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       window.FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'email,user_likes'});
  }
}

export function googleSignIn() {
  return (dispatch) => {
    window.gapi.load('auth2', function () { // Ready. 
      window.gapi.auth2.init({ "client_id": "1075505092107-j8821j05r48pco773m0mqb16g1po5gtj.apps.googleusercontent.com" })
        .then((onInit, onError) => {
          const ga = window.gapi.auth2.getAuthInstance();
          ga.signIn().then(googleUser => {
            const { id_token, expires_at } = googleUser.getAuthResponse();
            const profile = googleUser.getBasicProfile();
            const user = {
              email: profile.getEmail(),
              name: profile.getName()
            };

            return Auth.federatedSignIn(
              // Initiate federated sign-in with Google identity provider 
              'google',
              {
                // the JWT token
                token: id_token,
                // the expiration time
                expires_at
              },
              // a user object
              { email: user.email }
            ).then(credentials => {
              console.log('get aws credentials', credentials);
            }).catch(e => {
              console.log(e);
            });
          });
        })
    });
  }
}

export const storeEmail = (email)  =>{
  return {
    type: STORE_EMAIL,
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
        email: values.registerEmail
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
  return (dispatch) => {
    if (values.registrationType === 'Organization') {
      //Call organization api
      fetch(ROOT_URL+ '/validate?name=' + values.registerOrganizationName, {
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
          dispatch(register(values));
        } else {
          alert("Already registered organization please login");
        }
      })
      .catch(err => console.log("error", err))
    }
    else // for customer
      dispatch(register(values));
  }
}

export function loginUser(values, history) {
  console.log("values-------", values);
  return (dispatch) => {
    dispatch(storeEmail(values.loginEmail))
    dispatch(getUser())
    Auth.signIn(values.loginEmail, values.loginPassword)
      .then(json => {
        console.log("json-------", json);
        if (json) {
          localStorage.setItem('username', json.username);
          dispatch(registerUserSuccess(json));
          history.push('/dashboard')
        } else {
          dispatch(registerUserFailure("Topology Error"))
        }
        return json;
      })
      .catch(err => dispatch(registerUserFailure(err)))
  };
}

export function getUser() {
  return {
      type: REGISTER_USER
  }
}

export function registerUserSuccess(user) {
  return {
      type: REGISTER_USER_SUCCESS,
      payload: {user} 
  };
}

export function registerUserFailure(error) {
  return {
      type: REGISTER_USER_FAILURE,
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
      type: VERIFY_USER
  }
}

export function verifyUserSuccess(user) {
  return {
      type: VERIFY_USER_SUCCESS,
      payload: {user} 
  };
}

export function verifyUserFailure(error) {
  return {
      type: VERIFY_USER_FAILURE,
      payload: {error} 
  };
}

export function verifyResendUser(values, callback) {
  axios.post(`${ROOT_URL}/resendEmailConfirm`,values)
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
    type: VERIFY_RESEND_USER
  }
}

