import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";

import InputAdornment from "@material-ui/core/InputAdornment";
import Phone from "@material-ui/icons/Phone";

import CustomInput from "../../../components/CustomInput/CustomInput.jsx";

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      phoneNumberState: "",
      mobileNumber: "",
      mobileNumberState: "",
      email: "",
      emailState: ""
    };
  }
  sendState() {
    return this.state;
  }

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

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>How to connect with you?</h4>
        <GridContainer justify="center">          
          <GridItem xs={12} sm={5}>
            <CustomInput
              success={this.state.mobileNumberState === "success"}
              error={this.state.mobileNumberState === "error"}
              labelText={
                <span>
                  Mobile No <small>(required)</small>
                </span>
              }
              id="mobileNumber"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type:"number",
                onChange: event => this.change(event, "mobileNumber", "length", 10),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Phone className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
            <CustomInput
              labelText={
                <span>
                  Phone Number
              </span>
              }
              id="phoneNumber"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type:"number",
                onChange: event => this.change(event, "phoneNumber"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Phone className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={10}>
            <CustomInput
              success={this.state.emailState === "success"}
              error={this.state.emailState === "error"}
              labelText={
                <span>
                  Email <small>(required)</small>
                </span>
              }
              id="email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "email", "email"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
        </GridContainer>

        </div>
    );
  }
}

export default withStyles(style)(Step2);
