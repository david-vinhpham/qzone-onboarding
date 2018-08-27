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
import { fetchProvider, createProvider } from '../../actions/provider';
import {verifyLength, verifyEmail} from "../../validation/validation.jsx"
import ProviderForm from "./ProviderForm"

class ProviderEdit extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      provider: {
        firstName: "",
        lastName: "",
        externalProviderId: "",
        avgserviceTime: "",
        email: "",
        mobileNumber: "",
        credentials:"",
        emailPreference: [],
        enableWaitListAppointment: "",
        isOpen: "",
        createdBy: "",
        createdOn: "",
        isDeleted: false,
        updatedBy: "",
        updatedOn: "",
        id: "",
        avgCustomersPerHour: "",
        
      },
      firstNameState: "",
      lastNameState: "",
      emailState:"",

    };

    this.change = this.change.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
  }

  componentWillMount(){
    const { id } = this.props.match.params
    this.props.fetchProvider(id);
  }

  componentWillReceiveProps(nextProps) {
    const { provider } = this.state;
    for(var key in nextProps.provider) {
      provider[key]= nextProps.provider[key]
      this.setState({provider: provider})
    };
    
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

  handleUpdate(option) {
  	if (this.state.provider.firstName === "")
  		this.setState({firstNameState: "error"})
    else
      this.setState({firstNameState: "success"})

  	if (this.state.provider.lastName === "")
  		this.setState({lastNameState: "error"})
    else 
      this.setState({lastNameState: "success"})
    if (this.state.provider.email === "") 
      this.setState({ emailState: "error" });
    else
      this.setState({emailState: "success"})
    
  	if (this.state.firstNameState === "success" && this.state.lastNameState === "success" && this.state.emailState === "success"){
      this.props.createProvider(this.state.provider, () => {
        window.location = "/provider/list"
      });
      
    }
  }

  changeCheckbox(event, stateName,type){
    const { emailPreference } = this.state.provider;
    const currentIndex = emailPreference.indexOf(event.target.value || '') ;
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

	render() {
    const { classes } = this.props;
    if(!this.state.provider)
      return null;
		return(
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Edit Provider</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <ProviderForm providerInfo={this.state} change={this.change} changeCheckbox={this.changeCheckbox} classes={this.props.classes}/>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
        	<Button color="rose" onClick={this.handleUpdate.bind(this)}>
            Update
          </Button>
        </CardFooter>
      </Card>
		)
	}
}

ProviderEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{provider: state.providers.data}
} 

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, {fetchProvider, createProvider}),
)(ProviderEdit);