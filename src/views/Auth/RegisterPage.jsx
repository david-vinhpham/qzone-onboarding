import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { InputAdornment, Checkbox, FormControlLabel } from '@material-ui/core';
import { Email, Lock as LockOutline, Check } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';

import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import registerPageStyle from '../../assets/jss/material-dashboard-pro-react/views/registerPageStyle';
import VerificationPage from './VerificationPage';
import validatePassword from '../../validation/validation';
import { registerUser, facebookSignIn } from '../../actions/auth';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: 'cardHidden',
      registerOrganizationName: '',
      registerOrganizationNameState: '',
      registerGivenName: '',
      registerGivenNameState: '',
      registerEmail: '',
      registerEmailState: '',
      registerPassword: '',
      registerPasswordState: '',
      registerConfirmPassword: '',
      registerConfirmPasswordState: '',
      registerCheckbox: false,
      registerCheckboxState: '',
      openVerificationModal: false,
      code: '',
      loading: false,
      registrationType: 'Organization'
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 200);
  }

  verifyEmail = value => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };

  registerClick = () => {
    if (this.state.registerEmailState === '') {
      this.setState({ registerEmailState: 'error' });
    }
    if (this.state.registerGivenName === '') {
      this.setState({ registerGivenName: 'error' });
    }
    if (this.state.registerPasswordState === '') {
      this.setState({ registerPasswordState: 'error' });
    }
    /* if (this.state.registerOrganizationName === "") {
      this.setState({ registerOrganizationNameState: "error" })
    } */
    if (
      this.state.registerConfirmPasswordState === '' ||
      this.state.registerPassword !== this.state.registerConfirmPassword
    ) {
      this.setState({ registerConfirmPasswordState: 'error' });
    }
    if (this.state.registerCheckboxState === '') {
      this.setState({ registerCheckboxState: 'error' });
    }
    /* if (this.state.registrationType === "Organization" && this.state.registerEmailState === "success"
      && this.state.registerGivenNameState === "success"
      && this.state.registerPasswordState === "success" && this.state.registerConfirmPasswordState === "success"
      && this.state.registerCheckboxState === "success" && this.state.registerOrganizationName === "success") {
      //window.location = '/dashboard'
      this.setState({ loading: true }, () => {
        this.props.registerUser(this.state);
      });
    } */
    if (
      this.state.registerEmailState === 'success' &&
      this.state.registerPasswordState === 'success' &&
      this.state.registerConfirmPasswordState === 'success' &&
      this.state.registerConfirmPasswordState === 'success' &&
      this.state.registerCheckboxState === 'success'
    ) {
      // window.location = '/dashboard'
      this.setState({ loading: true }, () => {
        this.props.registerUser(this.state);
      });
    }
  };

  registerAsClick(registrationType) {
    this.setState({ registrationType });
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        this.setState({ [stateName]: event.target.value });
        break;
      case 'password':
        if (this.verifyLength(event.target.value, 3) && validatePassword(event.target.value)) {
          this.setState({ [`${stateName}State`]: 'success' });
          if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
            this.setState({ [`${stateNameEqualTo}State`]: 'success' });
          } else {
            this.setState({ [`${stateNameEqualTo}State`]: 'error' });
          }
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        this.setState({ [stateName]: event.target.value });
        break;
      case 'equalTo':
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        this.setState({ [stateName]: event.target.value });
        break;
      case 'checkbox':
        if (event.target.checked) {
          this.setState({ [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        this.setState({ [stateName]: event.target.value });
        break;
      default:
        if (event.target.value) {
          this.setState({ [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }

  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <form>
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="rose"
                  >
                    <h4 className={classes.cardTitle}>Register</h4>
                  </CardHeader>

                  <CardBody>
                    <CustomInput
                      labelText="Business Name"
                      success={this.state.registerEmailState === 'success'}
                      error={this.state.registerEmailState === 'error'}
                      id="givenName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: 'Business Name',
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                      onChange={event => this.change(event, 'registerGivenName', 'text')}
                    />
                    <CustomInput
                      labelText="Email"
                      success={this.state.registerEmailState === 'success'}
                      error={this.state.registerEmailState === 'error'}
                      id="registeremail"
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
                      onChange={event => this.change(event, 'registerEmail', 'email')}
                    />
                    <CustomInput
                      labelText="Password"
                      success={this.state.registerPasswordState === 'success'}
                      error={this.state.registerPasswordState === 'error'}
                      id="registerPassword"
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
                      onChange={event =>
                        this.change(
                          event,
                          'registerPassword',
                          'password',
                          'registerConfirmPassword'
                        )
                      }
                    />
                    <CustomInput
                      labelText="Confirm Password"
                      success={this.state.registerConfirmPasswordState === 'success'}
                      error={this.state.registerConfirmPasswordState === 'error'}
                      id="registerConfirmPassword"
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
                      onChange={event =>
                        this.change(event, 'registerConfirmPassword', 'equalTo', 'registerPassword')
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event => this.change(event, 'registerCheckbox', 'checkbox')}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label:
                          classes.label +
                          (this.state.registerCheckboxState === 'error'
                            ? ` ${classes.labelError}`
                            : '')
                      }}
                      label={<span>I agree to the terms and conditions</span>}
                    />
                    <VerificationPage
                      open={this.props.verify}
                      email={this.state.registerEmail}
                      history={history}
                      page="register"
                    />
                    <div className={classes.center}>
                      <Button color="rose" simple size="lg" block onClick={this.registerClick}>
                        Submit
                      </Button>
                    </div>

                    {/* this.state.registrationType === 'Customer' &&
                      (<div className={classes.center}>
                        <Button color="rose" simple size="lg" block onClick={this.registerAsClick.bind(this, 'Organization')}>
                           Or Register As Organization
                  </Button>
                      </div>) */}

                    {/* this.state.registrationType === 'Organization' &&
                      (<div className={classes.center}>
                        <Button color="rose" simple size="lg" block onClick={this.registerAsClick.bind(this, 'Customer')}>
                          Or Register As Customer
                    </Button>
                      </div>) */}
                  </CardBody>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userDetail: state.user.userDetail,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    verify: state.user.verify
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: value => dispatch(registerUser(value)),
    facebookSignIn: () => dispatch(facebookSignIn())
  };
};

export default compose(
  withStyles(registerPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterPage);
