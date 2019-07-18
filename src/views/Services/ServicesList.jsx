import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ArtTrack from '@material-ui/icons/ArtTrack';
import { Link } from 'react-router-dom';
import Search from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { classesType } from 'types/global.js';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from 'assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';
import { deleteService, fetchServicesByBusinessAdminId } from '../../actions/service';
import DeletionModal from '../../shared/deletion-modal';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class ServicesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      imageLoadError: true,
      deletedService: {
        id: 0,
        isDel: false
      }
    };
  }

  componentDidMount() {
    let servicesCached = localStorage.getItem('serviceCached');
    servicesCached = JSON.parse(servicesCached);
    if (servicesCached !== null && servicesCached.length > 0) {
      this.setState({ data: servicesCached });
    } else {
      const businessAdminId = localStorage.getItem('userSub');
      if (businessAdminId) {
        this.props.getServicesByBusinessAdminId(businessAdminId);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services != null && !nextProps.delServiceLoading) {
      this.setState({ data: nextProps.services });
      localStorage.setItem('serviceCached', JSON.stringify(nextProps.services));
    }
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedService: data });
  };

  confirmDelete = serviceId => {
    this.props.deleteService(serviceId);
    const data = {
      isDel: false
    };
    this.setState({ deletedService: data });
  };

  deleteService(serviceId) {
    const data = {
      id: serviceId,
      isDel: true
    };
    this.setState({ deletedService: data });
  }

  render() {
    const { classes, fetchServicesLoading, fetchServiceError, services } = this.props;
    const { deletedService } = this.state;
    let data = [];
    if (fetchServicesLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchServicesLoading}
        />
      );
    }
    if (fetchServiceError) {
      return <div className="alert alert-danger">Error: {services}</div>;
    }

    data = (
      <GridContainer>
        <Table aria-labelledby="servicesList">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Service Mode</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>BookingHorizon</TableCell>
              <TableCell>View|Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((service, index) => (
              <TableRow key={service.id} classes={{ root: classes.row }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.mode}</TableCell>
                <TableCell>{`${service.description.substring(0, 150)}...`}</TableCell>
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
                      <Button color="success" simple justIcon>
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
                      onClick={() => this.deleteService(service.id)}
                      color="danger"
                      simple
                      justIcon
                    >
                      <Delete className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GridContainer>
    );

    const deletionPopup = deletedService.isDel ? (
      <DeletionModal
        openDialog={deletedService.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedService.id}
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
                <div>
                  <CustomInput
                    formControlProps={{
                      className: `${classes.top} ${classes.search}`
                    }}
                    inputProps={{
                      placeholder: 'Search',
                      inputProps: {
                        'aria-label': 'Search',
                        className: classes.searchInput
                      }
                    }}
                  />
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round>
                    <Search />
                  </Button>
                </div>
                <Link to="/services/create">
                  <Button size="sm" className={classes.buttonDisplay}>
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

const mapStateToProps = state => {
  return {
    services: state.service.services,
    fetchServicesLoading: state.service.fetchServicesLoading,
    fetchServiceError: state.service.fetchServiceError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServicesByBusinessAdminId: businessAdminId =>
      dispatch(fetchServicesByBusinessAdminId(businessAdminId)),
    deleteService: id => dispatch(deleteService(id))
  };
};

ServicesList.propTypes = {
  getServicesByBusinessAdminId: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchServicesLoading: PropTypes.bool.isRequired,
  fetchServiceError: PropTypes.string.isRequired,
  delServiceLoading: PropTypes.bool.isRequired,
  classes: classesType.isRequired
};

export default compose(
  withStyles({...tableStyle, ...listPageStyle}),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ServicesList);
