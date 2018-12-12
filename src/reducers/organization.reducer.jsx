import {
    organization
} from '../constants/Organization.constants';

const initialState = {
    businessCategory: [],
    businessCategoryError: null,
    businessCategoryLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case organization.FETCH_BUSINESS:
            return { ...state, businessCategoryLoading: true };
        case organization.FETCH_BUSINESS_SUCCESS:
            return { ...state, businessCategory: action.payload.data, businessCategoryLoading: false };
        case organization.FETCH_BUSINESS_FAILURE:
            return { ...state, businessCategoryError: action.payload.err, businessCategoryLoading: false}
        
        default:
            return state;
    }
};

export default reducer;