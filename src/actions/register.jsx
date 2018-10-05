import signUp from '../services/user.service';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export default function registerUser(email, password) {
    return (dispatch) => {
        dispatch(getUser())
        signUp(email, password)
            .then(res => res.json())
            .then(json => {
                console.log("json-------")
                if(json.success) {
                    dispatch(registerUserSuccess(json.success));                    
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