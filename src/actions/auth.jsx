import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { Auth } from 'aws-amplify';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const VERIFY_USER = 'VERIFY_USER';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILURE = 'VERIFY_USER_FAILURE';

export const LOGIN_USER = 'login_user';
export const CHECK_AUTH = 'check_auth';
export const RESET_PASSWORD = 'reset_password';
export const CHANGE_PASSWORD = 'change_password';
export const VERIFY_RESEND_USER = 'verify_resend_user';
export const FETCH_USERTYPE_LIST = 'fetch_usertype_list';
export const FETCH_USER_BY_USERID = 'fetch_user_by_userid';

const ROOT_URL = `http://45.117.170.211:8091/api/user`

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

export function registerUser(values) {
  console.log("values-------", values);
  return (dispatch) => {
    dispatch(getUser())
    Auth.signUp({
      username: values.registerEmail,
      password: values.registerPassword,
      attributes: {
          email: values.registerEmail  
      },
      validationData: [] 
    })
      //.then(res => res.json())
      .then(json => {
        console.log("json-------")
        if(json) {
            dispatch(registerUserSuccess(json));                    
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
            history.push('/login');
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

export function loginUser(values, history) {
  console.log("values-------", values);
  return (dispatch) => {
    dispatch(getUser())
    Auth.signIn(values.loginEmail, values.loginPassword)
      //.then(res => res.json())
      .then(json => {
        console.log("json-------")
        if(json) {
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

export function checkAuth(values,callback) {
  sessionService.loadSession()
    .then(
      currentSession => {
        callback(currentSession)
      })
    .catch( error => {
        callback(false)
      }
    ) 
  return{
    type: CHECK_AUTH
  }
}

export function resetPassword(value,callback){
  axios.post(`${ROOT_URL}/resetPassword`, value)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
      }
    )
  return{
    type: RESET_PASSWORD
  }
}

export function changePassword(value,callback){
  axios.post(`${ROOT_URL}/changePassword`, value)
    .then(
      response => {
        callback(response);
      },
      error => {
        callback(error.response)
      }
    )
  return{
    type: CHANGE_PASSWORD
  }
}

export function fetchUserTypeList(value,callback){
  const token = value.token
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.post(`${ROOT_URL}/getListUsersByUserType`, value, axiosConfig)
  return{
    type: FETCH_USERTYPE_LIST,
    payload: request
  }
}

export function fetchUserByUserId(id,token,callback){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  };
  const request = axios.get(`${ROOT_URL}/getUserByUserId/${id}`, axiosConfig)
  return{
    type: FETCH_USER_BY_USERID,
    payload: request
  }
}
