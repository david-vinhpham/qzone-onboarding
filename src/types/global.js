import PropTypes from 'prop-types';

export const providerType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  givenName: PropTypes.string,
  familyName: PropTypes.string
});

export const classesType = PropTypes.objectOf(PropTypes.string);

export const historyType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.func])
);

export const matchType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool])
);

export const optionType = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string
});

export const userDetailType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object, PropTypes.string,
]));

export const customerFlowBoardType = PropTypes.shape({
  eventId: PropTypes.string,
  mode: PropTypes.string,
  providerId: PropTypes.string,
  providerName: PropTypes.string,
  serviceId: PropTypes.string,
  serviceName: PropTypes.string,
  customerFlowDetailList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    bookingCode: PropTypes.string,
    bookingTime: PropTypes.number,
    position: PropTypes.number,
    isConfirmed: PropTypes.bool,
    checkingTime: PropTypes.number,
    serviceTime: PropTypes.number,
    completedTime: PropTypes.number,
    cancelledTime: PropTypes.number,
    timezoneId: PropTypes.string,
    status: PropTypes.string,
    mode: PropTypes.string,
    sbookingTime: PropTypes.string,
    scheckingTime: PropTypes.string,
    scompletedTime: PropTypes.string,
    scancelledTime: PropTypes.string,
    sserviceTime: PropTypes.string
  }))
});

export const verifyBookingCodeType = PropTypes.shape({
  bookingCode: PropTypes.string,
  eventId: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  mode: PropTypes.string,
  phoneNumber: PropTypes.string,
  serviceName: PropTypes.string,
  serviceId: PropTypes.string,
  providerId: PropTypes.string,
  providerName: PropTypes.string,
  position: PropTypes.number,
  startTime: PropTypes.string,
  timezoneId: PropTypes.string,
  status: PropTypes.string
});

export const serviceCategoryType = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  parentCategoryId: PropTypes.string
});

export const businessCategoryType = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string
});

export const tmpServiceType = PropTypes.shape({
  avgServiceTime: PropTypes.number,
  breakTime: PropTypes.shape({
    breakEnd: PropTypes.number,
    breakStart: PropTypes.number,
  }),
  businessAdminId: PropTypes.string,
  id: PropTypes.string,
  numberOfParallelCustomer: PropTypes.number,
  orgName: PropTypes.string,
  organizationId: PropTypes.string,
  providerId: PropTypes.string,
  providerName: PropTypes.string,
  rating: PropTypes.number,
  repeat: PropTypes.shape({
    repeatDaily: PropTypes.shape({
      repeatEvery: PropTypes.number,
    }),
    repeatWeekly: PropTypes.shape({
      repeatEveryNumWeeks: PropTypes.number,
      repeatOn: PropTypes.string,
    }),
  }),
  repeatEnd: PropTypes.shape({
    afterNumOccurrences: PropTypes.number,
    repeatEndOn: PropTypes.number
  }),
  repeatEndType: PropTypes.string,
  repeatType: PropTypes.string,
  serviceId: PropTypes.string,
  serviceName: PropTypes.string,
  slot: PropTypes.shape({
    endTime: PropTypes.number,
    startTime: PropTypes.number
  }),
  timezoneId: PropTypes.string,
  geoLocation: PropTypes.shape({
    id: PropTypes.string,
  }),
});

export const availabilitySlotType = PropTypes.shape({
  customerStartSec: PropTypes.string,
  durationSec: PropTypes.number,
  id: PropTypes.string,
  providerId: PropTypes.string,
  providerStartSec: PropTypes.string,
  serviceId: PropTypes.string,
  specialServiceId: PropTypes.string,
  spotsOpen: PropTypes.number,
  spotsTotal: PropTypes.number,
  startSec: PropTypes.number,
  endSec: PropTypes.number,
});
