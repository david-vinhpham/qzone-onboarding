import axios from 'axios';
import { URL } from 'config/config';
import { handleRequest } from 'utils/apiHelpers';

const FETCH_CUSTOMER_REPORTS_LOADING = 'FETCH_CUSTOMER_REPORTS_LOADING';
const FETCH_CUSTOMER_REPORTS_DONE = 'FETCH_CUSTOMER_REPORTS_DONE';
const SET_CUSTOMER_REPORTS = 'SET_CUSTOMER_REPORTS';

const getCustomerReports = (payload) => async (dispatch) => {
  dispatch({
    type: FETCH_CUSTOMER_REPORTS_LOADING
  });

  const [result] = await handleRequest(axios.post, [URL.FETCH_CUSTOMER_REPORT, payload]);

  if (result) {
    console.log(result);
    dispatch({
      type: SET_CUSTOMER_REPORTS,
      payload: result
    });
  }

  dispatch({
    type: FETCH_CUSTOMER_REPORTS_DONE
  });
}

export { getCustomerReports, FETCH_CUSTOMER_REPORTS_LOADING, FETCH_CUSTOMER_REPORTS_DONE, SET_CUSTOMER_REPORTS };
