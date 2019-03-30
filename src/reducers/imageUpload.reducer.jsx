import { imageUpload } from '../constants/ImageUpload.constants';

const initialState = {
  imageLoading: false,
  image: null,
  imageError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case imageUpload.IMAGE_UPLOAD_LOADING:
      return { ...state, imageLoading: true };
    case imageUpload.IMAGE_UPLOAD_SUCCESS:
      return { ...state, image: action.payload, imageLoading: false };
    case imageUpload.IMAGE_UPLOAD_FAILURE:
      return { ...state, image: null, imageError: action.payload.error, imageLoading: false };

    default:
      return state;
  }
};

export default reducer;
