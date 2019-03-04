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
import {fetchProvidersOptionByOrdId} from "../../actions/provider";
import {fetchServicesOptionByOrgId} from "../../actions/service";
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

        }
      this.handleOrgChange = this.handleOrgChange.bind(this);
      this.handleProviderChange = this.handleProviderChange.bind(this);
      this.handleServiceChange = this.handleServiceChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.serviceProvider})
      if( nextProps.serviceProvider != null && !this.state.loadProviders && nextProps.serviceProvider.organizationId != null) {
        this.props.fetchProvidersOptionByOrdId( nextProps.serviceProvider.organizationId);
        this.props.fetchServicesOptionByOrgId( nextProps.serviceProvider.organizationId);
        this.setState({loadProviders: true})
      }
    }

    handleOrgChange(selectedOption) {
      console.log('handleOrgChange: ' + selectedOption);
      this.setState({ organizationOption: selectedOption });
      this.props.fetchProvidersOptionByOrdId(selectedOption.value);
      this.props.fetchServicesOptionByOrgId(selectedOption.value);
    }

    handleProviderChange(providerOption) {
      console.log('handleProviderChange: ' + providerOption);
      this.setState({ providerOption });
    }

    handleServiceChange(selectedOption) {
      console.log('handleServiceChange: ' + selectedOption);
      this.setState({ serviceOption: selectedOption });
    }
    componentDidMount() {
      let userSub = localStorage.getItem('userSub');
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
      const { id } = this.props.match.params
      this.props.fetchServiceProviderById(id);
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
        const { classes, services, organizations, providers } = this.props;
        const { serviceOption, providerOption } = this.state;
        let serviceOptions = [];
        let organizationOptions = [];
        let providerOptions = [];
        if (services != null && services.length > 0) {
            serviceOptions = services;
            console.log('update serviceOptions: ' + serviceOptions);
        }
        if (organizations != null && organizations.length > 0) {
            organizationOptions = organizations;
            console.log('update organizationOptions: ' + organizationOptions);
        }
        if (providers != null && providers.length > 0) {
            providerOptions = providers;
            console.log('update providerOptions: ' + providerOptions);
        }
        console.log('this.state.data: ' + this.state.data);
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
                            organizationId: this.state.organizationOption === null ? this.state.data.organizationId : this.state.organizationOption,
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
                                                    options={organizationOptions}
                                                    value={values.organizationId}
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
                                                  value={serviceOption}
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
                                                  isMulti
                                                  value={providerOption}
                                                  placeholder="Select your provider(s)"
                                                  options={providerOptions}
                                                  onChange={this.handleProviderChange} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProvidersOptionByOrdId: (orgId) => dispatch(fetchProvidersOptionByOrdId(orgId)),
      fetchOrganizationsOptionByBusinessAdminId: (id) => dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
      fetchServiceProviderById: (id) => dispatch(fetchServiceProviderById(id)),
      editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
      fetchServicesOptionByOrgId: (orgId) => dispatch(fetchServicesOptionByOrgId(orgId)),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderEdit);
