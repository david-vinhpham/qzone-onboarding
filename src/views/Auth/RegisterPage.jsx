import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { InputAdornment, Checkbox, FormControlLabel } from "@material-ui/core";
import { Email, LockOutline, Check } from "@material-ui/icons";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: "",
      registerEmailState: "",
      registerPassword: "",
      registerPasswordState: "",
      registerConfirmPassword: "",
      registerConfirmPasswordState: "",
      registerCheckbox: false,
      registerCheckboxState: ""
    };
    this.change = this.change.bind(this);
  }
  // handleToggle(value) {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked
  //   });
  // }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }

  registerClick() {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "error" });
    }
    if (this.state.registerPasswordState === "") {
      this.setState({ registerPasswordState: "error" });
    }
    if (this.state.registerConfirmPasswordState === "" || this.state.registerPassword !== this.state.registerConfirmPassword) {
      this.setState({ registerConfirmPasswordState: "error" });
    }
    if (this.state.registerCheckboxState === "" ) {
      this.setState({ registerCheckboxState: "error" });
    }
    if (this.state.registerEmailState === "success" && this.state.registerPasswordState === "success" && this.state.registerConfirmPasswordState === "success" && this.state.registerCheckboxState === "success") {
      window.location = '/dashboard'
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      case "password":
        if (this.verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
          if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
            this.setState({ [stateNameEqualTo + "State"]: "success" });
          } else {
            this.setState({ [stateNameEqualTo + "State"]: "error" });
          }
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        this.setState({[stateName]: event.target.value})
        break;
      default:
        break;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.center}>
                      <Button justIcon round color="twitter" >
                        <i className="fab fa-twitter" />
                      </Button>
                      {` `}
                      <Button justIcon round color="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>
                      {` `}
                      <Button justIcon round color="facebook">
                        <i className="fab fa-facebook-f" />
                      </Button>
                      {` `}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
                    <form className={classes.form}>
                      <CustomInput
                        labelText="Email"
                        success={this.state.registerEmailState === "success"}
                        error={this.state.registerEmailState === "error"}
                        id="registeremail"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "registerEmail", "email"),
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        success={this.state.registerPasswordState === "success"}
                        error={this.state.registerPasswordState === "error"}
                        id="registerPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "registerPassword", "password", "registerConfirmPassword"),
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        success={this.state.registerConfirmPasswordState === "success"}
                        error={this.state.registerConfirmPasswordState === "error"}
                        id="registerConfirmPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event,"registerConfirmPassword", "equalTo","registerPassword"),
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={event =>
                              this.change(event, "registerCheckbox", "checkbox")
                            }
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
                            (this.state.registerCheckboxState === "error"
                              ? " " + classes.labelError
                              : "")
                        }}
                        label={
                          <span>
                            I agree to the terms and conditions
                            
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button round color="primary" onClick={this.registerClick.bind(this)}>
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
