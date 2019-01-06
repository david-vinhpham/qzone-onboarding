import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import ArtTrack from "@material-ui/icons/ArtTrack";
import { Link } from 'react-router-dom';
import Search from "@material-ui/icons/Search";
import { connect } from 'react-redux';
import { compose } from 'redux';

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import priceImage1 from "../../assets/img/faces/profile.jpg";
import { getServicesByOrganization } from '../../actions/service';

class ServicesList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      imageLoadError: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.services })
  }

  componentDidMount() {
    this.props.getServicesByOrganization()
  }
  render() {
    const { 
      classes,
      services,
      serviceError,
      serviceLoading 
    } = this.props;

    if(!this.state.data ) {
      return null;
    }
    let self = this;
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
        <GridContainer>
          {this.state.data.map((service, index) => {
            return (
              <GridItem xs={12} sm={12} md={3}>
                <Card product className={classes.cardHover} >
                  <CardHeader image className={classes.cardHeaderHover}>
                    <a>
                      <img 
                        src={service.image.fileUrl} 
                        onError={e => { 
                          if(self.state.imageLoadError) { 
                            self.setState({
                                imageLoadError: false
                            });
                            e.target.src = priceImage1;
                          }   
                        }
                      }
                      />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <div className={classes.cardHoverUnder}>
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
                        title="Remove"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          color="danger"
                          simple
                          justIcon>
                          <Delete className={classes.underChartIcons} />
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
                    </div>
                    <h4 className={classes.cardProductTitle}>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {service.name}
                      </a>
                    </h4>
                    <p className={classes.cardProductDesciprion}>
                      {service.description}
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

const mapStateToProps = (state) => {
  return {
    services: state.service.getService,
    serviceLoading: state.service.getServiceLoading,
    serviceError: state.service.getServiceError

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getServicesByOrganization: () => dispatch(getServicesByOrganization()),
  }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ServicesList);
