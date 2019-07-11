import { FETCH_GEO_OPTIONS } from 'constants/GeoOptions.constants';

const initialState = {
  geoOptions: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEO_OPTIONS.SUCCESS:
      return { ...state, geoOptions: action.geoOptions };
    default:
      return state;
  }
};

export default reducer;
