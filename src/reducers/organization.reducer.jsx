import {
    FETCH_BUSINESS,
    FETCH_BUSINESS_FAILURE,
    FETCH_BUSINESS_SUCCESS
} from '../actions/organization';

const initialState = {
    businessCategory: [],
    businessCategoryError: null,
    businessCategoryLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUSINESS:
            return { ...state, businessCategoryLoading: true };
        case FETCH_BUSINESS_SUCCESS:
            return { ...state, businessCategory: action.payload.data, businessCategoryLoading: false };
        case FETCH_BUSINESS_FAILURE:
            return { ...state, businessCategoryError: action.payload.err, businessCategoryLoading: false}
        /* case FETCH_USER:// start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case POST_USER_SUCCESS:// return list of posts and make loading = false
            return { ...state, user: action.payload.user, error: null, loading: false };
        case POST_USER_FAILURE:// return error and make loading = false
            //error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, user: [], error: action.payload.error, loading: false }; */
        default:
            return state;
    }
};

export default reducer;