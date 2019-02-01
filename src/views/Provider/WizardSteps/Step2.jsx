import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import Phone from "@material-ui/icons/Phone";
import { FormLabel, FormControlLabel, Switch } from "@material-ui/core";
import Select from 'react-select';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import { fetchAllLocations } from '../../../actions/location';

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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      telephone: "",
      isAdmin: false,
      email: "",
      emailState: "",
      selectedOption: null,

    };
  }

  componentDidMount() {
    //this.props.fetchAllLocations();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({geoLocation: nextProps.getAllLocations})
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

  change(event, stateName, type) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  isValidated() {
    return true;
  }

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;
    console.log("this.state 2-----", this.state)
    return (
      <div>
        <h4 className={classes.infoText}> Further Details </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={5}>
            <CustomInput
              labelText={
                <span>
                  Phone Number
              </span>
              }
              id="telephone"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "number",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Phone className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
              onChange={event => this.change(event, "telephone")}
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
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

                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
              onChange={event => this.change(event, "email", "email")}
            />
          </GridItem>
          <GridItem xs={12} sm={3}>
            <FormLabel
              className={
                classes.labelHorizontal +
                " " +
                classes.labelHorizontalRadioCheckbox
              }
            >
              Is Provider Admin?
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormControlLabel
              control={
                <Switch
                  name="isAdmin"
                  checked={this.state.isAdmin}
                  value="isAdmin"
                  onChange={this.handleChange("isAdmin")}
                />
              }
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={options}
            />
          </GridItem>
        </GridContainer>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllLocations: state.location.getAllLocations,
    getAllLocationsLoading: state.location.getAllLocationsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllLocations: () => dispatch(fetchAllLocations())
  }
}

// export default compose(
// 	withStyles(style),
// 	connect(mapStateToProps, mapDispatchToProps),
// )(Step2);

export default withStyles(style)(Step2)
