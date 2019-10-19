import axios from 'axios';
import { URL } from 'config/config';
import { handleRequest } from 'utils/apiHelpers';

const FETCH_ORG_OPTIONS_SUCCESS = 'FETCH_ORG_OPTIONS_SUCCESS';

const fetchOrganizationsOptionByBusinessAdminId = adminId => {
  return async dispatch => {
    const [result] = await handleRequest(axios.get, [`${URL.FETCH_ORGANIZATIONS_OPTION_BY_BUSINESS_ADMIN_ID}${adminId}`]);
    if (result) {
      dispatch({ type: FETCH_ORG_OPTIONS_SUCCESS, payload: result });
    }
  };
};

export {
  FETCH_ORG_OPTIONS_SUCCESS,
  fetchOrganizationsOptionByBusinessAdminId
}
