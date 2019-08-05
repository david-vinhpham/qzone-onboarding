import axios from 'axios';
import { API_ROOT, URL } from 'config/config';
import { customer_service } from '../constants/CustomerService.constants';
import { boardMode, eventStatus } from '../constants';
import { fetchServiceOptionsByBusinessAdminId } from '../actions/serviceOptions';

const setVerifyBookingCodeLoading = payload => ({
  type: customer_service.VERIFY_BOOKING_CODE_LOADING,
  payload
});

export const setVerifyBookingCodeSuccess = payload => ({
  type: customer_service.VERIFY_BOOKING_CODE_SUCCESS,
  payload
});

export const verifyBookingCode = (bookingCode) => dispatch => {
  dispatch(setVerifyBookingCodeLoading(true));
  return axios.get(`${API_ROOT}${URL.VERIFY_BOOKING_CODE}/${bookingCode}`)
    .then(res => {
      if (res && res.status === 200 && res.data.success) {
        dispatch(setVerifyBookingCodeSuccess(res.data.object));
      }
    })
    .finally(() => {
      dispatch(setVerifyBookingCodeLoading(false));
    });
};

export const setUpdateStatusSuccess = payload => ({
  type: customer_service.UPDATE_STATUS_SUCCESS,
  payload
});

export const updateCustomerStatus = (data, cb) => (dispatch) => {
  dispatch(setVerifyBookingCodeLoading(true));

  const isFromBookingData = data.isFromBookingData;
  const providerId = data.providerId;
  const serviceId = data.serviceId;
  delete data.isFromBookingData;
  delete data.providerId;
  delete data.serviceId;

  return axios.put(API_ROOT + URL.UPDATE_CUSTOMER_FLOW_STATUS, data)
    .then(res => {
      if (res && res.data.success) {
        dispatch(setUpdateStatusSuccess({ ...res.data, isFromBookingData }));
        cb(providerId, serviceId);
      }
    })
    .finally(() => {
      dispatch(setVerifyBookingCodeLoading(false));
    });
};

const setFetchFlowBoardLoading = payload => ({
  type: customer_service.FETCH_FLOW_BOARD_LOADING,
  payload
});

export const setFetchFlowBoardSuccess = payload => ({
  type: customer_service.FETCH_FLOW_BOARD_SUCCESS,
  payload
});

export const fetchFlowBoard = (data) => dispatch => {
  dispatch(setFetchFlowBoardLoading(true));
  dispatch(setFetchFlowBoardSuccess({}));

  return axios.post(`${API_ROOT}${URL.FETCH_CUSTOMER_FLOW_BOARD}`, data)
    .then(res => {
      if (res && res.status === 200 && res.data.success) {
        if (res.data.object && res.data.object.customerFlowDetailList && res.data.object.customerFlowDetailList.length > 0) {
          res.data.object.customerFlowDetailList = res.data.object.customerFlowDetailList.filter((customerFlowDetail) => {
            return customerFlowDetail.status.toUpperCase() === eventStatus.checkedIn
              || customerFlowDetail.status.toUpperCase() === eventStatus.started
              || customerFlowDetail.status.toUpperCase() === eventStatus.completed;
          });
          if (res.data.object.mode && res.data.object.mode.toUpperCase() === boardMode.queue) {
            res.data.object.customerFlowDetailList.sort((positionA, positionB) => {
              return positionA.position <= positionB.position ? -1 : 1;
            });
          } else {
            res.data.object.customerFlowDetailList.sort((slotA, slotB) => {
              return slotA.sslot <= slotB.sslot ? -1 : 1;
            });
          }
        }
        dispatch(setFetchFlowBoardSuccess(res.data.object));
      }
    })
    .finally(() => {
      dispatch(setFetchFlowBoardLoading(false));
    });
};

export const setProviderOptionsByBusinessAdminIdSuccess = payload => ({
  type: customer_service.FETCH_PROVIDERS_OPTIONS_BY_BUSINESS_ADMIN_ID_SUCCESS,
  payload
});

export const fetchProviderOptionsByBusinessAdminId = (businessAdminId) => dispatch => {
  return axios.get(`${API_ROOT}${URL.FETCH_PROVIDERS_OPTION_BY_BUSINESS_ADMIN_ID}${businessAdminId}`)
    .then(res => {
      if (res && res.status === 200 && res.data.success) {
        dispatch(setProviderOptionsByBusinessAdminIdSuccess(res.data.objects));
      }
    });
};

export const fetchProvidersAndServicesByBusinessAdminId = (businessAdminId) => dispatch => {
  return Promise.all([fetchServiceOptionsByBusinessAdminId(businessAdminId)(dispatch),
  fetchProviderOptionsByBusinessAdminId(businessAdminId)(dispatch)]);
};


export const updateGuestInfo = (payload, bookingCode) => dispatch => {
  dispatch(setVerifyBookingCodeLoading(true));
  return axios.put(`${API_ROOT}${URL.UPDATE_GUEST_INFO}`, payload)
    .then(res => {
      if(res && res.data.success) {
        verifyBookingCode(bookingCode)(dispatch);
      }
    });
}
