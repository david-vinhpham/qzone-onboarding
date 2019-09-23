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

export const userDetailType = PropTypes.shape({
  email: PropTypes.string,
  familyName: PropTypes.string,
  fullName: PropTypes.string,
  givenName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  providerId: PropTypes.string,
  providerInformation: PropTypes.shape({
    businessId: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      fileUrl: PropTypes.string,
      id: PropTypes.string,
      keyName: PropTypes.string,
      originName: PropTypes.string
    }),
    organizationId: PropTypes.string,
    qualifications: PropTypes.string,
    tags: PropTypes.string,
    timeZoneId: PropTypes.string
  }),
  telephone: PropTypes.string,
  token: PropTypes.string,
  userStatus: PropTypes.string,
  userSub: PropTypes.string,
  userType: PropTypes.string,
});

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
  givenName: PropTypes.string,
  mode: PropTypes.string,
  phoneNumber: PropTypes.string,
  serviceName: PropTypes.string,
  serviceId: PropTypes.string,
  providerId: PropTypes.string,
  providerName: PropTypes.string,
  position: PropTypes.number,
  startTime: PropTypes.string,
  timezoneId: PropTypes.string,
  status: PropTypes.string,
  customerId: PropTypes.string,
  userType: PropTypes.string,
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
  providerStartSec: PropTypes.string,
  spotsOpen: PropTypes.number,
  spotsTotal: PropTypes.number
});

export const scheduleReportType = PropTypes.shape({
  providerName: PropTypes.string,
  dateEvent: PropTypes.string,
  tmServiceReportList: PropTypes.arrayOf(PropTypes.shape({
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerPhone: PropTypes.string,
    bookingCode: PropTypes.string,
    startTime: PropTypes.string,
    toTime: PropTypes.string,
    status: PropTypes.string,
    iStartTime: PropTypes.number
  }))
});

export const surveyType = PropTypes.shape({
  description: PropTypes.string,
  id: PropTypes.string,
  logo: PropTypes.string,
  orgId: PropTypes.string,
  privacy: PropTypes.bool,
  survey: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  userId: PropTypes.string,
});
