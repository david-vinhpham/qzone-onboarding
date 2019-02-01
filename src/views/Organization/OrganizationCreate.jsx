import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, MenuItem, Select, Grid, FormControlLabel, Switch, FormControl } from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import { fetchBusinessCategory, createOrganization, getOrganizationByAdmin } from "../../actions/organization.jsx"

import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

const userDetail = JSON.parse(localStorage.getItem('user'));

const OrganizationCreateSchema = Yup.object().shape({
  name: Yup.string()
          .required("This is required Field"),
  businessCategoryId: Yup.string().required("Please select category"),
  telephone: Yup.string().required("Please enter a valid phone Number"),
  businessAdmin: Yup.object()
                  .default(null)
                  .shape({
                      givenName: Yup.string().required("Please enter a valid name")
                  })
})


class OrganizationCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessAdmin: {
        cognitoToken: localStorage.getItem('CognitoIdentityServiceProvider.3ov1blo2eji4acnqfcv88tcidn.' + (localStorage.getItem('username')) + '.idToken'),
        email: this.props.email ? this.props.email : '',
        userSub: localStorage.getItem('username'),
      }
    };
  }

  componentDidMount() {
    this.props.getBusinessCategory()
  }

  submit = (values) => {
    // this is the case of 1st time registering the organization along with admin
    if (userDetail.success === false) {
      this.props.createOrganization(values, this.props.history);
    } else {
      this.setState({
        businessAdminId: userDetail.object.id
      })
    }
  }

  render() {
    const { classes, businessCategory, userDetails } = this.props;
    let categoryOptions = [];
    if (businessCategory && businessCategory.objects) {
      categoryOptions = businessCategory.objects;
    }
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Formik
          initialValues={{
            name: userDetails ? userDetails.registerOrganizationName : '',
            orgMode: "PROVIDER_BASED",
            businessCategoryId: '',
            preferences: {
              allowListingOnQuezone: false,
              allowReschedule: true,
              allowSmsCommunication: true,
              displayPhoneNumber: true,
              enableWaitlist: true,
              isCustomerRegistrationRequired: true,
              preferGuestcheckout: true,
              trackManualTime: true,
              bookingHorizon: 0,
              dataRetention: 0,
              serviceHours: [
                {
                  "day": "Monday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Tuesday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Wednesday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Thursday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Friday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Saturday",
                  "endTime": "",
                  "startTime": ""
                },
                {
                  "day": "Sunday",
                  "endTime": "",
                  "startTime": ""
                }
              ],
            },
            telephone:'',
            logo: {
              id: "string",
              fileUrl: "string",
              originName: "string",
              keyName: "string"
            },
            website: '',
            queueModel: '',
            businessAdmin: {
              address: {
                city: "",
                country: "",
                district: "",
                postCode: "",
                state: "",
                streetAddress: ""
              },
              cognitoToken: this.state.businessAdmin.cognitoToken,
              email: "",
              familyName: "",
              givenName: "",
              telephone: "",
              userStatus: "CONFIRMED",
              userSub: this.state.businessAdmin.userSub
            },
          }}
          validationSchema={OrganizationCreateSchema}
          enableReinitialize={true}
          onSubmit={(values) => this.submit(values)}
          render={({
            values,
            errors,
            status,
            touched,
            handleChange,
            handleSubmit,
          }) => (
              <Card>
                <CardHeader color="rose" text>
                  <CardText color="rose">
                    <h4 className={classes.cardTitle}>Create Organization</h4>
                  </CardText>
                </CardHeader>
                <CardBody>
                  <Accordion
                    active={0}
                    collapses={[
                      {
                        title: "About",
                        content:
                          <GridContainer>
                            <GridItem >
                              <FormLabel className={classes.labelHorizontal}>
                                Name
                              </FormLabel>
                            </GridItem >
                            <GridItem xs={12} sm={4} style={{ 'flex-basis': '17.333%' }}>
                              <CustomInput
                                id="name"
                                inputProps={{
                                  placeholder: "Name",
                                  type: "text"
                                }}
                                onChange={handleChange}
                                value={values.name}
                              />
                              {errors.name && touched.name ? (
                                <div style={{ color: "red" }}>{errors.name}</div>
                              ) : null}
                            </GridItem>
                            <GridItem xs={12} sm={3} style={{ 'flex-basis': '18%' }}>
                              <FormLabel className={classes.labelHorizontal}>
                                Mode of Organization
                                            </FormLabel>
                            </GridItem>
                            <GridItem xs={12} sm={3} style={{ 'flex-basis': '15%' }}>

                              <Select
                                value={values.orgMode}
                                onChange={handleChange("orgMode")}
                                name='orgMode'
                                style={{ paddingTop: '16%', }}
                                fullWidth
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                              >
                                <MenuItem value="PROVIDER_BASED">
                                  PROVIDER_BASED
                                                </MenuItem>
                                <MenuItem value="COUNTER_BASED">
                                  COUNTER_BASED
                                                </MenuItem>
                                <MenuItem value="ANY">
                                  ANY
                                                </MenuItem>
                              </Select>

                            </GridItem>
                            <GridItem >
                              <FormLabel className={classes.labelHorizontal}>
                                Business Category
                                          </FormLabel>
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                              <Select
                                style={{ paddingTop: '9%', }}
                                fullWidth
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                                value={values.businessCategoryId}
                                onChange={handleChange("businessCategoryId")}
                                name="businessCategoryId"
                              >
                                {categoryOptions.map(business => (
                                  <MenuItem key={business.id} value={business.id}>
                                    {business.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {errors.businessCategoryId && touched.businessCategoryId ? (
                                <div style={{ color: "red" }}>{errors.businessCategoryId}</div>
                              ) : null}
                            </GridItem>
                          </GridContainer>
                      },
                      {
                        title: "Preferences",
                        content:
                          <div>
                            <GridContainer style={{ paddingBottom: '15px' }}>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                  Service Hours
                                            </FormLabel>
                              </GridItem>
                              {days.map((day, index) => (
                                <div>
                                  <GridItem xs={12} sm={3} style={{ 'max-width': '100%' }}>
                                    <FormLabel >
                                      {day}
                                    </FormLabel>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                                    <FormControl fullWidth style={{ margin: '-3px' }}>
                                      <CustomInput
                                        id={`preferences.serviceHours[${index}].startTime`}
                                        inputProps={{
                                          placeholder: "Start Time",
                                          type: "time"
                                        }}
                                        onChange={handleChange}
                                        value={values.preferences.serviceHours[index].startTime}
                                      />
                                    </FormControl>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} style={{ 'max-width': '87%' }}>
                                    <FormControl fullWidth style={{ margin: '-3px' }}>
                                      <CustomInput
                                        id={`preferences.serviceHours[${index}].endTime`}
                                        value={values.preferences.serviceHours[index].endTime}
                                        inputProps={{ placeholder: "End Time", type: "time" }}
                                        onChange={handleChange}
                                      />
                                    </FormControl>
                                  </GridItem>
                                </div>
                              ))}
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Allow listing on Quezone?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.allowListingOnQuezone"
                                      checked={values.preferences.allowListingOnQuezone}
                                      value="preferences.allowListingOnQuezone"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>

                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Allow Rescheduling?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.allowReschedule"
                                      checked={values.preferences.allowReschedule}
                                      value="preferences.allowReschedule"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Allow Communication by SMS?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.allowSmsCommunication"
                                      checked={values.preferences.allowSmsCommunication}
                                      value="preferences.allowSmsCommunication"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Display Contact Information?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.displayPhoneNumber"
                                      checked={values.preferences.displayPhoneNumber}
                                      value="preferences.displayPhoneNumber"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Enable Wait List?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.enableWaitlist"
                                      checked={values.preferences.enableWaitlist}
                                      value="preferences.enableWaitlist"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Is Customer Registration Required?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.isCustomerRegistrationRequired"
                                      checked={values.preferences.isCustomerRegistrationRequired}
                                      value="preferences.isCustomerRegistrationRequired"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Prefer Guest Checkout?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.preferGuestcheckout"
                                      checked={values.preferences.preferGuestcheckout}
                                      value="preferences.preferGuestcheckout"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormLabel
                                  className={
                                    classes.labelHorizontal +
                                    " " +
                                    classes.labelHorizontalRadioCheckbox
                                  }
                                >
                                  Track Manual Time?
                                          </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="preferences.trackManualTime"
                                      checked={values.preferences.trackManualTime}
                                      value="preferences.trackManualTime"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                  Booking Horizon
                                          </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput

                                  id="preferences.bookingHorizon"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    placeholder: "Booking Horizon",
                                    type: "number"
                                  }}
                                  onChange={handleChange}
                                  value={values.preferences.bookingHorizon}
                                />
                              </GridItem>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                  Data Retention
                                          </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput

                                  id="preferences.dataRetention"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "number",
                                    placeholder: "Data Retention"
                                  }}
                                  onChange={handleChange}
                                  value={values.preferences.dataRetention}
                                />
                              </GridItem>

                            </GridContainer>
                          </div>
                      },
                      {
                        title: "Personal Information",
                        content:
                            <GridContainer>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Phone Number
                                            </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="telephone"
                                  inputProps={{
                                    placeholder: "Phone Number",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.telephone}
                                />
                                {errors.telephone && touched.telephone ? (
                                  <div style={{ color: "red" }}>{errors.telephone}</div>
                                ) : null}
                              </GridItem>
                            
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Website
                                            </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="website"
                                  inputProps={{
                                    placeholder: "Website",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.website}
                                />
                              </GridItem>
                            
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Queue Model
                                            </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="queueModel"
                                  inputProps={{
                                    placeholder: "Queue Model",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.queueModel}
                                />
                              </GridItem>
                            </GridContainer>
                      },
                      {
                        title: "Admin Details",
                        content:
                        <Grid>
                            <GridContainer>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Name
                                </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="businessAdmin.givenName"
                                  inputProps={{
                                    placeholder: "Name",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.givenName}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="businessAdmin.givenName"
                                  className="input-feedback"
                                >
                                {msg => <div style={{ color: "red" }}>{msg}</div>}
                                </ErrorMessage>
                              </GridItem>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Last Name
                                </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="businessAdmin.familyName"
                                  inputProps={{
                                    placeholder: "Last Name",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.familyName}
                                />
                              </GridItem>
                            
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                 Email
                                </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="businessAdmin.email"
                                  inputProps={{
                                    placeholder: "Email",
                                    type: "email"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.email}
                                />
                              </GridItem>
                            
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                 Phone
                                </FormLabel>
                              </GridItem>
                              <GridItem >
                                <CustomInput
                                  id="businessAdmin.telephone"
                                  inputProps={{
                                    placeholder: "Phone",
                                    type: "number"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.telephone}
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                 City
                                </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                              <CustomInput
                                  id="businessAdmin.address.city"
                                  inputProps={{
                                    placeholder: "City",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.city}
                                />
                              </GridItem>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                 Country
                                </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                              <CustomInput
                                  id="businessAdmin.address.country"
                                  inputProps={{
                                    placeholder: "Country",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.country}
                                />
                              </GridItem>
                              <GridItem >
                                <FormLabel className={classes.labelHorizontal}>
                                 District
                                </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                              <CustomInput
                                  id="businessAdmin.address.district"
                                  inputProps={{
                                    placeholder: "District",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.district}
                                />
                              </GridItem>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                 Postal Code
                                </FormLabel>
                              </GridItem>
                              <GridItem>
                              <CustomInput
                                  id="businessAdmin.address.postCode"
                                  inputProps={{
                                    placeholder: "Postal Code",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.postCode}
                                />
                              </GridItem>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  State
                                </FormLabel>
                              </GridItem>
                              <GridItem>
                              <CustomInput
                                  id="businessAdmin.address.state"
                                  inputProps={{
                                    placeholder: "State",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.state}
                                />
                              </GridItem>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Street Address
                                </FormLabel>
                              </GridItem>
                              <GridItem>
                              <CustomInput
                                  id="businessAdmin.address.streetAddress"
                                  inputProps={{
                                    placeholder: "Street Address",
                                    type: "text"
                                  }}
                                  onChange={handleChange}
                                  value={values.businessAdmin.address.streetAddress}
                                />
                              </GridItem>
                            </GridContainer>
                          </Grid>
                      }
                    ]}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" onClick={handleSubmit}>
                    Create
                              </Button>
                  <Button color="rose" >
                    Delete
                              </Button>
                </CardFooter>
              </Card>
            )}
        />
        
                    </GridItem>
                
             
    )
  }
}

OrganizationCreate.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapsStateToProp = (state) => ({
  userDetails: state.user.userDetails,
  email: state.user.email,
  businessCategory: state.organization.businessCategory,
  businessCategoryLoading: state.organization.businessCategoryLoading,
  businessCategoryError: state.organization.businessCategoryError,
  organizationByAdmin: state.organization.organizationByAdmin,
  organizationByAdminLoading: state.organization.organizationByAdminLoading,
  organizationByAdminError: state.organization.organizationByAdminError
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessCategory: () => dispatch(fetchBusinessCategory()),
    createOrganization: (data, history) => dispatch(createOrganization(data, history)),
    getOrganizationByAdmin: (id) => dispatch(getOrganizationByAdmin(id))
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapsStateToProp, mapDispatchToProps),
)(OrganizationCreate);
