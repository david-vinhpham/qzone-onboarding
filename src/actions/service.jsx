import { API_ROOT, URL} from '../config/config';
import { service } from '../constants/Service.constants';

export const getServicesByOrganization = () => {
    let orgId = localStorage.getItem('organizationId');
    return (dispatch) => {
        dispatch(getServicesByOrganizationLoading())
        //fetch(API_ROOT + URL.GET_SERVICES + orgId, {
        fetch('http://13.238.116.171:8080/api/services-by-org-id/%7BorgId%7D?orgId=5c109dc921d2880f2c9b0b8b', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getServicesByOrganizationSuccess(data.objects))
        })
        .catch(err => {
            dispatch(getServicesByOrganizationFailure(err))
        })
    }
}

export const getServicesByOrganizationLoading = () => {
    return {
        type: service.FETCH_SERVICES
    }
}

export const getServicesByOrganizationSuccess = (data) => {
    return {
        type: service.FETCH_SERVICES_SUCCESS,
        payload: { data }
    }
}

export const getServicesByOrganizationFailure = (error) => {
    return {
        type: service.FETCH_SERVICES_FAILURE,
        payload: { error }
    }
}