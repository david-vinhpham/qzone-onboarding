import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {compose} from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import _ from 'lodash';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, FormLabel} from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import {editServiceProvider, fetchServiceProviderById} from "../../actions/serviceProvider";
import {fetchOrganizationsOptionByBusinessAdminId} from "../../actions/organization";
import {fetchProvidersOptionByServiceProviderId} from "../../actions/provider";
import {fetchServicesOptionByOrgId} from "../../actions/service";
import { fetchLocationsOption } from '../../actions/location';
import Select from 'react-select';
const ServiceEditSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name too short")
        .max(50, "Name too long")
        .required("This field is required"),
    description: Yup.string()
        .min(50, "Description too short")
        .max(1500, "Description too long")
        .required("this field is required"),
    duration: Yup.number()
        .min(60),
    numberOfParallelCustomer: Yup.number()
        .min(1),
    bookingHorizon: Yup.number()
        .min(3)
        .max(1095)

})

class ServiceProviderEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loadProviders: false,
            providerOption: null,
            organizationOption: null,
            serviceOption: null,
            locationOption: null,
        }
      this.handleOrgChange = this.handleOrgChange.bind(this);
      this.handleProviderChange = this.handleProviderChange.bind(this);
      this.handleServiceChange = this.handleServiceChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.serviceProvider})
      if( nextProps.serviceProvider != null && !this.state.loadProviders && nextProps.serviceProvider.organizationId != null) {
        this.props.fetchServicesOptionByOrgId( nextProps.serviceProvider.organizationId);
        this.setState({loadProviders: true})
      }
    }

    handleOrgChange(selectedOption) {
      console.log('handleOrgChange: ' + selectedOption);
      this.setState({ organizationOption: selectedOption });
      this.props.fetchServicesOptionByOrgId(selectedOption.value);
    }
    handleProviderChange(providerOption) {
      console.log('handleProviderChange: ' + providerOption);
      this.setState({ providerOption: providerOption });
    }

    handleServiceChange(selectedOption) {
      console.log('handleServiceChange: ' + selectedOption);
      this.setState({ serviceOption: selectedOption });
    }

    handleLocationChange(selectedOption) {
      console.log('handleLocationChange: ' + selectedOption);
      this.setState({ locationOption: selectedOption });
    }

    componentDidMount() {
      let userSub = localStorage.getItem('userSub');
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
      const { id } = this.props.match.params;
      this.props.fetchProvidersOptionByServiceProviderId(id);
      this.props.fetchServiceProviderById(id);
      this.props.fetchLocationsOption();
    }


    change(event, stateName) {
        if (_.isEmpty(event.target.value))
            this.setState({ [stateName + "State"]: "error" })
        else {
            this.setState({ [stateName + "State"]: "success" });
        }
        this.setState({ [stateName]: (event.target.value || event.target.checked) })
    }

    render() {
        const { classes, services, organizations, providers, locations } = this.props;
        const { serviceOption, providerOption, organizationOption, locationOption } = this.state;
        let serviceOptions = [];
        let organizationOptions = [];
        let providerOptions = [];
        let locationOptions = [];
        if (services != null && services.length > 0) {
            serviceOptions = services;
        }
        if (organizations != null && organizations.length > 0) {
            organizationOptions = organizations;
        }
        if (providers != null && providers.length > 0) {
            providerOptions = providers;
        }
        if (locations != null && locations.length > 0) {
           locationOptions = locations;
        }
        //console.log('this.state.data: ' + this.state.data);
        let data = null
        if (!this.state.data) {
          data =  (
            <GridContainer>
              <FormLabel>
                No Services.
              </FormLabel>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" onClick={this.props.history.goBack}>
                  Back
                </Button>
              </CardFooter>
            </GridContainer>
          )
            return data;
        }
        return (
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <Formik
                        initialValues={{
                            id: this.state.data.id,
                            providerId: this.state.data.providerId,
                            serviceId: this.state.data.serviceId,
                            organizationId: this.state.data.organizationId,
                            geoLocationId: this.state.data.geoLocationId,
                        }}
                        enableReinitialize={true}
                        validationSchema={ServiceEditSchema}
                        onSubmit={(values) => this.saveClicked(values)}
                        render={({
                            values,
                            errors,
                            status,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                        }) => (
                                <div>
                                    <CardHeader color="rose" text>
                                        <CardText color="rose">
                                            <h4 className={classes.cardTitle}>Edit Service Providers</h4>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody>
                                        <form>
                                            <GridContainer>
                                              <GridItem xs={12} sm={3}>
                                                <FormLabel className={classes.labelHorizontal}>
                                                  Service Organization
                                                </FormLabel>
                                              </GridItem>
                                              <GridItem xs={12} sm={4}>
                                                {<FormControl
                                                  fullWidth
                                                  className={classes.selectFormControl}>
                                                  <Select
                                                    isDisabled
                                                    options={organizationOptions}
                                                    value={ organizationOption == null ? organizationOptions.find((element) => {
                                                      return element.value === values.organizationId;
                                                    }) : organizationOption}
                                                    onChange={this.handleOrgChange}
                                                  >
                                                  </Select>
                                                </FormControl>}
                                              </GridItem>
                                            </GridContainer>
                                          <GridContainer>
                                            <GridItem xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                                Service
                                              </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={4}>
                                              <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}>
                                                <Select
                                                  isDisabled
                                                  value={serviceOption == null ? serviceOptions.find((element) => {
                                                    return element.value === values.serviceId;
                                                  }) : serviceOption}
                                                  onChange={this.handleServiceChange}
                                                  options={serviceOptions}
                                                >
                                                </Select>
                                              </FormControl>
                                            </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                            <GridItem xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                                Provider
                                              </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={4}>
                                              <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}>
                                                <Select
                                                  value={providerOption == null ? providerOptions.find((element) => {
                                                    return element.value === values.providerId;
                                                  }) : providerOption}
                                                  placeholder="Select your provider(s)"
                                                  options={providerOptions}
                                                  onChange={this.handleProviderChange} />
                                              </FormControl>
                                            </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                            <GridItem xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                                Service Location
                                              </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={6}>
                                              <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}>
                                                <Select
                                                  value={locationOption == null ? locationOptions.find((element) => {
                                                    return element.value === values.geoLocationId;
                                                  }) : locationOption}
                                                  onChange={this.handleLocationChange}
                                                  options={locationOptions}
                                                >
                                                </Select>
                                              </FormControl>
                                            </GridItem>
                                          </GridContainer>
                                        </form>
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentCenter}>
                                        <Button color="rose" onClick={handleSubmit}>
                                            Save
                                        </Button>
                                        <Button color="rose" onClick={this.props.history.goBack}>
                                            Exit
                                        </Button>
                                    </CardFooter>
                                </div>
                            )
                        }
                    />

                </Card>
            </GridItem>
        );
    }
}

ServiceProviderEdit.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
      organizations: state.organization.organizations,
      providers: state.provider.providers,
      serviceProvider: state.serviceProvider.serviceProvider,
      services: state.service.services,
      locations: state.location.locations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProvidersOptionByServiceProviderId: (serviceProviderId) => dispatch(fetchProvidersOptionByServiceProviderId(serviceProviderId)),
      fetchOrganizationsOptionByBusinessAdminId: (id) => dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
      fetchServiceProviderById: (id) => dispatch(fetchServiceProviderById(id)),
      editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
      fetchServicesOptionByOrgId: (orgId) => dispatch(fetchServicesOptionByOrgId(orgId)),
      fetchLocationsOption: () => dispatch(fetchLocationsOption()),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderEdit);
