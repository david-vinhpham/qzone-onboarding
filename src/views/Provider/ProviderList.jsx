import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from '@material-ui/icons/Search';
import withStyles from '@material-ui/core/styles/withStyles';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Paper } from '@material-ui/core';
import { classesType, providerType } from 'types/global.js';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import { deleteProvider, fetchProvidersByBusinessAdminId } from '../../actions/provider';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from 'assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';
import DeletionModal from '../../shared/deletion-modal';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class ProviderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedProvider: {
        id: 0,
        isDel: false
      }
    };
  }

  componentDidMount() {
    const sub = localStorage.getItem('userSub');
    if (sub) {
      this.props.fetchProvidersByBusinessAdminId(sub);
    }
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedProvider: data });
  };

  confirmDelete = providerId => {
    this.props.deleteProvider(providerId);
    const data = {
      isDel: false
    };
    this.setState({ deletedProvider: data });
  };

  deleteProvider(providerId) {
    const data = {
      id: providerId,
      isDel: true
    };
    this.setState({ deletedProvider: data });
  }

  render() {
    const {
      classes,
      fetchProvidersLoading,
      fetchProviderError,
      delProviderLoading,
      delProviderError,
      providers
    } = this.props;
    const { deletedProvider } = this.state;

    if (fetchProvidersLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchProvidersLoading}
        />
      );
    }
    if (fetchProviderError) {
      return <div className="alert alert-danger">Error</div>;
    }
    if (delProviderLoading) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={delProviderLoading}
        />
      );
    }
    if (delProviderError) {
      return <div className="alert alert-danger">Error</div>;
    }

    const data = (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Email</TableCell>
             {/* <TableCell>description</TableCell>*/}
              <TableCell>Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map((provider, index) => (
              <TableRow key={provider.id} classes={{ root: classes.row }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{provider.givenName}</TableCell>
                <TableCell>{provider.telephone}</TableCell>
                <TableCell>{provider.email}</TableCell>
              {/*  <TableCell>
                  {provider.providerInformation.description !== null
                    ? provider.providerInformation.description.substring(0, 150)
                    : ''}
                </TableCell>*/}
                <TableCell>
                  <Link to={`/provider/edit/${provider.id}`}>
                    <Button color="success" simple justIcon>
                      <Tooltip
                        id="tooltip-top"
                        title="Edit"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Edit />
                      </Tooltip>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.deleteProvider(provider.id)}
                    color="danger"
                    simple
                    justIcon
                  >
                    <Tooltip
                      id="tooltip-top"
                      title="Remove"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Delete />
                    </Tooltip>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    const deletionPopup = deletedProvider.isDel ? (
      <DeletionModal
        openDialog={deletedProvider.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedProvider.id}
      />
    ) : null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Provider List</h4>
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
                <Link to="/provider/create">
                  <Button size="sm" className={classes.buttonDisplay}>
                    New Provider
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
    providers: state.provider.providers,
    fetchProvidersLoading: state.provider.fetchProvidersLoading,
    fetchProvidersError: state.provider.fetchProvidersError,
    delProviderLoading: state.provider.delProviderLoading,
    delProviderError: state.provider.delProviderError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProvidersByBusinessAdminId: sub => dispatch(fetchProvidersByBusinessAdminId(sub)),
    deleteProvider: id => dispatch(deleteProvider(id))
  };
};

ProviderList.propTypes = {
  fetchProvidersByBusinessAdminId: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(providerType).isRequired,
  classes: classesType.isRequired,
  fetchProvidersLoading: PropTypes.bool.isRequired,
  fetchProviderError: PropTypes.string,
  delProviderLoading: PropTypes.bool.isRequired,
  delProviderError: PropTypes.string
};

ProviderList.defaultProps = {
  fetchProviderError: null,
  delProviderError: null,
}

export default compose(
  withStyles({ ...tableStyle, ...listPageStyle }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProviderList);
