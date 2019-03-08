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
import {createServiceProvider} from "../../actions/serviceProvider";
import {fetchOrganizationsOptionByBusinessAdminId} from "../../actions/organization";
import {fetchServicesOptionByOrgId} from "../../actions/service";
import {fetchProvidersOptionByServiceId} from "../../actions/provider";
import {fetchLocationsOption} from '../../actions/location';
import SlotCustomInput from "../../components/CustomInput/SlotCustomInput.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Select from 'react-select';

const ServiceCreateSchema = Yup.object().shape({
  providerId: Yup.string().required("Please select provider"),
})

class ServiceProviderCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            providerOption: null,
            organizationOption: null,
            serviceOption: null,
            locationOption: null,
            serviceTimeSlot: [],
            businessAdminId: null,
        }
      this.handleOrgChange = this.handleOrgChange.bind(this);
      this.handleProviderChange = this.handleProviderChange.bind(this);
      this.handleServiceChange = this.handleServiceChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleNewSlot = this.handleNewSlot.bind(this);
      this.handleDeleteSlot = this.handleDeleteSlot.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps');
    }

  handleDeleteSlot() {
      const { serviceTimeSlot } = this.state;
      let newServiceTimeSlot = serviceTimeSlot;
      newServiceTimeSlot.pop();
      this.setState({ serviceTimeSlot: newServiceTimeSlot });
    }

    handleNewSlot() {
      const { serviceTimeSlot } = this.state;
      let newServiceTimeSlot = serviceTimeSlot;
      let newSlot =  {
        "startTime": "00:00",
        "endTime": "00:00",
      }
      newServiceTimeSlot.push(newSlot);
      this.setState({ serviceTimeSlot: newServiceTimeSlot });
    }

    handleOrgChange(selectedOption) {
      this.setState({ organizationOption: selectedOption });
      this.props.fetchServicesOptionByOrgId(selectedOption.value);
    }

    handleProviderChange(providerOption) {
      let tmpProviderOption = providerOption;
      this.setState({providerOption: ''});
      this.setState({ providerOption: tmpProviderOption });
    }

    handleServiceChange(selectedOption) {
      let tmpServiceOption = selectedOption;
      this.setState({serviceOption: ''});
      this.setState({ serviceOption: tmpServiceOption });
      this.props.fetchProvidersOptionByServiceId(selectedOption.value);
    }

    handleLocationChange(selectedOption) {
      this.setState({ locationOption: selectedOption });
    }

    componentDidMount() {
      let userSub = localStorage.getItem('userSub');
      this.setState({businessAdminId: userSub});
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
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

    submit = (values) =>  {
      this.props.createServiceProvider(values, this.props.history)
    }

    render() {
        const { classes, services, organizations, providers, locations } = this.props;
        const { serviceOption, providerOption, organizationOption, locationOption, serviceTimeSlot, businessAdminId } = this.state;
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
        return (
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <Formik
                        initialValues={{
                            providerId: (providerOption === null ? null : providerOption.value),
                            serviceId: (serviceOption === null ? null : serviceOption.value),
                            geoLocationId: (locationOption === null ? null : locationOption.value),
                            additionalInfo: '',
                            serviceTimeSlot: serviceTimeSlot,
                            businessAdminId: businessAdminId,
                        }}
                        validationSchema={ServiceCreateSchema}
                        enableReinitialize={true}
                        onSubmit={(values) => this.submit(values)}
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
                                            <h4 className={classes.cardTitle}>Create Service Providers</h4>
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
                                                    options={organizationOptions}
                                                    value={ organizationOption}
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
                                                  value = {serviceOption}
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
                                                  value={providerOption}
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
                                            <GridItem xs={12} sm={4}>
                                              <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}>
                                                <Select
                                                  value={locationOption}
                                                  onChange={this.handleLocationChange}
                                                  options={locationOptions}
                                                >
                                                </Select>
                                              </FormControl>
                                            </GridItem>
                                          </GridContainer>
                                          <GridContainer style={{ paddingBottom: '15px' }}>
                                            <GridItem  xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                                Service Time Slot
                                              </FormLabel>
                                            </GridItem>
                                            {values.serviceTimeSlot.map((day, index) => (
                                              <div>
                                                <GridItem xs={12} sm={3} style={{ 'max-width': '100%' }}>
                                                  <FormLabel >
                                                    Slot {index + 1}
                                                  </FormLabel>
                                                </GridItem>
                                                <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                                                  <FormControl fullWidth style={{ margin: '-3px' }}>
                                                    <SlotCustomInput
                                                      id={`serviceTimeSlot[${index}].startTime`}
                                                      inputProps={{
                                                        placeholder: "Start Time",
                                                        type: "time"
                                                      }}
                                                      onChange={handleChange}
                                                      value={values.serviceTimeSlot[index].startTime}
                                                    />
                                                  </FormControl>
                                                </GridItem>
                                                <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                                                  <FormControl fullWidth style={{ margin: '-3px' }}>
                                                    {<SlotCustomInput
                                                      id={`serviceTimeSlot[${index}].endTime`}
                                                      value={values.serviceTimeSlot[index].endTime}
                                                      inputProps={{ placeholder: "End Time", type: "time" }}
                                                      onChange={handleChange}
                                                    />}
                                                  </FormControl>
                                                </GridItem>
                                              </div>
                                            ))}
                                          </GridContainer>
                                          <GridContainer style={{ paddingBottom: '15px' }}>
                                            <GridItem  xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                              </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} style={{ 'max-width': '100%' }}>
                                              <Button color="rose" onClick={this.handleNewSlot}>
                                                New Slot
                                              </Button>
                                              <Button color="rose" onClick={this.handleDeleteSlot}>
                                                Delete Slot
                                              </Button>
                                            </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                            <GridItem xs={12} sm={3}>
                                              <FormLabel className={classes.labelHorizontal}>
                                                AdditionalInfo
                                              </FormLabel>
                                            </GridItem>
                                            <GridItem xs={12} sm={3}>
                                              <CustomInput
                                                id="additionalInfo"
                                                formControlProps={{
                                                  fullWidth: true
                                                }}
                                                inputProps={{
                                                  multiline: true,
                                                  rows: 3
                                                }}
                                                value={values.additionalInfo}
                                                onChange={handleChange}
                                              />
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

ServiceProviderCreate.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
      organizations: state.organization.organizations,
      providers: state.provider.providers,
      serviceProvider: state.serviceProvider.serviceProvider,
      originServiceProvider: state.serviceProvider.serviceProvider,
      services: state.service.services,
      fetchServicesLoading: state.service.fetchServicesLoading,
      locations: state.location.locations,
      serviceProviderLoading:state.provider.serviceProviderLoading,
      fetchOrganizationsLoading:  state.organization.fetchOrganizationsLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchOrganizationsOptionByBusinessAdminId: (id) => dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
      createServiceProvider: (values, history) => dispatch(createServiceProvider(values, history)),
      fetchServicesOptionByOrgId: (orgId) => dispatch(fetchServicesOptionByOrgId(orgId)),
      fetchLocationsOption: () => dispatch(fetchLocationsOption()),
      fetchProvidersOptionByServiceId: (orgId) => dispatch(fetchProvidersOptionByServiceId(orgId)),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderCreate);
