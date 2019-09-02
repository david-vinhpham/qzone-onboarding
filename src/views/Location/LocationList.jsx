import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from '@material-ui/icons/Search';
import withStyles from '@material-ui/core/styles/withStyles';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import { classesType, historyType } from 'types/global.js';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import { fetchLocations, delLocation } from '../../actions/location';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import listPageStyle from '../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Paper } from "@material-ui/core";
import DeletionModal from "../../shared/deletion-modal";

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedLocation: {
        id: 0,
        isDel: false
      }
    };
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedLocation: data });
  };

  confirmDelete = locationId => {
    this.props.delLocation(locationId);
    const data = {
      isDel: false
    };
    this.setState({ deletedLocation: data });
  };

  deleteLocation(locationId) {
    const data = {
      id: locationId,
      isDel: true
    };
    this.setState({ deletedLocation: data });
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  render() {
    const {
      classes,
      fetchLocationsLoading,
      fetchLocationError,
      delLoadingLoading,
      delLocationError,
      locations
    } = this.props;
    const { deletedLocation } = this.state;

    if (fetchLocationsLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchLocationsLoading}
        />
      );
    }

    if (fetchLocationError || delLocationError) {
      return <div className="alert alert-danger">Error</div>;
    }

    if (delLoadingLoading) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={delLoadingLoading}
        />
      );
    }

    const data = (
      <Paper>
        <Table aria-labelledby="Location List">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>state</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Edit|Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location, index) => (
              <TableRow key={location.id} classes={{ root: classes.row }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{location.streetAddress}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell>
                  <Link to={`/location/edit/${location.id}`}>
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
                    onClick={() => this.deleteLocation(location.id)}
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

    const deletionPopup = deletedLocation.isDel && (
      <DeletionModal
        openDialog={deletedLocation.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedLocation.id}
      />
    );

    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Location List</h4>
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
                <Link to="/location/create">
                  <Button size="sm" className={classes.buttonDisplay}>
                    New Location
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
    locations: state.location.locations,
    fetchLocationLoading: state.location.fetchLocationLoading,
    fetchLocationError: state.location.fetchLocationError,
    delLocationLoading: state.location.delLocationLoading,
    delLocationError: state.location.delLocationError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations()),
    delLocation: (id) => dispatch(delLocation(id))
  };
};

LocationList.propTypes = {
  classes: classesType.isRequired,
  delLocation: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: historyType.isRequired,
  fetchLocationLoading: PropTypes.bool.isRequired,
  fetchLocationError: PropTypes.string.isRequired,
  delLocationLoading: PropTypes.bool.isRequired,
  delLocationError: PropTypes.string.isRequired
};

export default compose(
  withStyles(listPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LocationList);
