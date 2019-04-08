import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  message: {
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Message = (props) => {
  const { classes, children } = props;
  return (
    <div className={classes.message}>{children}</div>
  );
};

Message.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.string.isRequired,
};

export default withStyles(styles)(Message);
