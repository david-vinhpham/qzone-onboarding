import { auth } from '../constants/Auth.constants';

const initialState = {
  token: null,
  userDetail: {},
  userError: null,
  userLoading: false,
  verify: false,
  verifyDetails: [],
  verifyError: null,
  verifyLoading: false,
  email: null,

  fetchUserLoading: false,
  force_change_password: false,

  editUser: [],
  editUserError: null,
  editUserLoading: false,

  forceResetPasswordRsp: [], // verification code
  forceResetPasswordError: [], // verification code
  forceResetPasswordLoading: false,

  resetPasswordRsp: [], // verification code
  resetPasswordError: [], // verification code
  resetPasswordLoading: false,
  changePasswordRsp: [] // verification code
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.STORE_EMAIL:
      return { ...state, email: action.payload.email };

    case auth.AUTH_SET_TOKEN:
      return { ...state, token: action.token };
    case auth.AUTH_REMOVE_TOKEN:
      return { ...state, token: null };

    case auth.RESET_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordError: [],
        changePasswordRsp: [],
        resetPasswordRsp: [],
        resetPasswordLoading: true
      };
    case auth.RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordRsp: action.payload, resetPasswordLoading: false };
    case auth.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordRsp: [],
        changePasswordRsp: [],
        resetPasswordError: action.payload,
        resetPasswordLoading: false
      };

    case auth.FORCE_RESET_PASSWORD_LOADING:
      return {
        ...state,
      };
    case auth.FORCE_RESET_PASSWORD_SUCCESS:
      return { ...state, forceResetPasswordRsp: action.payload, force_change_password: true };
    case auth.FORCE_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        forceResetPasswordError: action.payload,  force_change_password: false
      };

    case auth.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        resetPasswordError: [],
        changePasswordRsp: [],
        resetPasswordLoading: true
      };
    case auth.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordRsp: action.payload,
        resetPasswordLoading: false,
        verify: false
      };
    case auth.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordRsp: [],
        resetPasswordError: action.payload,
        resetPasswordLoading: false
      };

    case auth.REGISTER_USER: // start fetching posts and set loading = true
      return { ...state, userError: [], userLoading: true };
    case auth.REGISTER_USER_SUCCESS: // return list of posts and make loading = false
      return {
        ...state,
        userDetail: action.payload.user,
        userError: [],
        userLoading: false,
        verify: true
      };
    case auth.REGISTER_USER_FAILURE: // return error and make loading = false
      return { ...state, userDetail: {}, userError: action.payload, userLoading: false };

    case auth.VERIFY_USER: // start fetching posts and set loading = true
      return { ...state, verifyError: [], verifyLoading: true };
    case auth.VERIFY_USER_SUCCESS: // return list of posts and make loading = false
      return {
        ...state,
        verifyDetails: action.payload.user,
        verifyError: null,
        verifyLoading: false,
        verify: false,
      };
    case auth.VERIFY_USER_FAILURE: // return error and make loading = false
      // error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {
        ...state,
        verifyDetails: [],
        verifyError: action.payload.error,
        verifyLoading: false
      };
    case auth.EDIT_USER_LOADING:
      return { ...state, editUserLoading: true, editUser: [] };
    case auth.EDIT_USER_SUCCESS:
      return { ...state, userDetail: action.payload, editUser: action.payload, editUserLoading: false };
    case auth.EDIT_USER_FAILURE:
      return {
        ...state,
        editUser: [],
        editUserError: action.payload.error,
        editUserLoading: false
      };
    case auth.FETCH_USER_LOADING:
      return { ...state, fetchUserLoading: true };
    case auth.FETCH_USER_SUCCESS:
      return { ...state, userDetail: action.payload, user: action.payload, fetchUserLoading: false };
    case auth.FETCH_USER_FAILURE:
      return {
        ...state,
        userError: action.payload.error,
        fetchProviderLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
