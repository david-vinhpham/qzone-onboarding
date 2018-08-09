import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, Input, InputLabel, MenuItem, FormControl, Select }  from "@material-ui/core";  
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomRadio from 'components/CustomRadio/CustomRadio.jsx';
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from 'actions/provider';
import _ from 'lodash';

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
			avgServiceTimeState: ""
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
		const standardNames = [
		  'Oliver Hansen',
		  'Van Henry',
		  'April Tucker',
		  'Ralph Hubbard',
		  'Omar Alexander',
		  'Carlos Abbott',
		  'Miriam Wagner',
		  'Bradley Wilkerson',
		  'Virginia Andrews',
		  'Kelly Snyder',
		];
		return(
			<GridItem xs={12} sm={12} md={12}>
			  <Card>
			    <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Add a Service</h4>
            </CardText>
          </CardHeader>
			    <CardBody>
			    	<form>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>             
                    Standard Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                    >
                      Choose Standard Name
                    </InputLabel>
                    <Select
                      value={this.state.standardName}
                      onChange={event =>
                      	this.change(event, "standardName")}
                    >
                      
                      {standardNames.map(standardName => (
                        <MenuItem
                          key={standardName}
                          value={standardName}
                          
                        >
                          {standardName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Name"
                    success={this.state.nameState === "success"}
                    error={this.state.nameState === "error"}
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "name"),
                      type: "text"
                    }}
                  />
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                  	*Avg Service Time
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Avg Service Time"
                    success={this.state.avgServiceTimeState === "success"}
                    error={this.state.avgServiceTimeState === "error"}
                    id="avgServiceTime"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "avgServiceTime"),
                      type: "number",
                      min: "5"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tkt Prefix
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Tkt Prefix"
                    id="tktPrefix"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "tktPrefix"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              	<GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Service Mode
                	</FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                	<CustomRadio 
                		checkedValue={this.state.serviceMode}
                		label="Queue" 
                		value="queue" 
                		classes={classes} 
                		onClick={event =>
            					this.change(event, "serviceMode")}/>
                </GridItem>
                <GridItem xs={12} sm={2}>
                	<CustomRadio 
                		checkedValue={this.state.serviceMode}
                		label="Appointment" 
                		value="appointment" 
                		classes={classes} 
                		onClick={event =>
            					this.change(event, "serviceMode")}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Avg Customers Per Hour
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Avg Customers Per Hour"
                    id="avgCustomersPerHour"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "avgCustomersPerHour"),
                      type: "number",
                      min: "0"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Avg Provider Count
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Avg Provider Count"
                    id="avgProviderCount"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "avgProviderCount"),
                      type: "number",
                      min: "0"
                    }}
                  />
                </GridItem>
              </GridContainer>

            </form>
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