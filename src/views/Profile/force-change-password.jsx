import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../components/CustomButtons/Button';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import validatePassword from '../../utils/validatePassword';
import verificationPageStyle from '../../assets/jss/material-dashboard-pro-react/modules/verificationPageStyle';
import { classesType } from '../../types/global';
import AlertMessage from '../../components/Alert/Message';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { completeNewPasswordChallenge } from "../../actions/auth";
import { userStatus as eUserStatus } from "../../constants";
import { Link } from "react-router-dom";

class ForceChangePassword extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    email: PropTypes.string.isRequired,
    completeNewPasswordChallenge: PropTypes.func.isRequired,
    userId: PropTypes.string,
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
    this.state = { email: '', ...this.defaultState, openChangePassword: false };
  }

  componentWillReceiveProps(nextProps) {
    const userStatus = localStorage.getItem('userStatus');
    if (userStatus !== null && userStatus !== '') {
      this.setState({ openChangePassword: userStatus === eUserStatus.changePassword });
    }
  }

  componentDidMount() {
    const loginEmail = localStorage.getItem('loginEmail');
    this.setState({ email: loginEmail });
    const userStatus = localStorage.getItem('userStatus');
    this.setState({ openChangePassword: userStatus === eUserStatus.changePassword });
  }

  handleChangePassword = (event) => {
    event.preventDefault();
    /*const { userId } = this.props;*/
    const {
      email, defaultPwdState, newPasswordState, confirmPwdState, defaultPwd, newPassword,
    } = this.state;
    const isValid = (defaultPwdState === 'success' && confirmPwdState === 'success'
      && newPasswordState === 'success' && defaultPwd !== newPassword);
    if (!isValid) {
      Alert.success(<AlertMessage>Invalid input data!</AlertMessage>, { effect: 'bouncyflip' });
      return;
    }
    const {
      completeNewPasswordChallenge: completeNewPasswordChallengeAction,
      history
    } = this.props;
    completeNewPasswordChallengeAction({
      tempPassword: defaultPwd,
      finalPassword: newPassword,
      email
    }, history);
  };

  onChangePassword = ({ target: { value } }) => {
    const newState = {
      newPasswordState: value.length >= 8
        && value.length <= 60
        && validatePassword(value) ? 'success' : 'error',
      newPassword: value,
    };

    this.setState(newState);
  };

  onChangeConfirmPwd = ({ target: { value } }) => {
    let status = 'error';
    let newPwd = this.state.newPassword;
    if (value !== '' && value === newPwd) {
      status = 'success';
    }
    const confirmState = {
      confirmPwdState: status,
      confirmPwd: value,
    };
    this.setState(confirmState);
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
    this.setState({ openChangePassword: false });
  };

  render() {
    const { classes } = this.props;
    const { openChangePassword } = this.state;
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
                You must change to new password before update the information!
              </DialogContentText>
              <div>
                <GridContainer>
                  <GridItem md={12}>
                    <div className={classes.inputWrapper}>

                      <CustomInput
                        id={`default`}
                        inputProps={{ placeholder: 'Current Password (required)', type: "password" }}
                        onChange={this.onChangeDefaultPassword}
                      />
                    </div>

                    <div className={classes.inputWrapper}>

                      <CustomInput
                        id={`password `}
                        inputProps={{ placeholder: 'Password (required)', type: "password" }}
                        onChange={this.onChangePassword}
                      />

                      <CustomInput
                        id={`confirmPwd `}
                        inputProps={{ placeholder: 'Confirm password (required)', type: "password" }}
                        onChange={this.onChangeConfirmPwd}
                      />
                    </div>
                    <small>
                      Password must be from 8 to 60 characters.
                      <br />
                      Password must include at least 1 lowercase character(s), 1 uppercase character(s), 1 digit(s)
                      and 1 special character(s) such as #?!@$%^&*-
                    </small>
                  </GridItem>
                </GridContainer>
              </div>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <div>
                <Button disabled={false} type="submit" color="rose">
                  Submit
                </Button>
                <Link to={`/calendar`}>
                  <Button onClick={this.onDialogClose}>
                    Close
                </Button>
                </Link>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    force_change_password: state.user.force_change_password
  };
};

export default compose(
  withStyles(verificationPageStyle),
  connect(mapStateToProps, { completeNewPasswordChallenge }),
)(ForceChangePassword);
