import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import _ from 'lodash';

import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from '../../actions/provider';
import ServiceForm from './ServiceForm';
import defaultImage from "../../assets/img/default-avatar.png";

class ServiceCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			standardName: "",
			name: "",
			nameState: "",
			avgServiceTime: "",
			tktPrefix: "",
			serviceMode: null,
			avgCustomersPerHour: "",
			avgProviderCount: "",
			avgServiceTimeState: "",
			file: null,
			imagePreviewUrl: defaultImage
		}
	}

	handleService(option){
		if (_.isEmpty(this.state.name))
  		this.setState({nameState: "error"})
  	if (_.isEmpty(this.state.avgServiceTime))
  		this.setState({avgServiceTimeState: "error"})

 		if (this.state.nameState === "success" && this.state.avgServiceTimeState === "success" ){
      if (option === "Save"){
        window.location = "/services/list"
        
      }
      else{
        window.location = "/services/create"
        
      }
    }
	}

	changeProfileImage(e) {
		//const {file, imagePreviewUrl} = this.state.provider;
		console.log("inside change image function", e);
		console.log("event---", e)
		e.preventDefault();
		let reader = new FileReader();
		let files = e.target.files[0];
		const { provider } = this.state
		console.log("file-------", files)
		reader.onloadend = () => {
			provider['file'] = files
			provider['imagePreviewUrl'] = reader.result
			this.setState({
				// file: file,
				// imagePreviewUrl: reader.result
				provider: provider
			});
		};
		reader.readAsDataURL(files);
	}


	change(event, stateName){
		if (_.isEmpty(event.target.value))
  		this.setState({[stateName + "State"]: "error"})
  	else {
      this.setState({ [stateName + "State"]: "success" });
    }
		this.setState({[stateName]: (event.target.value || event.target.checked)})
	}

	render(){
		const { classes } = this.props;
		
		return(
			<GridItem xs={12} sm={12} md={12}>
			  <Card>
			    <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Add a Service</h4>
            </CardText>
          </CardHeader>
			    <CardBody>
            <ServiceForm 
              serviceInfo={this.state}
              change={this.change}
              classes={this.props.classes}
            />
			    </CardBody>
			    <CardFooter className={classes.justifyContentCenter}>
          	<Button color="rose" onClick={this.handleService.bind(this)}>
              Add Another Service
            </Button>
            <Button color="rose" onClick={this.handleService.bind(this,"save")}>
              Save & Exit
            </Button>
          </CardFooter>
			  </Card>
			</GridItem>
		);
	}
}

ServiceCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(validationFormStyle),
  connect(null, {createProvider}),
)(ServiceCreate);