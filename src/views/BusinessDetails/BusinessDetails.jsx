import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardText from "../../components/Card/CardText.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import gridSystemStyle from "../../assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";

class BusinessDetails extends React.Component{

	render() {
		const { classes } = this.props;
	  return (
      <Card>
        <CardHeader color="rose" icon>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Show Business Details</h4>
          </CardText>
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
        	<Button color="rose" href="/business/edit">
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