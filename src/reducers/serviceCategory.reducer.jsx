import { service_category } from '../constants/ServiceCategory.constants';

const initialState = {
  isLoading: false,
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case service_category.FETCH_SERVICE_CATEGORIES_SUCCESS:
      return {
        ...state,
        list: action.payload.sort(function(a, b){
          if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        })
      };
    case service_category.FETCH_SERVICE_CATEGORIES_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
