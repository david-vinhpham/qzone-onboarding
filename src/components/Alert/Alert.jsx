import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import styles from './Alert.module.scss';
import { closeAlert } from 'actions/alert';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const Alert = ({ open, message, variant, ...props }) => {
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      data-test-id="alert"
      className={styles.alertContainer}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      // autoHideDuration={6000}
      onClose={props.closeAlert}
    >
      <SnackbarContent
        className={styles[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={styles.message}>
            <Icon fontSize="small" className={styles.iconVariant} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={props.closeAlert}>
            <CloseIcon fontSize="small" />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.alert,
});

export default connect(mapStateToProps, { closeAlert })(Alert);
