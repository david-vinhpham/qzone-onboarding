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
import defaultImage from "../../assets/img/image_placeholder.jpg";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import {editServiceProvider, fetchServiceProviderById} from "../../actions/serviceProvider";
import {fetchOrganizationsByBusinessAdminId} from "../../actions/organization";
import {fetchProvidersByOrdId} from "../../actions/provider";

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
            imagePreviewUrl: defaultImage,
            data: null,
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.serviceProvider})
    }

    myHandlerChange(organization) {
      console.log('data: ' + organization);
      this.props.fetchProvidersByOrdId(organization.id);
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
        const { classes, providers, organizations } = this.props;
        let providerOptions = [];
        let organizationOptions = [];
        if (providers != null && providers.length > 0) {
          providerOptions = providers;
        }
        if (organizations != null && organizations.length > 0) {
          organizationOptions = organizations;
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
                                            <h4 className={classes.cardTitle}>Edit Service</h4>
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
                                                    onChange={(organizationId) => this.myHandlerChange(values)}
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
                                                        Service Category
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
                                                                {providerOption.name}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProvidersByOrdId: (orgId) => dispatch(fetchProvidersByOrdId(orgId)),
      fetchOrganizationsByBusinessAdminId: (id) => dispatch(fetchOrganizationsByBusinessAdminId(id)),
      fetchServiceProviderById: (id) => dispatch(fetchServiceProviderById(id)),
      editServiceProvider: (values, history) => dispatch(editServiceProvider(values, history)),
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(ServiceProviderEdit);
