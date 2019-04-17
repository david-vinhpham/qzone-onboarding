import PropTypes from 'prop-types';

export const providerType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
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

export const specialEventType = PropTypes.shape({
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
});
