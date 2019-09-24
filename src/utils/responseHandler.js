import axios from 'axios';
import store from '../index';
import { showAlert } from 'actions/alert';

axios.interceptors.response.use(
  resp => {
    if (resp.data.message) {
      if (!resp.data.success) {
        store.dispatch(showAlert('error', resp.data.message));
      }
    }
    return resp;
  },
  error => {
    if (error.response && error.response.data.message) {
      store.dispatch(showAlert('error', error.response.data.message));
    }
  }
);
