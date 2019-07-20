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

import {BeatLoader} from "react-spinners";
import {css} from "@emotion/core";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ArtTrack from "@material-ui/core/SvgIcon/SvgIcon";
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
      data: [],
      deletedLocation: {
        id: 0,
        isDel: false
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locations != null) {
      this.setState({ data: nextProps.locations });
    }
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
      delLocationError
    } = this.props;
    let data = [];
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
    if (fetchLocationError) {
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
    if (delLocationError) {
      return <div className="alert alert-danger">Error</div>;
    }
    data = (
      <GridContainer>
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
            {this.state.data.map((location, index) => (
              <TableRow key={location.id} classes={{ root: classes.row }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{location.streetAddress}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>{location.country}</TableCell>
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
                    <Link to={`/location/edit/${location.id}`}>
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
                      onClick={() => this.deleteLocation(location.id)}
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

    const deletionPopup = deletedLocation.isDel ? (
      <DeletionModal
        openDialog={deletedLocation.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedLocation.id}
      />
    ) : null;
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
  return { locations: state.location.locations,
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
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
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
