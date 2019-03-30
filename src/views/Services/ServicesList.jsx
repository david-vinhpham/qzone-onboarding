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
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import { fetchServicesByBusinessAdminId } from '../../actions/service';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ServicesList extends React.Component {
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
    let businessAdminId = localStorage.getItem('userSub');
    this.props.getServicesByBusinessAdminId(businessAdminId)
  }
  render() {
    const {
      classes,
      fetchServicesLoading,
      fetchServiceError,
      services,
    } = this.props;
    let data = [];
    if (fetchServicesLoading) {
      return < ClipLoader
        css={override}
        sizeUnit={"px"}
        size={100}
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
          {this.state.data.map((service, index) => {
            return (
              <GridItem xs={12} sm={12} md={3}>
                <Card product >
                  {/* <CardHeader image className={classes.cardHeaderHover}>

                      <img
                        alt=''
                        src={service.image ? service.image.fileUrl : null}
                        onError={e => {
                          if(self.state.imageLoadError) {
                            self.setState({
                                imageLoadError: false
                            });
                            e.target.src = priceImage1;

                          }
                          this.setState({imageLoadError: true})
                        }}
                      />

                  </CardHeader> */}
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
                        {service.organizationEntity && service.organizationEntity.name}
                      </a>
                    </h4>
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
      )
    }
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.service.services,
    fetchServicesLoading: state.service.fetchServicesLoading,
    fetchServiceError: state.service.fetchServiceError
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getServicesByBusinessAdminId: (businessAdminId) => dispatch(fetchServicesByBusinessAdminId(businessAdminId)),
  }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ServicesList);
