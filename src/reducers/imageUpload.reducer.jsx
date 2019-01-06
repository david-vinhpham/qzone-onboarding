import { imageUpload } from '../constants/ImageUpload.constants'

const initialState = {
    imageLoading : false,
    image: {},
    imageError: null

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case imageUpload.IMAGE_UPLOAD_LOADING: 
            return {...state, imageLoading: true}
        case imageUpload.IMAGE_UPLOAD_SUCCESS:
            return { ...state, image: action.payload.data, imageLoading: false}
        case imageUpload.IMAGE_UPLOAD_FAILURE:
            return { ...state, image: [], imageError: action.payload.error, imageLoading: false}

            default:
            return state;
    }
}

export default reducer;