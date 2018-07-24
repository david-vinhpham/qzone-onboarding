import React from "react";
import ReactTable from "react-table";
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  buttonDisplay:{
  	position: "absolute",
    right: 0,
    top: 10,
    backgroundColor: "#8e24aa",
    "&:hover,&:focus": {
      backgroundColor: "#8e24aa"
    }
  }

};

class ProviderDetails extends React.Component{
	constructor(props) {
    super(props);
    this.state = { data: []}
  }
	render() {
		const { classes } = this.props;
		return (
		  <GridContainer>
		    <GridItem xs={12}>
		      <Card>
		        <CardHeader color="primary" icon>
		          <CardIcon color="primary">
		            <Assignment />
		          </CardIcon>
		          <h4 className={classes.cardIconTitle}>Provider List</h4>
		          <Button size="sm" href="/provider/create" className={classes.buttonDisplay}> 
                New Provider
              </Button>
		        </CardHeader>
		        <CardBody>
		          <ReactTable
		            data={this.state.data}
		            filterable
		            columns={[
		              {
		                Header: "Id",
		                accessor: "id"
		              },
		              {
		                Header: "Name",
		                accessor: "name"
		              },
		              {
		                Header: "Email",
		                accessor: "email"
		              },
		              {
		                Header: "Mobile",
		                accessor: "mobile"
		              },
		              {
		                Header: "Avg Service Time",
		                accessor: "avg_service_time"
		              },
		              {
		                Header: "Current Wait Time",
		                accessor: "current_wait_time"
		              }
		            ]}
		            defaultPageSize={10}
		            showPaginationTop
		            showPaginationBottom={false}
		            className="-striped -highlight"
		          />
		        </CardBody>
		      </Card>
		    </GridItem>
		  </GridContainer>
		);
	}
}

export default withStyles(styles)(ProviderDetails);