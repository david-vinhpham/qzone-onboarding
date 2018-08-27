import { FETCH_PROVIDERS, FETCH_PROVIDER } from './../actions/provider';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PROVIDERS:
      // return {...state, data: action.payload.data.data}
      return state
    case FETCH_PROVIDER:
      // return {data: action.payload.data.data}
      return state;
    default:

      return state;
  }
}