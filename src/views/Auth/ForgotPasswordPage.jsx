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
} from "@material-ui/core";
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
//import SweetAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import Button from "../../components/CustomButtons/Button";
import { changePassword } from "../../actions/auth";
import verificationPageStyle from '../../assets/jss/material-dashboard-pro-react/views/verificationPageStyle';
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ForgotPasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {email: '',  code: '', newPassword: '', confirmedPassword: '', errorMessage: '', isOpen: false };
    this.handleChangePassword = this.handleChangePassword.bind(this);
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpen: nextProps.open})
  }

  handleChangeClose= () => {
    this.setState({isOpen: false})
  }
  handleChangePassword = () => {
    const { code, confirmedPassword, newPassword } = this.state;
    if(code === "") {
      this.setState({errorMessage: 'Verification code is not set!'});
      return;
    }
    if(newPassword === "") {
      this.setState({errorMessage: 'New Password is not set!'});
      return;
    }
    if(confirmedPassword === "") {
      this.setState({errorMessage: 'Confirmed Password is not set!'});
      return;
    }
    if(newPassword !== confirmedPassword) {
      this.setState({errorMessage: 'New Password and Confirmed Password does not match!'});
      return;
    }
    const { email, history } = this.props;
    const changePasswordData = {
      code: code,
      newPassword: newPassword,
      email: email,
    };
    this.props.changePassword(changePasswordData, history);
  }

  cbAfterResend = () => {
  }

  render() {
    const { classes, resetPasswordError, resetPasswordLoading, changePasswordRsp } = this.props;
    const { errorCode, errorMessage, isOpen } = this.state;
    if (resetPasswordLoading) {
      return < ClipLoader
        className={override}
        sizeUnit={"px"}
        size={50}
        color={'#123abc'}
        loading={resetPasswordLoading}
      />;
    }
    return (
      <React.Fragment>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
          <DialogContent>
            {resetPasswordError !== null ? (<div className={classes.justifyContentCenter}>
                <div  style={{ color: "red" }} > {(resetPasswordError.status === 400 || resetPasswordError.status === 500) ? resetPasswordError.message: ''} </div>
              </div>)
              :
              ( <div className={classes.justifyContentCenter}>
              </div>)}
            {changePasswordRsp !== null ? (<div className={classes.justifyContentCenter}>
                <div  style={{ color: "blue" }} > {(changePasswordRsp.success === true) ? 'Changed password successfully!': ''} </div>
              </div>)
              :
            (<DialogContentText id="alert-dialog-description">
              { changePasswordRsp === null || (resetPasswordError.status === 400 || resetPasswordError.status === 500 )? '' : 'Code was sent to your email' }
            </DialogContentText>)}
            <FormControl
              fullWidth
              error={errorCode}
              aria-describedby="code-input-wrapper"
            >
              <InputLabel htmlFor="code-input">Enter code</InputLabel>
              <Input
                fullWidth
                id="code-input"
                onChange={(event) => { this.setState({ code: event.target.value }) }}
              />
              {errorCode && <FormHelperText id="code-input-wrapper">Please enter correct code!</FormHelperText>}
            </FormControl>
            <FormControl
              fullWidth
              error={errorCode}
              aria-describedby="code-input-wrapper"
            >
              <InputLabel htmlFor="new-password-input">Enter New Password</InputLabel>
              <Input
                fullWidth
                id="new-password-input"
                type="password"
                onChange={(event) => { this.setState({ newPassword: event.target.value }) }}
              />
              {errorCode && <FormHelperText id="new-password-input-wrapper">Please enter correct new password</FormHelperText>}
          </FormControl>
            <FormControl
              fullWidth
              error={errorCode}
              aria-describedby="code-input-wrapper"
            >
              <InputLabel htmlFor="code-input">Enter Confirmed Password</InputLabel>
              <Input
                fullWidth
                id="confirm-password-input"
                type="password"
                onChange={(event) => { this.setState({ confirmedPassword: event.target.value }) }}
              />
              {errorCode && <FormHelperText id="confirm-password-input-wrapper">Please enter correct confirmed password</FormHelperText>}
          </FormControl>
            {errorMessage.length > 0 ? (<div className={classes.justifyContentCenter}>
                <div  style={{ color: "red" }} >  {errorMessage} </div>
              </div>)
              :
              ( <div className={classes.justifyContentCenter}>
              </div>)}
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <div>
              <Button disabled={changePasswordRsp.success|| resetPasswordError.status === 400 || resetPasswordError.status === 500} onClick={this.handleChangePassword} color="rose">
                Save
              </Button>
            </div>
            <div>
              <Button onClick={this.handleChangeClose} color="rose">
                Close
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  email: PropTypes.string,
  open: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  actionAfterSubmit: PropTypes.func,
};

ForgotPasswordPage.defaultProps = {
  email: undefined,
  actionAfterSubmit: undefined,
}

const mapStateToProps = state => {
    return {
      verifyDetail: state.user.verifyDetail,
      verifyLoading: state.user.verifyLoading,
      resetPasswordError: state.user.resetPasswordError,
      changePasswordRsp: state.user.changePasswordRsp,
      email: state.user.email,
      resetPasswordLoading: state.user.resetPasswordLoading,
    }
  }


const mapDispatchToProps = (dispatch) => {
    return {
      changePassword: (user, email, code, history) => dispatch(changePassword(user, email, code, history)),
    }
  }
export default compose(
  withStyles(verificationPageStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ForgotPasswordPage);
