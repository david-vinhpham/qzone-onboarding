import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, MenuItem, Select, FormControlLabel, Switch, FormControl } from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
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
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { fetchBusinessCategory, createOrganization, getOrganizationByAdmin } from "../../actions/organization.jsx"

import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

const OrganizationCreateSchema = Yup.object().shape({
  name: Yup.string()
          .required("This is required Field"),
  businessCategoryId: Yup.string().required("Please select category"),
  telephone: Yup.string().required("Please enter a valid phone Number"),
})


class OrganizationCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessAdmin: {
        cognitoToken: localStorage.getItem('CognitoIdentityServiceProvider.3ov1blo2eji4acnqfcv88tcidn.' + (localStorage.getItem('username')) + '.idToken'),
        email: this.props.email ? this.props.email : '',
        userSub: localStorage.getItem('userSub'),
      },
      businessAdminEmail: localStorage.getItem('loginEmail'),
    };
  }

  componentDidMount() {
    this.props.getBusinessCategory()
  }

  submit = (values) => {
    values.businessAdminEmail = localStorage.getItem('loginEmail');
    values.userSub = localStorage.getItem('userSub');
    this.props.createOrganization(values, this.props.history);
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
                  "endTime": "18:00",
                  "startTime": "09:00"
                },
                {
                  "day": "Tuesday",
                  "endTime": "18:00",
                  "startTime": "09:00"
                },
                {
                  "day": "Wednesday",
                  "endTime": "18:00",
                  "startTime": "09:00"
                },
                {
                  "day": "Thursday",
                  "endTime": "18:00",
                  "startTime": "09:00"
                },
                {
                  "day": "Friday",
                  "endTime": "18:00",
                  "startTime": "09:00"
                },
                {
                  "day": "Saturday",
                  "endTime": "00:00",
                  "startTime": "00:00"
                },
                {
                  "day": "Sunday",
                  "endTime": "00:00",
                  "startTime": "00:00"
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
            businessAdminEmail: '',
            userSub: ''
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
            setFieldValue
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
                                <PhoneInput
                                  id="telephone"
                                  placeholder="Enter phone number"
                                  country="AU"
                                  name={'telephone'}
                                  value={values['telephone']}
                                  onChange={e => setFieldValue('telephone', e)}
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
                    ]}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" onClick={handleSubmit}>
                    Create
                  </Button>
                  <Link to={`/organization/list`}>
                    <Button color="rose" >
                      Close
                    </Button>
                  </Link>
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
