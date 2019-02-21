import { imageUpload } from '../constants/ImageUpload.constants';
import {API_MEDIA_URL} from '../config/config';

export const uploadImage = (formData) => {
    return (dispatch) => {
        dispatch(uploadImageLoading())
        fetch(API_MEDIA_URL, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            dispatch(uploadImageSuccess(data))
        })
        .catch(err => {
            dispatch(uploadImageFailure(err))
        })
    }
}

export const uploadImageLoading = () => {
    return {
        type: imageUpload.IMAGE_UPLOAD_LOADING
    }
}

export const uploadImageSuccess = (data) => {
    return {
        type: imageUpload.IMAGE_UPLOAD_SUCCESS,
        payload: data
    }
}

export const uploadImageFailure = (error) => {
    return {
        type: imageUpload.IMAGE_UPLOAD_FAILURE,
        payload: { error }
    }
}
