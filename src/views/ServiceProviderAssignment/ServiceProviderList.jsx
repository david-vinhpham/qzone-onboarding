import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from '@material-ui/icons/Search';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import ArtTrack from '@material-ui/icons/ArtTrack';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { classesType } from 'types/global.js';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import listPageStyle from '../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';
import {
  deleteServiceProvider,
  fetchServiceProvidersByUserSub
} from '../../actions/serviceProvider.jsx';
import DeletionModal from '../../shared/deletion-modal';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ServiceProviderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedServiceProvider: {
        id: 0,
        isDel: false
      }
    };
  }

  componentDidMount() {
    let userInfo = localStorage.getItem('user');
    if (userInfo === null) {
      window.location = '/login';
    }
    let serviceProviders = localStorage.getItem('serviceProvider');
    serviceProviders = JSON.parse(serviceProviders);
    if (serviceProviders !== null && serviceProviders.length > 0) {
      this.setState({ data: serviceProviders });
    } else {
      const userSub = localStorage.getItem('userSub');
      this.props.fetchServiceProvidersByUserSub(userSub);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.serviceProviders });
    if (nextProps.serviceProviders != null && !nextProps.delServiceProviderLoading) {
      localStorage.setItem('serviceProvider', JSON.stringify(nextProps.serviceProviders));
    }
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedServiceProvider: data });
  };

  confirmDelete = id => {
    this.props.deleteServiceProvider(id);
    const data = {
      isDel: false
    };
    this.setState({ deletedServiceProvider: data });
  };

  deleteServiceProvider(id) {
    const data = {
      id,
      isDel: true
    };
    this.setState({ deletedServiceProvider: data });
  }

  render() {
    const {
      classes,
      fetchServiceProvidersLoading,
      fetchServiceProvidersError,
      delServiceProviderLoading,
      delServiceProviderError
    } = this.props;
    const { deletedServiceProvider } = this.state;
    let data = [];
    if (fetchServiceProvidersLoading) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchServiceProvidersLoading}
        />
      );
    }
    if (fetchServiceProvidersError) {
      return <div className="alert alert-danger">Error: {fetchServiceProvidersError}</div>;
    }
    if (delServiceProviderLoading) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={delServiceProviderLoading}
        />
      );
    }
    if (delServiceProviderError) {
      return <div className="alert alert-danger">Error: {delServiceProviderError}</div>;
    }

    data = (
      <GridContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Provider Capacity</TableCell>
              <TableCell>View|Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((serviceProvider, index) => (
              <TableRow key={serviceProvider.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{serviceProvider.serviceName}</TableCell>
                <TableCell>{serviceProvider.providerName}</TableCell>
                <TableCell>{serviceProvider.numberOfParallelCustomer}</TableCell>
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
                    <Link to={`/service-provider/edit/${serviceProvider.id}`}>
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
                      onClick={() => this.deleteServiceProvider(serviceProvider.id)}
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

    const deletionPopup = deletedServiceProvider.isDel ? (
      <DeletionModal
        openDialog={deletedServiceProvider.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedServiceProvider.id}
      />
    ) : null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Service Provider List</h4>
                </CardText>
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
                <Link to="/service-provider/create">
                  <Button size="sm" className={classes.buttonDisplay}>
                    New Service Provider
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

function mapStateToProps(state) {
  return {
    serviceProviders: state.serviceProvider.serviceProviders,
    fetchProvidersLoading: state.provider.fetchProvidersLoading,
    fetchProvidersError: state.provider.fetchProvidersError,
    fetchServiceProvidersLoading: state.serviceProvider.fetchServiceProvidersLoading,
    fetchServiceProvidersError: state.serviceProvider.fetchServiceProvidersError,
    delServiceProviderLoading: state.serviceProvider.delServiceProviderLoading,
    delServiceProviderError: state.delServiceProviderError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServiceProvidersByUserSub: userSub => dispatch(fetchServiceProvidersByUserSub(userSub)),
    deleteServiceProvider: id => dispatch(deleteServiceProvider(id))
  };
};

ServiceProviderList.propTypes = {
  serviceProviders: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchServiceProvidersLoading: PropTypes.bool.isRequired,
  fetchServiceProvidersError: PropTypes.string.isRequired,
  delServiceProviderLoading: PropTypes.bool.isRequired,
  delServiceProviderError: PropTypes.string.isRequired,
  fetchServiceProvidersByUserSub: PropTypes.func.isRequired,
  deleteServiceProvider: PropTypes.func.isRequired,
  classes: classesType.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ServiceProviderList);
