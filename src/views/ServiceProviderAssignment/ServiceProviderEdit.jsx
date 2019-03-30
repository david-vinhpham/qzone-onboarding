import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormLabel } from '@material-ui/core';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { classesType, matchType, historyType } from 'types/global.js';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import { editServiceProvider, fetchServiceProviderById } from '../../actions/serviceProvider';
import { fetchOrganizationsOptionByBusinessAdminId } from '../../actions/organization';
import { fetchProvidersOptionByServiceProviderId } from '../../actions/provider';
import { findServiceOptionByBusinessAdminId } from '../../actions/service';
import { fetchLocationsOption } from '../../actions/location';
import SlotCustomInput from '../../components/CustomInput/SlotCustomInput.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ServiceProviderEditSchema = Yup.object().shape({
  geoLocationId: Yup.string().required('Please select geoLocation'),
  serviceTimeSlot: Yup.string().required('Please select a serviceTimeSlot ')
});

class ServiceProviderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      originServiceTimeSlot: false,
      providerOption: null,
      organizationOption: null,
      serviceOption: null,
      locationOption: null,
      numberOfParallelCustomer: 1,
      serviceTimeSlot: [],
      additionalInfo: ''
    };
    this.handleOrgChange = this.handleOrgChange.bind(this);
    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNewSlot = this.handleNewSlot.bind(this);
    this.handleDeleteSlot = this.handleDeleteSlot.bind(this);
    this.handleRevertSlot = this.handleRevertSlot.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchServiceProviderById(id);
    localStorage.removeItem('originServiceTimeSlot');
    const userSub = localStorage.getItem('userSub');
    this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
    this.props.fetchProvidersOptionByServiceProviderId(id);
    this.props.findServiceOptionByBusinessAdminId(userSub);
    this.props.fetchLocationsOption();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.serviceProvider });
    this.setState({ serviceTimeSlot: nextProps.serviceProvider.serviceTimeSlot });
  }

  submit = values => {
    this.setState({ additionalInfo: values.additionalInfo });
    for (let index = 0; index < values.serviceTimeSlot.length; index += 1) {
      values.serviceTimeSlot[index].slotId = index;
    }
    this.props.editServiceProvider(values, this.props.history);
  };

  change(event, stateName) {
    if (_.isEmpty(event.target.value)) this.setState({ [`${stateName}State`]: 'error' });
    else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    this.setState({ [stateName]: event.target.value || event.target.checked });
  }

  handleRevertSlot() {
    const { serviceTimeSlot } = this.state;
    let newServiceTimeSlot = serviceTimeSlot;
    let originServiceTimeSlot = localStorage.getItem('originServiceTimeSlot');
    if (newServiceTimeSlot === null) {
      newServiceTimeSlot = [];
    }
    originServiceTimeSlot = JSON.parse(originServiceTimeSlot);
    while (serviceTimeSlot.length > 0) {
      serviceTimeSlot.pop();
    }
    for (let i = 0; i < originServiceTimeSlot.length; i += 1) {
      serviceTimeSlot.push(originServiceTimeSlot[i]);
    }
    this.setState({ serviceTimeSlot: originServiceTimeSlot });
  }

  handleDeleteSlot() {
    const { serviceTimeSlot } = this.state;
    const newServiceTimeSlot = serviceTimeSlot;
    newServiceTimeSlot.pop();
    this.setState({ serviceTimeSlot: newServiceTimeSlot });
  }

  handleNewSlot() {
    const { serviceTimeSlot } = this.state;
    const newServiceTimeSlot = serviceTimeSlot;
    const newSlot = {
      startTime: '00:00',
      endTime: '00:00'
    };
    newServiceTimeSlot.push(newSlot);
    this.setState({ serviceTimeSlot: newServiceTimeSlot });
  }

  handleOrgChange(selectedOption) {
    this.setState({ organizationOption: selectedOption });
    this.props.fetchServicesOptionByOrgId(selectedOption.value);
  }

  handleProviderChange(providerOption) {
    this.setState({ providerOption });
  }

  handleServiceChange(selectedOption) {
    this.setState({ serviceOption: selectedOption });
  }

  handleLocationChange(selectedOption) {
    this.setState({ locationOption: selectedOption });
  }

  render() {
    const {
      classes,
      services,
      organizations,
      providers,
      locations,
      editServiceProviderError,
      fetchServiceProviderLoading
    } = this.props;
    const {
      serviceOption,
      providerOption,
      organizationOption,
      locationOption,
      serviceTimeSlot
    } = this.state;
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
    if (fetchServiceProviderLoading || !this.state.data || this.state.data.length === 0) {
      return (
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={100}
          color="#123abc"
          loading={fetchServiceProviderLoading}
        />
      );
    }
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <Formik
            initialValues={{
              id: this.state.data.id,
              providerId: this.state.data.providerId,
              serviceId: this.state.data.serviceId,
              geoLocationId: this.state.data.geoLocation.id,
              organizationId: this.state.data.organizationId,
              additionalInfo: this.state.data.additionalInfo,
              numberOfParallelCustomer: this.state.data.numberOfParallelCustomer,
              serviceTimeSlot: this.state.serviceTimeSlot,
              businessAdminId: this.state.data.businessAdminId
            }}
            validationSchema={ServiceProviderEditSchema}
            enableReinitialize
            onSubmit={values => this.submit(values)}
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
                  {editServiceProviderError !== null ? (
                    <CardFooter className={classes.justifyContentCenter}>
                      <div style={{ color: 'red' }}> {editServiceProviderError.message} </div>
                    </CardFooter>
                  ) : (
                    <CardFooter className={classes.justifyContentCenter} />
                  )}
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                          Service Organization
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={4}>
                        {
                          <FormControl fullWidth className={classes.selectFormControl}>
                            <Select
                              options={organizationOptions}
                              value={
                                organizationOption === null
                                  ? organizationOptions.find(element => {
                                      return element.value === values.organizationId;
                                    })
                                  : organizationOption
                              }
                              onChange={this.handleOrgChange}
                            />
                          </FormControl>
                        }
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>Service</FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <Select
                            options={serviceOptions}
                            value={
                              serviceOption === null
                                ? serviceOptions.find(element => {
                                    return element.value === values.serviceId;
                                  })
                                : serviceOption
                            }
                            onChange={this.handleServiceChange}
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>Provider</FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <Select
                            value={
                              providerOption === null
                                ? providerOptions.find(element => {
                                    return element.value === values.providerId;
                                  })
                                : providerOption
                            }
                            placeholder="Select your provider(s)"
                            options={providerOptions}
                            onChange={this.handleProviderChange}
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>Service Location</FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                          <Select
                            value={
                              locationOption === null
                                ? locationOptions.find(element => {
                                    return element.value === values.geoLocationId;
                                  })
                                : locationOption
                            }
                            onChange={this.handleLocationChange}
                            options={locationOptions}
                          />
                          {errors.geoLocationId && touched.geoLocationId ? (
                            <div style={{ color: 'red' }}>{errors.geoLocationId}</div>
                          ) : null}
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer style={{ paddingBottom: '15px' }}>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                          No. of Parallel Customer
                        </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={4}>
                        <CustomInput
                          id="numberOfParallelCustomer"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'number'
                          }}
                          onChange={handleChange}
                          value={values.numberOfParallelCustomer}
                        />
                        {errors.numberOfParallelCustomer && touched.numberOfParallelCustomer ? (
                          <div style={{ color: 'red' }}>{errors.numberOfParallelCustomer}</div>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer style={{ paddingBottom: '15px' }}>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>Service Time Slot</FormLabel>
                      </GridItem>
                      {values.serviceTimeSlot.map((day, index) => (
                        <div>
                          <GridItem xs={12} sm={3} style={{ 'max-width': '100%' }}>
                            <FormLabel>Slot {index + 1}</FormLabel>
                          </GridItem>
                          <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                            <FormControl fullWidth style={{ margin: '-3px' }}>
                              <SlotCustomInput
                                id={`serviceTimeSlot[${index}].startTime`}
                                inputProps={{
                                  placeholder: 'Start Time',
                                  type: 'time'
                                }}
                                onChange={handleChange}
                                value={values.serviceTimeSlot[index].startTime}
                              />
                            </FormControl>
                          </GridItem>
                          {/* <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                                                  <FormControl fullWidth style={{ margin: '-3px' }}>
                                                    {<SlotCustomInput
                                                      id={`serviceTimeSlot[${index}].endTime`}
                                                      value={values.serviceTimeSlot[index].endTime}
                                                      inputProps={{ placeholder: "End Time", type: "time" }}
                                                      onChange={handleChange}
                                                    />}
                                                  </FormControl>
                                                </GridItem> */}
                        </div>
                      ))}
                    </GridContainer>
                    <GridContainer style={{ paddingBottom: '15px' }}>
                      <GridItem xs={12} sm={3} />
                      <GridItem xs={12} sm={6} style={{ 'max-width': '100%' }}>
                        {errors.serviceTimeSlot && touched.serviceTimeSlot ? (
                          <div style={{ color: 'red' }}>
                            {' '}
                            {
                              (errors.serviceTimeSlot =
                                serviceTimeSlot.length === 0 ? errors.serviceTimeSlot : '')
                            }
                          </div>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <GridContainer style={{ paddingBottom: '15px' }}>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal} />
                      </GridItem>
                      <GridItem xs={12} sm={6} style={{ 'max-width': '100%' }}>
                        <Button color="rose" onClick={this.handleNewSlot}>
                          New Slot
                        </Button>
                        <Button color="rose" onClick={this.handleDeleteSlot}>
                          Delete Slot
                        </Button>
                        <Button color="rose" onClick={this.handleRevertSlot}>
                          Revert
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>AdditionalInfo</FormLabel>
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
                    Update
                  </Button>
                  <Button color="rose" onClick={this.props.history.goBack}>
                    Exit
                  </Button>
                </CardFooter>
              </div>
            )}
          />
        </Card>
      </GridItem>
    );
  }
}

