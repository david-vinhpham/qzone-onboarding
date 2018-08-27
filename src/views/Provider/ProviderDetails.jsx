import React from "react";
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { fetchProviders } from '../../actions/provider';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx"

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
  },
  {
    Cell: ({row}) => (<Link to={`/provider/edit/${row.id}`}>Edit</Link>),
  }

]

class ProviderDetails extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.providerLists})
  }

  componentDidMount(){
    this.props.fetchProviders()
  }

    render() {
      const { classes } = this.props;
      if(!this.state.data)
        return null;
      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Provider List</h4>
              </CardText>
              <div className="search">
                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Search",
                    inputProps: {
                      "aria-label": "Search",
                      className: classes.searchInput
                    }
                  }}
                />
                <Button
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={classes.top + " " + classes.searchButton} >
                  <Search
                    className={classes.headerLinksSvg + " " + classes.searchIcon}
                  />
                </Button>
              </div>
              <Button size="sm" href="/provider/create" className={classes.buttonDisplay}> 
                New Provider
              </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
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
  withStyles(listPageStyle),
  connect(mapStateToProps, {fetchProviders}),
)(ProviderDetails);
