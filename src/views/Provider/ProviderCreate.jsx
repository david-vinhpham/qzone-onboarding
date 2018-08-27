import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from '../../actions/provider';
import {verifyLength, verifyEmail} from "../../validation/validation.jsx";
import ProviderForm from "./ProviderForm"

class ProviderCreate extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      provider:{
        firstName: "",
        lastName: "",
        avgserviceTime: "",
        externalProviderId: "",
        email: "",
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
      },
      firstNameState: "",
      lastNameState: "",
      emailState:"",

    };

    this.change = this.change.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
  }

  change(event, stateName,type){
    const { provider } = this.state
    provider[stateName]= (event.target.value || event.target.checked)
    this.setState({provider: provider})
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
      default:
        break;
    }
  }

  changeCheckbox(event, stateName,type){
    const { emailPreference } = this.state.provider;
    const currentIndex = emailPreference.indexOf(event.target.value);
    const newChecked = [...emailPreference];
    if (event.target.checked) {
      newChecked.push(event.target.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const {provider} = this.state
    provider['emailPreference']= newChecked
    this.setState({
      provider: provider
    });
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
        this.props.createProvider(this.state.provider, (response) => {
          window.location = "/provider/list";
        });
      }
      else{
        this.props.createProvider(this.state.provider, () => {
          window.location = "/provider/create"
        });
      }
    }
  }
	render() {
    const { classes } = this.props;
		return(
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Create Provider</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <ProviderForm providerInfo={this.state} change={this.change} changeCheckbox={this.changeCheckbox} classes={this.props.classes}/>
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