import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import ArtTrack from "@material-ui/icons/ArtTrack";
import {Link} from 'react-router-dom';
import Search from "@material-ui/icons/Search";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ClipLoader} from 'react-spinners';
import {css} from '@emotion/core';
import {Table, TableBody, TableCell, TableHead, TableRow,} from '@material-ui/core';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import {deleteService, fetchServicesByBusinessAdminId} from '../../actions/service';
import DeletionModal from '../../shared/deletion-modal';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ServicesList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imageLoadError: true,
      deleteService: {
        id: 0,
        isDel:false,
      }
    }
  }

  deleteService(serviceId) {
    console.log("deleteService a serviceId: " + serviceId);
    let data = {
      id: serviceId,
      isDel:true,
    };
    this.setState({ deleteService: data });
  }
  cancelDelete = () => {
    let data = {
      isDel:false,
    };
    this.setState({ deleteService: data });
  };
  confirmDelete = (serviceId) => {
    this.props.deleteService(serviceId);
    let data = {
      isDel:false,
    };
    this.setState({ deleteService: data });
  };
  componentWillReceiveProps(nextProps) {
    if( nextProps.services != null) {
      this.setState({data: nextProps.services});
      localStorage.setItem('serviceCached', JSON.stringify(nextProps.services));
    }
  }

  componentDidMount() {
    let servicesCached = localStorage.getItem('serviceCached');
    servicesCached = JSON.parse(servicesCached);
    if(servicesCached !== null && servicesCached.length > 0) {
      console.log('get from cached data');
      this.setState({ data: servicesCached });
    }
    else {
      let businessAdminId = localStorage.getItem('userSub');
      this.props.getServicesByBusinessAdminId(businessAdminId);
    }
  }
  render() {
    const {
      classes,
      fetchServicesLoading,
      fetchServiceError,
      services,
    } = this.props;
    const {
      deleteService
    } = this.state;
    let data = [];
    if(fetchServicesLoading) {
      return < ClipLoader
        className={override}
        sizeUnit={"px"}
        size={70}
        color={'#123abc'}
        loading={fetchServicesLoading}
      />;
    }
    else if (fetchServiceError) {
      return <div className="alert alert-danger">Error: {services}</div>
    }
    else {
        data = (
        <GridContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>
                  Service Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Organization
                </TableCell>
                <TableCell>
                  BookingHorizon
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description.substring(0,150) + "..."}</TableCell>
                  <TableCell>{service.organizationEntity.name}</TableCell>
                  <TableCell>{service.bookingHorizon}</TableCell>
                  <TableCell>
                    <Tooltip
                      id="tooltip-top"
                      title="View"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button color="transparent" simple justIcon>
                        <ArtTrack className={classes.underChartIcons} />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Link to={`/service/edit/${service.id}`}>
                        <Button color="success" simple justIcon >
                          <Edit className={classes.underChartIcons} />
                        </Button>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Remove"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        onClick = {e => this.deleteService(service.id)}
                        color="danger"
                        simple
                        justIcon>
                        <Delete className={classes.underChartIcons} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GridContainer>
      )
    }
    const deletionPopup = deleteService.isDel ? (
      <DeletionModal
        openDialog={deleteService.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deleteService.id}
      />
    ) : null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Service List</h4>
                </CardText>
                <div className="centerDiv">
                  <div className="search" md={3}>
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
                </div>
                <Link to={`/services/create`}>
                  <Button size="sm" className={classes.buttonDisplay} >
                    New Service
                  </Button>
                </Link>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        {data}
        {deletionPopup}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.service.services,
    fetchServicesLoading: state.service.fetchServicesLoading,
    fetchServiceError: state.service.fetchServiceError,
    isShowPopup: state.service.isShowPopup,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getServicesByBusinessAdminId: (businessAdminId) => dispatch(fetchServicesByBusinessAdminId(businessAdminId)),
    deleteService:(id) => dispatch(deleteService(id)),
  }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ServicesList);
