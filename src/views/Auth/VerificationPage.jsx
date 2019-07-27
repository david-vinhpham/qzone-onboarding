import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/CustomButtons/Button';
import { verifyUserCode } from '../../actions/auth';
import verificationPageStyle from '../../assets/jss/material-dashboard-pro-react/views/verificationPageStyle';
import ResendCodeButton from './ResendCodeButton';

class VerificationPage extends React.PureComponent {
  countDownResendCodeId = null;

  constructor(props) {
    super(props);
    this.state = { code: '', errorCode: false, countDownResendCode: 120 };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        this.startCountDown();
      } else {
        this.stopCountDown();
        this.setState({ countDownResendCode: 120 });
      }
    }
  }

  componentWillUnmount() {
    this.stopCountDown();
  }

  startCountDown = () => {
    this.countDownResendCodeId = setInterval(() => {
      this.setState(
        oldState => ({ countDownResendCode: oldState.countDownResendCode - 1 }),
        () => {
          if (this.state.countDownResendCode === 0) {
            this.stopCountDown();
          }
        }
      );
    }, 1000);
  };

  stopCountDown = () => {
    if (this.countDownResendCodeId) {
      clearInterval(this.countDownResendCodeId);
    }
  };

  handleVerificationCode = () => {
    const { code } = this.state;
    const { email, history, userSub } = this.props;
    this.props.verifyUserCode(userSub, email, code, history);
  };

  cbAfterResend = () => {
    this.setState({ errorCode: false, countDownResendCode: 120 }, this.startCountDown);
  };

  render() {
    const { email, classes, open } = this.props;
    const { countDownResendCode, errorCode } = this.state;

    return (
      <React.Fragment>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Verification code</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email{' '}
              <b>
                <u>{email}</u>
              </b>{' '}
              and enter verification code.
            </DialogContentText>
            <FormControl fullWidth error={errorCode} aria-describedby="code-input-wrapper">
              <InputLabel htmlFor="code-input">Enter code</InputLabel>
              <Input
                fullWidth
                id="code-input"
                onChange={event => {
                  this.setState({ code: event.target.value });
                }}
              />
              {errorCode && (
                <FormHelperText id="code-input-wrapper">Please enter correct code!</FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <ResendCodeButton
              classes={classes}
              cbAfterResend={this.cbAfterResend}
              email={email}
              countDownResendCode={countDownResendCode}
            />
            <div>
              <Button onClick={this.handleVerificationCode} color="rose">
                Submit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

VerificationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  email: PropTypes.string,
  open: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  actionAfterSubmit: PropTypes.func
};

VerificationPage.defaultProps = {
  email: undefined,
  actionAfterSubmit: undefined
};

const mapStateToProps = state => {
  return {
    verifyDetail: state.user.verifyDetail,
    verifyLoading: state.user.verifyLoading,
    verifyError: state.user.verifyError,
    userSub: state.user.userDetail.userSub
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyUserCode: (userSub, email, code, history) =>
      dispatch(verifyUserCode(userSub, email, code, history))
  };
};

export default compose(
  withStyles(verificationPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(VerificationPage);
