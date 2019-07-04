import { business_category } from '../constants/BusinessCategory.constants';

const initialState = {
  businessCategories: [],
  fetchBusinessCategoriesLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case business_category.FETCH_BUSINESS_CATEGORIES_SUCCESS:
      return {
        ...state,
        businessCategories: action.payload.sort(function(a, b){
          if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        }),
        fetchBusinessCategoriesLoading: false
      };
    case business_category.FETCH_BUSINESS_CATEGORIES_LOADING:
      return { ...state, fetchBusinessCategoriesLoading: action.payload };

    default:
      return state;
  }
};

export default reducer;
