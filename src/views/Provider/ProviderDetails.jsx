import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// import Dvr from "@material-ui/icons/Dvr";
// import Favorite from "@material-ui/icons/Favorite";
// import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

// import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
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