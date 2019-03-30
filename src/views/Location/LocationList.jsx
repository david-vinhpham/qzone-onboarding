import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { fetchLocations, delLocation } from '../../actions/location';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx"

import priceImage1 from '../../assets/img/location.png';

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  deleteLocation(locationId) {
    console.log("Delete a location: " + locationId);
    this.props.delLocation(locationId, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.locations != null) {
      this.setState({ data: nextProps.locations })
    }
  }

  render() {
    const { classes } = this.props;
    if (!this.state.data)
      return null;
    return (
      <div id="geo-location-id">
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose" md={3}>
                  <h4 className={classes.cardTitle}>Location List</h4>
                </CardText>
                <div className="centerDiv" md={3}>
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
                </div>
                <Link to={`/location/create`}>
                  <Button size="sm" className={classes.buttonDisplay} md={3}>
                    New Location
                                    </Button>
                </Link>

              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {this.state.data.map((location, index) => {
            return (
              <GridItem xs={12} sm={12} md={3}>
                <Card product className={classes.cardHover} >
                  <CardHeader image className={classes.cardHeaderHover}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={priceImage1} alt="..." />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <div className={classes.cardHoverUnder}>
                      <Tooltip
                        id="tooltip-top"
                        title="Remove"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          onClick={e => this.deleteLocation(location.id)}
                          color="danger"
                          simple
                          justIcon>
                          <Delete className={classes.underChartIcons} />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        id="tooltip-top"
                        title={location.id}
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Link to={`/location/edit/${location.id}`}>
                          <Button color="success" simple justIcon >
                            <Edit className={classes.underChartIcons} />
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>

                    <h4 className={classes.cardProductTitle}>
                      {location.streetAddress}
                    </h4>
                    <p className={classes.cardProductDesciprion}>
                      {location.city}
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
            )
          })}
        </GridContainer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { locations: state.location.locations };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocations: () => dispatch(fetchLocations()),
    delLocation: (id, history) => dispatch(delLocation(id, history)),
  }
}

export default compose(
  withStyles(listPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LocationList);
