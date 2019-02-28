import {
    organization
} from '../constants/Organization.constants';

const initialState = {
    businessCategories: [],
    fetchBusinessCategoriesError: null,
    fetchBusinessCategoriesLoading: false,

    organizations: [],
    fetchOrganizationsLoading: null,
    fetchOrganizationsError: false,

    organization: [],
    createOrganizationError: null,
    createOrganizationLoading: false,

    editOrganizationError: null,
    editOrganizationLoading: false,

    fetchOrganizationLoading: false,
    fetchOrganizationError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case organization.FETCH_BUSINESS_CATEGORIES_LOADING:
            return { ...state, fetchBusinessCategoriesLoading: true };
      case organization.FETCH_BUSINESSES_CATEGORIES_SUCCESS:
            return { ...state, businessCategories: action.payload.data, fetchBusinessCategoriesLoading: false };
      case organization.FETCH_BUSINESSES_CATEGORIES_FAILURE:
            return { ...state, fetchBusinessCategoriesError: action.payload.err, fetchBusinessCategoriesLoading: false}

        case organization.CREATE_ORGANIZATION_LOADING:
            return { ...state,  createOrganizationLoading: true};
        case organization.CREATE_ORGANIZATION_SUCCESS:
            return { ...state, organization: action.payload, createOrganizationLoading: false };
        case organization.CREATE_ORGANIZATION_FAILURE:
            return { ...state, createOrganizationError: action.payload.error, createOrganizationLoading: false};


      case organization.EDIT_ORGANIZATION_LOADING:
        return { ...state,  editOrganizationLoading: true};
      case organization.EDIT_ORGANIZATION_SUCCESS:
        return { ...state, organization: action.payload, editOrganizationLoading: false };
      case organization.EDIT_ORGANIZATION_FAILURE:
        return { ...state, editOrganizationError: action.payload.error, editOrganizationLoading: false};

        case organization.FETCH_ORGANIZATIONS_LOADING:
            return { ...state, fetchOrganizationsLoading:true};
      case organization.FETCH_ORGANIZATIONS_SUCCESS:
            return { ...state, organizations: action.payload.organizations, fetchOrganizationsLoading: false};
      case organization.FETCH_ORGANIZATIONS_FAILURE:
            return { ...state, fetchOrganizationsError: action.payload.error, fetchOrganizationsLoading: false};

        case organization.FETCH_ORGANIZATION_LOADING:
            return { ...state, fetchOrganizationLoading: true};
        case organization.FETCH_ORGANIZATION_SUCCESS:
            return {...state, organization: action.payload, fetchOrganizationLoading: false};
        case organization.FETCH_ORGANIZATION_FAILURE:
            return { ...state, fetchOrganizationError: action.payload, fetchOrganizationLoading: false};

        default:
            return state;
    }
};

export default reducer;