ServiceProviderEdit.propTypes = {
  classes: classesType.isRequired,
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
  organizations: PropTypes.arrayOf(PropTypes.string).isRequired,
  providers: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchProvidersOptionByServiceProviderId: PropTypes.func.isRequired,
  fetchOrganizationsOptionByBusinessAdminId: PropTypes.func.isRequired,
  fetchServiceProviderById: PropTypes.func.isRequired,
  editServiceProvider: PropTypes.func.isRequired,
  findServiceOptionByBusinessAdminId: PropTypes.func.isRequired,
  fetchLocationsOption: PropTypes.func.isRequired,
  serviceProvider: PropTypes.objectOf(PropTypes.string).isRequired,
  editServiceProviderError: PropTypes.string.isRequired,
  fetchServiceProviderLoading: PropTypes.bool.isRequired,
  match: matchType.isRequired,
  history: historyType.isRequired,
  fetchServicesOptionByOrgId: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    organizations: state.organization.organizations,
    providers: state.provider.providers,
    serviceProvider: state.serviceProvider.serviceProvider,
    editServiceProviderError: state.serviceProvider.editServiceProviderError,
    services: state.service.services,
    locations: state.location.locations,
    fetchServiceProviderLoading: state.serviceProvider.fetchServiceProviderLoading,
    fetchServiceProviderError: state.serviceProvider.fetchServiceProviderError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProvidersOptionByServiceProviderId: serviceProviderId =>
      dispatch(fetchProvidersOptionByServiceProviderId(serviceProviderId)),
    fetchOrganizationsOptionByBusinessAdminId: id =>
      dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
    fetchServiceProviderById: id => dispatch(fetchServiceProviderById(id)),
    editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
    findServiceOptionByBusinessAdminId: businessAdminId =>
      dispatch(findServiceOptionByBusinessAdminId(businessAdminId)),
    fetchLocationsOption: () => dispatch(fetchLocationsOption())
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ServiceProviderEdit);
