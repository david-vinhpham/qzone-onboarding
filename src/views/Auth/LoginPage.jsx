import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Lock as LockOutline } from '@material-ui/icons';
import Loading from '../../components/Loading/Loading';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip, Typography } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import loginPageStyle from '../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx';
import { loginUser, resetPassword } from '../../actions/auth';
import ForgotPasswordPage from './ForgotPasswordPage';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimation: 'cardHidden',
      loginEmail: '',
      loginEmailState: '',
      loginPassword: '',
      loginPasswordState: '',
      isForgotPassword: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimation: '' });
    }, 700);
    // const ga = window.gapi && window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null;
    // if (!ga) createScript();
  }

  handleReqVerificationCode = () => {
    const { loginEmail } = this.state;
    if (!this.verifyEmail(loginEmail)) {
      return;
    }
    this.setState({ isForgotPassword: true });
    const data = { email: loginEmail };
    this.props.resetPassword(data);
  };

  verifyEmail = value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

  verifyLength = (value, length) => value.length >= length;

  loginClick = () => {
    if (this.state.loginEmailState === '') {
      this.setState({ loginEmailState: 'error' });
    }
    if (this.state.loginPasswordState === '') {
      this.setState({ loginPasswordState: 'error' });
    }
    if (this.state.loginEmailState === 'success' && this.state.loginPasswordState === 'success') {
      this.props.loginUser(this.state, this.props.history);
    }
  };

  change(event, stateName, type) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName]: event.target.value, [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        break;
      case 'password':
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName]: event.target.value, [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ isForgotPassword: false });
  }

  render() {
    const { classes, userLoading, history } = this.props;
    const { loginEmail, isForgotPassword } = this.state;
    const [forgotPasswordTitle, forgotClass] = !this.verifyEmail(loginEmail)
      ? ['Enter your email above to reset password!', 'button-pad-bot text-right hover-pointer']
      : ['', 'button-pad-bot hover-pointer text-right hover-main-color'];
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4} className={classes.justifyContentCenter}>
              {userLoading === true ? (
                <Loading />
              ) : (
                <form>
                  <Card login className={classes[this.state.cardAnimation]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="rose"
                    >
                      <h4 className={classes.cardTitle}>Log in</h4>
                      <div className={classes.socialLine}>
                        <Button justIcon href="" target="_blank" color="transparent">
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button justIcon href="" target="_blank" color="transparent">
                          <i className="fab fa-facebook" />
                        </Button>
                        <Button justIcon href="" target="_blank" color="transparent">
                          <i className="fab fa-google-plus-g" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        success={this.state.loginEmailState === 'success'}
                        error={this.state.loginEmailState === 'error'}
                        id="loginemail"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'email',
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                        onChange={event => this.change(event, 'loginEmail', 'email')}
                      />
                      <CustomInput
                        labelText="Password"
                        success={this.state.loginPasswordState === 'success'}
                        error={this.state.loginPasswordState === 'error'}
                        id="loginPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'password',
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                        onChange={event => this.change(event, 'loginPassword', 'password')}
                      />
                      <div>
                        <Button color="rose" simple size="lg" block onClick={this.loginClick}>
                          Submit
                        </Button>
                      </div>
                      <div>
                        <Link to="/register">
                          <Button color="rose" simple size="lg" block>
                            Register as Business User
                          </Button>
                        </Link>
                      </div>

                      <ForgotPasswordPage
                        open={isForgotPassword}
                        email={loginEmail}
                        history={history}
                        page="register"
                      />

                      <div>
                        <Tooltip
                          title={forgotPasswordTitle}
                          placement="top-end"
                          classes={{ tooltip: 'tooltip-lg' }}
                        >
                          <Typography
                            onClick={this.handleReqVerificationCode}
                            variant="subtitle2"
                            color="textSecondary"
                            className={forgotClass}
                          >
                            Forgot Password?
                          </Typography>
                        </Tooltip>
                      </div>
                    </CardBody>
                  </Card>
                </form>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userDetails: state.user.userDetails,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    verify: state.user.verify,
    resetPassword: state.user.resetPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (value, history) => dispatch(loginUser(value, history)),
    resetPassword: email => dispatch(resetPassword(email))
  };
};

export default compose(
  withStyles(loginPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
