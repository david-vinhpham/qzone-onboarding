import { pictureUpload } from '../constants/PictureUpload.constants';

const initialState = {
  pictureLoading: false,
  picture: null,
  pictureError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case pictureUpload.PICTURE_UPLOAD_LOADING:
      return { ...state, pictureLoading: true };
    case pictureUpload.PICTURE_UPLOAD_SUCCESS:
      return { ...state, picture: action.payload, pictureLoading: false };
    case pictureUpload.PICTURE_UPLOAD_FAILURE:
      return { ...state, picture: null, pictureError: action.payload.error, pictureLoading: false };

    default:
      return state;
  }
};

export default reducer;
