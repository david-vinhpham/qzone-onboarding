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
