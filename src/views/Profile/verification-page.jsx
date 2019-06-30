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
  InputLabel,
} from '@material-ui/core';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/CustomButtons/Button';
import { verifyUser } from 'services/api/user';
import verificationPageStyle from 'assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import { exactLength } from 'utils/validateLength';
import { classesType, historyType } from 'types/global';
import ResendCodeButton from './resend-code-button';
import { logout } from "../../actions/auth";

const codeLength = exactLength(6);

class VerificationPage extends React.PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    history: historyType.isRequired,
    email: PropTypes.string,
    open: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
    actionAfterSubmit: PropTypes.func,
    verifyUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    email: undefined,
    actionAfterSubmit: undefined,
  };

  countDownResendCodeId = null;

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isCodeValid: false,
      errorCode: false,
      countDownResendCode: 60,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { open } = this.props;
    if (open !== nextProps.open) {
      if (nextProps.open) {
        this.startCountDown();
      } else {
        this.stopCountDown();
        this.setState({ countDownResendCode: 60 });
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
          const { countDownResendCode } = this.state;
          if (countDownResendCode === 0) {
            this.stopCountDown();
          }
        },
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
    const {
      email, page, actionAfterSubmit,
      verifyUser: verifyUserAction, history,
    } = this.props;

    verifyUserAction({ email, code }, (response) => {
      if (response.status === 200) {
        if (page === 'login') {
          actionAfterSubmit();
        } else {
          logout(history);
          Alert.success('Register successfully! Please login with your new account');
        }
      } else {
        this.setState({ errorCode: true });
      }
    });
  };

  cbAfterResend = () => {
    this.setState({
      errorCode: false,
      countDownResendCode: 60,
      isCodeValid: false,
    }, this.startCountDown);
  };

  handleCodeChange = ({ target: { value } }) => {
    this.setState({
      code: value,
      errorCode: false,
      isCodeValid: codeLength(value),
    });
  };

  handleClose = () => {
    const { history } = this.props;
    logout(history);
  };

  render() {
    const {
      email,
      classes,
      open,
      page,
    } = this.props;
    const {
      countDownResendCode,
      errorCode,
      isCodeValid,
    } = this.state;

    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Verification code</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email
              {' '}
              <b><u>{email}</u></b>
              {' '}
              and enter verification code.
            </DialogContentText>
            <FormControl
              fullWidth
              error={errorCode}
              aria-describedby="code-input-wrapper"
            >
              <InputLabel htmlFor="code-input">Enter code</InputLabel>
              <Input
                autoFocus
                disabled={!countDownResendCode}
                fullWidth
                id="code-input"
                onChange={this.handleCodeChange}
              />
              {errorCode && <FormHelperText id="code-input-wrapper">Please enter correct code!</FormHelperText>}
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
              {Object.is(page, 'register')
              && (
                <Button disabled={isCodeValid || !!countDownResendCode} onClick={this.handleClose}>
                  Exit
                </Button>)
              }
              <Button disabled={!isCodeValid || !countDownResendCode} onClick={this.handleVerificationCode} color="rose">
                Submit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(verificationPageStyle),
  connect(null, { verifyUser }),
)(VerificationPage);
