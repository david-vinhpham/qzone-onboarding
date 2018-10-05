export const LOGIN_USER = 'LOGIN_USER_DETAILS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export default function loginUser() {
    return (dispatch) => {
        dispatch(getUser())
        .then(token => {
            return (
                fetch(`http://45.117.170.211:8091/api/user/login`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
        )
        })
        .catch(() => {
            alert("No token found");
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                dispatch(loginUserSuccess(json.success));                    
            } else {
                dispatch(loginUserFailure("Topology Error"))
            }
            return json;
        })  
        .catch(err => dispatch(loginUserFailure(err)))
    };
  }
       
  export function getUser() {
    return {
        type: LOGIN_USER
    }
  }
  
  export function loginUserSuccess(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {user} 
    };
  }
  
  export function loginUserFailure(error) {
    return {
        type: LOGIN_USER_FAILURE,
        payload: {error} 
    };
  }