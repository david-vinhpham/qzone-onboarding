import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {compose} from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import _ from 'lodash';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, FormLabel, MenuItem, Select} from "@material-ui/core";
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
import {fetchOrganizationsByBusinessAdminId} from "../../actions/organization";
import {fetchProvidersByOrdId} from "../../actions/provider";
import {fetchServicesByOrgId} from "../../actions/service";

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
            organizationId: null,
            loadProviders: false,
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.serviceProvider})
      if( nextProps.serviceProvider != null && !this.state.loadProviders && nextProps.serviceProvider.organizationId != null) {
        this.props.fetchProvidersByOrdId( nextProps.serviceProvider.organizationId);
        this.props.fetchServicesByOrgId( nextProps.serviceProvider.organizationId);
        this.setState({loadProviders: true})
      }
    }

    handleOrgChange(event) {
      console.log('handleChange: ' + event.target.value);
      this.setState({organizationId: event.target.value});
      this.props.fetchProvidersByOrdId(event.target.value);
      this.props.fetchServicesByOrgId(event.target.value);
    }

    componentDidMount() {
      let userSub = localStorage.getItem('userSub');
      this.props.fetchOrganizationsByBusinessAdminId(userSub);
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
        const { classes, providers, services, organizations } = this.props;
        let providerOptions = [];
        let serviceOptions = [];
        let organizationOptions = [];
        if (providers != null && providers.length > 0) {
            console.log('update providerOptions: ' + providerOptions);
            providerOptions = providers;
        }
        if (services != null && services.length > 0) {
            serviceOptions = services;
            console.log('update serviceOptions: ' + serviceOptions);
        }
        if (organizations != null && organizations.length > 0) {
            organizationOptions = organizations;
            console.log('update organizationOptions: ' + organizationOptions);
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
                            organizationId: this.state.organizationId === null ? this.state.data.organizationId : this.state.organizationId,
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
                                                <FormControl
                                                  fullWidth
                                                  className={classes.selectFormControl}>
                                                  <Select
                                                    value={values.organizationId}
                                                    onChange={(e) => {this.handleOrgChange(e)}}
                                                    name="organizationId"
                                                  >
                                                  {organizationOptions.map(organizationOption => (
                                                      <MenuItem
                                                        key={organizationOption.id}
                                                        value={organizationOption.id}
                                                        id="organizationId"
                                                      >
                                                      {organizationOption.name}
                                                    </MenuItem>
                                                    ))}
                                                  </Select>
                                                </FormControl>
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
                                                  value={values.serviceId}
                                                  onChange={handleChange('serviceId')}
                                                  name="serviceId"
                                                >
                                                  {serviceOptions.map(serviceOption => (
                                                    <MenuItem
                                                      key={serviceOption.id}
                                                      value={serviceOption.id}
                                                      id="serviceId"
                                                    >
                                                      {serviceOption.name}
                                                    </MenuItem>
                                                  ))}
                                                </Select>
                                              </FormControl>
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
                                                  value={values.providerId}
                                                  onChange={handleChange('providerId')}
                                                  name="providerId"
                                                >
                                                  {providerOptions.map(providerOption => (
                                                    <MenuItem
                                                      key={providerOption.id}
                                                      value={providerOption.id}
                                                      id="providerId"
                                                    >
                                                      {providerOption.givenName}
                                                    </MenuItem>
                                                  ))}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProvidersByOrdId: (orgId) => dispatch(fetchProvidersByOrdId(orgId)),
      fetchOrganizationsByBusinessAdminId: (id) => dispatch(fetchOrganizationsByBusinessAdminId(id)),
      fetchServiceProviderById: (id) => dispatch(fetchServiceProviderById(id)),
      editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
      fetchServicesByOrgId: (orgId) => dispatch(fetchServicesByOrgId(orgId)),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderEdit);
