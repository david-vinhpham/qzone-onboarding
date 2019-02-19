import {
    organization
} from '../constants/Organization.constants';

const initialState = {
    businessCategory: [],
    businessCategoryError: null,
    businessCategoryLoading: false,

    createOrganization: [],
    createOrganizationError: null,
    createOrganizationLoading: false,

    getOrganizations: [],
    organizationByAdminError: null,
    organizationByAdminLoading: false,

    getOrganization: [],
    organizationLoading: false,
    organizationError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case organization.FETCH_BUSINESS:
            return { ...state, businessCategoryLoading: true };
        case organization.FETCH_BUSINESS_SUCCESS:
            return { ...state, businessCategory: action.payload.data, businessCategoryLoading: false };
        case organization.FETCH_BUSINESS_FAILURE:
            return { ...state, businessCategoryError: action.payload.err, businessCategoryLoading: false}

        case organization.CREATE_ORGANIZATION_LOADING:
            return { ...state,  createOrganizationLoading: true};
        case organization.CREATE_ORGANIZATION_SUCCESS:
            return { ...state, createOrganization: action.payload, createOrganizationLoading: false };
        case organization.CREATE_ORGANIZATION_FAILURE:
            return { ...state, createOrganizationError: action.payload.error, createOrganizationLoading: false};

        case organization.ORGANIZATION_BY_ADMIN_LOADING:
            return { ...state, organizationByAdminLoading:true};
        case organization.ORGANIZATION_BY_ADMIN_SUCCESS:
            return { ...state, getOrganizations: action.payload.organizations, organizationByAdminLoading: false};
        case organization.ORGANIZATION_BY_ADMIN_FAILURE:
            return { ...state, organizationByAdminError: action.payload.error, organizationByAdminLoading: false};

        case organization.FETCH_ORGANIZATION_LOADING:
            return { ...state, organizationLoading: true};
        case organization.FETCH_ORGANIZATION_SUCCESS:
            return {...state, getOrganization: action.payload, organizationLoading: false};
        case organization.FETCH_ORGANIZATION_FAILURE:
            return { ...state, organizationError: action.payload, organizationLoading: false};

        default:
            return state;
    }
};

export default reducer;
