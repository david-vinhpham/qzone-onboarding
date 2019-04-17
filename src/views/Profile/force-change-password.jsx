import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText,
} from '@material-ui/core';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../components/CustomButtons/Button';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import validatePassword from '../../utils/validatePassword';
import verificationPageStyle from '../../assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import { classesType } from '../../types/global';
import AlertMessage from '../../components/Alert/Message';
import PasswordField from './password-field';

class ForceChangePassword extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    email: PropTypes.string.isRequired,
    openChangePassword: PropTypes.bool,
    closeChangePassword: PropTypes.func.isRequired,
    completeNewPasswordChallenge: PropTypes.func.isRequired,
    fetchUserByUserId: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    openChangePassword: false,
  };

  defaultState = {
    defaultPwd: undefined,
    defaultPwdState: 'undefined',
    newPassword: undefined,
    newPasswordState: 'undefined',
    confirmPwd: undefined,
    confirmPwdState: 'undefined',
  };

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  handleChangePassword = (event) => {
    event.preventDefault();
    const { email, userId } = this.props;
    const {
      completeNewPasswordChallenge: completeNewPasswordChallengeAction,
      fetchUserByUserId: fetchUserAction,
    } = this.props;
    const { newPassword, defaultPwd } = this.state;
    completeNewPasswordChallengeAction({
      tempPassword: defaultPwd,
      finalPassword: newPassword,
      email,
    }, (response) => {
      if (response.status === 200) {
        const { closeChangePassword } = this.props;
        closeChangePassword();
        fetchUserAction(userId);
        Alert.success(<AlertMessage>Password is successfully updated</AlertMessage>, { effect: 'bouncyflip' });
      } else {
        Alert.error(<AlertMessage>{response.data.message}</AlertMessage>, { effect: 'bouncyflip' });
      }
    });
  };

  onChangePassword = ({ target: { value } }) => {
    const newState = {
      newPasswordState: value.length >= 8
        && value.length <= 60
        && validatePassword(value) ? 'success' : 'error',
      newPassword: value,
    };
    const { confirmPwd } = this.state;

    if (confirmPwd !== undefined) {
      newState.confirmPwdState = value !== '' && value === confirmPwd ? 'success' : 'error';
    }

    this.setState(newState);
  };

  onChangeConfirmPwd = ({ target: { value } }) => {
    this.setState(oldState => ({
      confirmPwdState: value !== '' && value === oldState.newPassword ? 'success' : 'error',
      confirmPwd: value,
    }));
  };

  onChangeDefaultPassword = ({ target: { value } }) => {
    const newState = {
      defaultPwdState: value.length >= 8
        && value.length <= 60
        && validatePassword(value) ? 'success' : 'error',
      defaultPwd: value,
    };
    this.setState(newState);
  };

  onDialogClose = () => {
    const { closeChangePassword } = this.props;
    this.setState(this.defaultState, closeChangePassword);
  };

  render() {
    const { classes, openChangePassword } = this.props;
    const {
      defaultPwdState, newPasswordState, confirmPwdState, defaultPwd, newPassword,
    } = this.state;
    const isSubmitDisabled = !(((defaultPwdState === 'success') && (confirmPwdState === 'success')
      && (newPasswordState === 'success') && (defaultPwd !== newPassword)));

    return (
      <React.Fragment>
        <Dialog
          open={openChangePassword}
          onClose={this.onDialogClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="form-dialog-title">Change password</DialogTitle>
          <form onSubmit={this.handleChangePassword}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please enter your new password for security!
              </DialogContentText>
              <div>
                <GridContainer>
                  <GridItem md={12}>
                    <PasswordField
                      onChangeDefaultPwd={this.onChangeDefaultPassword}
                      onChangePassword={this.onChangePassword}
                      onChangeConfirmPwd={this.onChangeConfirmPwd}
                      defaultPwdState={defaultPwdState}
                      passwordState={newPasswordState}
                      confirmPwdState={confirmPwdState}
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <div>
                <Button disabled={isSubmitDisabled} type="submit" color="rose">
                  Submit
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(verificationPageStyle),
  //connect(null, { completeNewPasswordChallenge, fetchUserByUserId }),
)(ForceChangePassword);
