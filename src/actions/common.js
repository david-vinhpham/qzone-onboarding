export const SET_LOADING = 'COMMON.SET_LOADING';
export const SET_ERROR = 'COMMON.SET_ERROR';
export const RESET_ERROR = 'COMMON.RESET_ERROR';
export const RESET_ALL_STATES = 'RESET_ALL_STATES';

export const setLoading = payload => ({
  type: SET_LOADING,
  payload,
});

export const setError = payload => ({
  type: SET_ERROR,
  payload,
});

export const resetError = payload => ({
  type: RESET_ERROR,
});

export const resetAllStates = () => ({
  type: RESET_ALL_STATES,
});
