import { pictureUpload } from '../constants/PictureUpload.constants';
import { API_MEDIA_URL } from '../config/config';

export const uploadPictureLoading = () => {
  return {
    type: pictureUpload.PICTURE_UPLOAD_LOADING
  };
};

export const uploadPictureSuccess = data => {
  return {
    type: pictureUpload.PICTURE_UPLOAD_SUCCESS,
    payload: data
  };
};

export const uploadPictureFailure = error => {
  return {
    type: pictureUpload.PICTURE_UPLOAD_FAILURE,
    payload: { error }
  };
};

export const uploadPicture = formData => {
  return dispatch => {
    dispatch(uploadPictureLoading());
    fetch(API_MEDIA_URL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        dispatch(uploadPictureSuccess(data));
      })
      .catch(err => {
        dispatch(uploadPictureFailure(err));
      });
  };
};
