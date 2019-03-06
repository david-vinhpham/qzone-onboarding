import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Search from "@material-ui/icons/Search";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import {ClipLoader} from 'react-spinners';
import {css} from '@emotion/core';

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx"
import {fetchServiceProvidersByUserSub} from "../../actions/serviceProvider.jsx";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class ServiceProviderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.serviceProviders })
  }

  componentDidMount() {
    var userSub = localStorage.getItem('userSub');
    this.props.fetchServiceProvidersByUserSub(userSub);
  }

  render() {
    const { classes, serviceProviderLoading } = this.props;
    let data = null
    if(!this.state.data || this.state.data.length === 0) {
      return < ClipLoader
        className={override}
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={serviceProviderLoading}
      />;
    } else {
      data = (
        <GridContainer>
          {this.state.data.map((serviceProvider, index) => {
            return (
              <GridItem xs={12} sm={12} md={3}>
                <Card product className={classes.cardHover} >
                  {/* <CardHeader image className={classes.cardHeaderHover}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={priceImage1} alt="..." />
                    </a>
                  </CardHeader> */}
                  <CardBody>
                    <div className={classes.cardHoverUnder}>
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
                        <Link to={`/service-provider/edit/${serviceProvider.id}`}>
                          <Button color="success" simple justIcon >
                            <Edit className={classes.underChartIcons} />
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>
                    <h4 className={classes.cardProductTitle}>
                      {serviceProvider.serviceEntity.organizationEntity.name}
                    </h4>
                    <h4 className={classes.cardProductTitle}>
                      {serviceProvider.serviceEntity.name}
                    </h4>
                    <p className={classes.cardProductDesciprion}>
                      {serviceProvider.providerEntity.givenName}
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
                  <h4 className={classes.cardTitle}>Service Provider List</h4>
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
                <Link to={`/service-provider/create`}>
                  <Button size="sm" className={classes.buttonDisplay}>
                    New Service Provider
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

function mapStateToProps(state) {
  return { serviceProviders: state.serviceProvider.serviceProviders ,
    serviceProviderLoading:state.provider.serviceProviderLoading,}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceProvidersByUserSub: (userSub) => dispatch(fetchServiceProvidersByUserSub(userSub)),
  }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderList);
