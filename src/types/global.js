import PropTypes from 'prop-types';

export const providerType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});
