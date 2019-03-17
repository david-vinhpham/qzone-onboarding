import {
    auth
  } from '../constants/Auth.constants';

  const initialState = {
    token: null,
    userDetails: [],
    userError: null,
    userLoading: false,
    verify: false,
    verifyDetails:[],
    verifyError: null,
    verifyLoading: false,
    email: null,

    resetPassword: [], //verification code
    resetPasswordError: [], //verification code
    resetPasswordLoading: false,

    changePassword: [], //verification code
    changePasswordError: [], //verification code
    changePasswordLoading: false,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case auth.STORE_EMAIL:
        return { ...state, email: action.payload.email}

      case auth.AUTH_SET_TOKEN:
        return { ...state, token: action.token };
      case auth.AUTH_REMOVE_TOKEN:
        return { ...state, token: null };

      case auth.RESET_PASSWORD_LOADING:
        return { ...state,  resetPassword: null, resetPasswordLoading: true };
      case auth.RESET_PASSWORD_SUCCESS:
        return { ...state, resetPassword: action.payload, resetPasswordLoading: false };
      case auth.RESET_PASSWORD_FAILURE:
        return { ...state, resetPassword: [], resetPasswordError: action.payload, resetPasswordLoading: false};

      case auth.CHANGE_PASSWORD_LOADING:
        return { ...state,  changePassword: null, changePasswordLoading: true };
      case auth.CHANGE_PASSWORD_SUCCESS:
        return { ...state, changePassword: action.payload, changePasswordLoading: false, verify: false };
      case auth.CHANGE_PASSWORD_FAILURE:
        return { ...state, changePassword: [], changePasswordError: action.payload, changePasswordLoading: false};

      case auth.REGISTER_USER:// start fetching posts and set loading = true
        return { ...state,  userError: null, userLoading: true };
      case auth.REGISTER_USER_SUCCESS:// return list of posts and make loading = false
        return { ...state, userDetails: action.payload.user, userError:null, userLoading: false, verify: true };
      case auth.REGISTER_USER_FAILURE:// return error and make loading = false
        return { ...state, userDetails: [], userError: action.payload.error, userLoading: false};

      case auth.VERIFY_USER:// start fetching posts and set loading = true
        return { ...state,  verifyError: null, verifyLoading: true };
      case auth.VERIFY_USER_SUCCESS:// return list of posts and make loading = false
        return { ...state, verifyDetails: action.payload.user, verifyError:null, verifyLoading: false};
      case auth.VERIFY_USER_FAILURE:// return error and make loading = false
        //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
        return { ...state, verifyDetails: [], verifyError: action.payload.error, verifyLoading: false};

      default:
        return state;
    }
  };

  export default reducer;
