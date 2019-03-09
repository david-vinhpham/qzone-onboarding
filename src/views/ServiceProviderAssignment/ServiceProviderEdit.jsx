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
import {findServiceOptionByBusinessAdminId} from "../../actions/service";
import {fetchLocationsOption} from '../../actions/location';
import SlotCustomInput from "../../components/CustomInput/SlotCustomInput.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Select from 'react-select';
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const ServiceEditSchema = Yup.object().shape({

})

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
            serviceTimeSlot: [],
        }
      this.handleOrgChange = this.handleOrgChange.bind(this);
      this.handleProviderChange = this.handleProviderChange.bind(this);
      this.handleServiceChange = this.handleServiceChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleNewSlot = this.handleNewSlot.bind(this);
      this.handleDeleteSlot = this.handleDeleteSlot.bind(this);
      this.handleRevertSlot = this.handleRevertSlot.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.serviceProvider});
      this.setState({serviceTimeSlot: nextProps.serviceProvider.serviceTimeSlot});
    }

  handleRevertSlot() {
    console.log('handleRevertSlot');
    const { serviceTimeSlot } = this.state;
    let newServiceTimeSlot = serviceTimeSlot;
    let originServiceTimeSlot = localStorage.getItem('originServiceTimeSlot');
    if(newServiceTimeSlot === null) {
      newServiceTimeSlot = [];
    }
    originServiceTimeSlot = JSON.parse(originServiceTimeSlot);
    while( serviceTimeSlot.length > 0) {
      serviceTimeSlot.pop();
    }
    for(let i = 0; i < originServiceTimeSlot.length; i++) {
      serviceTimeSlot.push(originServiceTimeSlot[i]);
    }
    this.setState({ serviceTimeSlot: originServiceTimeSlot});
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
      this.setState({ providerOption: providerOption });
    }

    handleServiceChange(selectedOption) {
      this.setState({ serviceOption: selectedOption });
    }

    handleLocationChange(selectedOption) {
      this.setState({ locationOption: selectedOption });
    }

    componentDidMount() {
      localStorage.removeItem('originServiceTimeSlot');
      let userSub = localStorage.getItem('userSub');
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
      const { id } = this.props.match.params;
      this.props.fetchProvidersOptionByServiceProviderId(id);
      this.props.fetchServiceProviderById(id);
      this.props.findServiceOptionByBusinessAdminId(userSub);
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
      this.props.editServiceProvider(values, this.props.history)
    }

    render() {
        const { classes, services, organizations, providers, locations, serviceProviderLoading } = this.props;
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
        console.log('this.state.data: ' + this.state.data);
        if (!this.state.data || this.state.data.length ===0) {
          return < ClipLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={serviceProviderLoading}
          />;
        }
        //const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return (
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <Formik
                        initialValues={{
                            id: this.state.data.id,
                            providerId: this.state.data.providerId,
                            serviceId: this.state.data.serviceId,
                            serviceEntity: this.state.data.serviceEntity,
                            providerEntity: this.state.data.providerEntity,
                            geoLocationId: this.state.data.geoLocationId,
                            additionalInfo: this.state.data.additionalInfo,
                            serviceTimeSlot: this.state.serviceTimeSlot,
                            businessAdminId: this.state.data.businessAdminId,
                        }}
                        validationSchema={ServiceEditSchema}
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
                                                    value={ organizationOption === null ? organizationOptions.find((element) => {
                                                      return element.value === values.serviceEntity.organizationId;
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
                                                  value={serviceOption === null ? serviceOptions.find((element) => {
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
                                                  value={providerOption === null ? providerOptions.find((element) => {
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
                                            <GridItem xs={12} sm={4}>
                                              <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}>
                                                <Select
                                                  value={locationOption === null ? locationOptions.find((element) => {
                                                    return element.value === values.geoLocationId;
                                                  }) : locationOption}
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
                                              <Button color="rose" onClick={this.handleRevertSlot}>
                                                Revert
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
                                            Update
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
      originServiceProvider: state.serviceProvider.serviceProvider,
      services: state.service.services,
      locations: state.location.locations,
      serviceProviderLoading:state.provider.serviceProviderLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProvidersOptionByServiceProviderId: (serviceProviderId) => dispatch(fetchProvidersOptionByServiceProviderId(serviceProviderId)),
      fetchOrganizationsOptionByBusinessAdminId: (id) => dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
      fetchServiceProviderById: (id) => dispatch(fetchServiceProviderById(id)),
      editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
      findServiceOptionByBusinessAdminId: (businessAdminId) => dispatch(findServiceOptionByBusinessAdminId(businessAdminId)),
      fetchLocationsOption: () => dispatch(fetchLocationsOption()),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderEdit);
