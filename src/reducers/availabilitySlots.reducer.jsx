import { availabilitySlots } from 'constants/AvailabilitySlots';

const initialState = {
  isLoading: false,
  list: [],
  geoLocation: '',
  providerName: '',
  serviceName: '',
  eventDate: '',
  timezoneId: '',
  uniqueLink: '',
  tmpServiceId: '',
};

const reducer = (state = initialState, action) => {
  console.log('availabilitySlots reducer...')
  switch (action.type) {
    case availabilitySlots.FETCH_AVAILABILITY_LOADING:
      return { ...state, isLoading: action.payload };
    case availabilitySlots.FETCH_AVAILABILITY_SUCCESS:
      return { ...state, list: action.payload.objects, geoLocation: action.payload.geoLocation,
        providerName: action.payload.providerName,  serviceName: action.payload.serviceName, tmpServiceId: action.payload.id,
        eventDate: action.payload.eventDate,
        timezoneId: action.payload.timezoneId,
        uniqueLink: action.payload.uniqueLink, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
