import React from "react";
import ReactTable from "react-table";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";

const columns=[
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Tkt Prefix",
    accessor: "tkt_prefix"
  },
  {
    Header: "Service Mode",
    accessor: "service_mode"
  },
  {
    Header: "Avg Service Time",
    accessor: "avg_service_time"
  },
  {
    Header: "Avg Customers/Hour",
    accessor: "avg_customers_per_hour"
  },
  {
    Header: "Avg Provider Count",
    accessor: "avg_provider_count"
  },
  {
    Header: "Avg Wait Time",
    accessor: "avg_wait_time"
  }
]
class ServicesList extends React.Component{
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
             <CardText color="rose">
                <h4 className={classes.cardTitle}>Service List</h4>
              </CardText>
              <Button size="sm"  className={classes.buttonDisplay} href="/services/create"> 
                New Service
              </Button>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={ columns }
                defaultPageSize={2}
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

export default withStyles(listPageStyle)(ServicesList);