import { FETCH_PROVIDERS, 
        FETCH_PROVIDER, 
        FETCH_PROVIDER_SUCCESS, 
        FETCH_PROVIDERS_FAILURE, 
        FETCH_PROVIDERS_SUCCESS
} from './../actions/provider';



export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PROVIDERS:
      // return {...state, data: action.payload.data.data}
      return state
    case FETCH_PROVIDER:
      // return {data: action.payload.data.data}
      return state;
    case FETCH_PROVIDERS_SUCCESS:
      return {}
    default:
      return state;
  }
}