const SHOW_ALERT = 'SHOW_ALERT';
const CLOSE_ALERT = 'CLOSE_ALERT';

const showAlert = (variant, message) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: { message, variant }
  });
}

const closeAlert = () => (dispatch) => {
  dispatch({
    type: CLOSE_ALERT
  });
}

export {
  SHOW_ALERT,
  CLOSE_ALERT,
  showAlert,
  closeAlert
};
