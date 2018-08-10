import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel}  from "@material-ui/core";      
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from 'actions/provider';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox.jsx"
import {verifyLength, verifyEmail} from "validation/validation.jsx"

class ProviderCreate extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      avgserviceTime: "",
      externalProviderId: "",
      email: "",
      emailState:"",
      avgCustomersPerHour: "",
      mobileNumber: "",
      credentials:"",
      emailPreference: [],
      enableWaitListAppointment: "",
      isOpen: "",
      createdBy: "",
      createdOn: "",
      isDeleted: false,
      updatedBy: "",
      updatedOn: ""

    };

    this.change = this.change.bind(this);
  }

  change(event, stateName,type,value){
    this.setState({[stateName]: (event.target.value || event.target.checked)})
  	switch (type) {
      case "first-name":
        if (verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "email":
        if (verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "last-name":
        if (verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "preference":
        const { emailPreference } = this.state;
        const currentIndex = emailPreference.indexOf(value);
        const newChecked = [...emailPreference];

        if (currentIndex === -1) {
          newChecked.push(event.target.value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        this.setState({
          emailPreference: newChecked
        });
        break;
      
      default:
        break;
    }
  }

  handleProvider(option) {
  	if (this.state.firstNameState === "")
  		this.setState({firstNameState: "error"})
  	if (this.state.lastNameState === "")
  		this.setState({lastNameState: "error"})
    if (this.state.emailState === "") {
      this.setState({ emailState: "error" });
    }
  	if (this.state.firstNameState === "success" && this.state.lastNameState === "success" && this.state.emailState === "success"){
      if (option === "Save"){
        this.props.createProvider(this.state, (response) => {
          window.location = "/provider/list";
        });
      }
      else{
        this.props.createProvider(this.state, () => {
          window.location = "/provider/create"
        });
      }
    }
  }
	render() {
    const { classes } = this.props;
		return(
			<GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Create Provider</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *First Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="First Name"
                    success={this.state.firstNameState === "success"}
                    error={this.state.firstNameState === "error"}
                    id="firstName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "firstName", "first-name"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    External Provider Id
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="External Provider Id"
                    id="externalProviderId"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "externalProviderId"),
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Last Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Last Name"
                    success={this.state.lastNameState === "success"}
                    error={this.state.lastNameState === "error"}
                    id="lastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "lastName", "last-name"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                  	Avg Service Time
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Avg Service Time"
                    id="avgServiceTime"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "avgServiceTime"),
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Email
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Email"
                    success={this.state.emailState === "success"}
                    error={this.state.emailState === "error"}
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "email", "email"),
                      type: "email"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Avg Customer Per Hour
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Avg Customer Per Hour"
                    id="avgCustomersPerHour"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "avgCustomersPerHour"),
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Email Preference
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomCheckbox 
                    value="IN" 
                    label="Individual Appointment Alert" 
                    onClick={event =>this.change(event, "emailPreference", "preference", 2)}
                    classes={classes}
                  />
                  <CustomCheckbox 
                    value="DS" 
                    label="Daily Summary" 
                    onClick={event =>this.change(event, "emailPreference", "preference", 2)}
                    classes={classes}
                  />
                  <CustomCheckbox 
                    value="WS" 
                    label="Weekly Summary" 
                    onClick={event =>this.change(event, "emailPreference", "preference", 2)}
                    classes={classes}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Enable WaitList
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomCheckbox 
                    value="" 
                    label="" 
                    onClick={event =>this.change(event, "enableWaitListAppointment", "waitlist")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Mobile
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Mobile No"
                    id="mobileNumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "mobileNumber"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Credentials
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Credentials"
                    id="credentials"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "credentials"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Is Open
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "isOpen", "isOpen")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
          	<Button color="rose" onClick={this.handleProvider.bind(this)}>
              Add Another Provider
            </Button>
            <Button color="rose" onClick={this.handleProvider.bind(this, "Save")}>
              Save & Exit
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
		)
	}
}

ProviderCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(validationFormStyle),
  connect(null, {createProvider}),
)(ProviderCreate);