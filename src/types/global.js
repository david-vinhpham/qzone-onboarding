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
});
