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
import { fetchProviders } from 'actions/provider';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
const columns=[
  {
    Header: "Id",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "firstName"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Mobile",
    accessor: "mobileNumber"
  },
  {
    Header: "Avg Service Time",
    accessor: "avgServiceTime"
  },
  {
    Header: "Current Wait Time",
    accessor: "current_wait_time"
  }
]
class ProviderDetails extends React.Component{
	
  componentWillMount(){
  	this.props.fetchProviders()
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
		            data={this.props.providerLists}
		            filterable
		            columns={columns}
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

function mapStateToProps(state) {
	return{providerLists: state.providers.data}
}  

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {fetchProviders}),
)(ProviderDetails);
