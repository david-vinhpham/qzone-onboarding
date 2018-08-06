import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";

class BusinessDetails extends React.Component{

	handleEdit(){
    window.location = "/business/edit"		
	}
	render() {
		const { classes } = this.props;
	  return (
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Assignment />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Show Business Details</h4>
        </CardHeader>
        <CardBody>
        	<GridContainer>
            <GridItem xs={12} sm={3}>
              <b>Name:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Custweb Link:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Address1:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Service Type:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Address2:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Join Queue via Mobile:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>City:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Join Queue via Mobile:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>State:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Provider Selection:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Zip:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Waitlist Enabled:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Country:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Store Customer Service History:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Telephone:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Notification Window:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <b>Category:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>         
            <GridItem xs={12} sm={3}>
              <b>Smart Notification:</b>
            </GridItem>
            <GridItem xs={12} sm={3}>
              <p>
              	
              </p>
            </GridItem>
        	</GridContainer>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
        	<Button color="rose" onClick={this.handleEdit.bind(this)}>
          	Edit
          </Button>
          <Button color="rose">
            Delete
          </Button>
        </CardFooter>
      </Card>
	     
	  );
	}
}


BusinessDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(gridSystemStyle)(BusinessDetails);