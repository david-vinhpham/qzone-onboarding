import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from '@material-ui/icons/Search';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import ArtTrack from '@material-ui/icons/ArtTrack';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
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
      deleteServiceProvider: {
        id: 0,
        isDel: false
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.serviceProviders });
    if (nextProps.serviceProviders != null && !nextProps.delServiceProviderLoading) {
      localStorage.setItem('serviceProvider', JSON.stringify(nextProps.serviceProviders));
    }
  }

  deleteServiceProvider(id) {
    console.log(`deleteProvider a id: ${id}`);
    const data = {
      id,
      isDel: true
    };
    this.setState({ deleteServiceProvider: data });
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deleteServiceProvider: data });
  };

  confirmDelete = id => {
    this.props.deleteServiceProvider(id);
    const data = {
      isDel: false
    };
    this.setState({ deleteServiceProvider: data });
  };

  componentDidMount() {
    let serviceProviders = localStorage.getItem('serviceProvider');
    serviceProviders = JSON.parse(serviceProviders);
    if (serviceProviders !== null && serviceProviders.length > 0) {
      this.setState({ data: serviceProviders });
    } else {
      const userSub = localStorage.getItem('userSub');
      this.props.fetchServiceProvidersByUserSub(userSub);
    }
  }

  render() {
    const {
      classes,
      fetchServiceProvidersLoading,
      fetchServiceProvidersError,
      delServiceProviderLoading,
      delServiceProviderError
    } = this.props;
    const { deleteServiceProvider } = this.state;
    let data = [];
    if (fetchServiceProvidersLoading) {
      return (
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
          loading={fetchServiceProvidersLoading}
        />
      );
    }
    if (fetchServiceProvidersError) {
      return <div className="alert alert-danger">Error: {fetchServiceProvidersError}</div>;
    }
    if (delServiceProviderLoading) {
      return (
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
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
                      onClick={e => this.deleteServiceProvider(serviceProvider.id)}
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

    const deletionPopup = deleteServiceProvider.isDel ? (
      <DeletionModal
        openDialog={deleteServiceProvider.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deleteServiceProvider.id}
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
                <div className="centerDiv">
                  <div className="search" md={3}>
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
                      round
                      className={`${classes.top} ${classes.searchButton}`}
                    >
                      <Search className={`${classes.headerLinksSvg} ${classes.searchIcon}`} />
                    </Button>
                  </div>
                </div>
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

export default compose(
  withStyles(listPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ServiceProviderList);
