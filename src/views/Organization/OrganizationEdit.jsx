import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormLabel, MenuItem, Select, Grid, FormControl, FormControlLabel, Switch } from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

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
import { fetchBusinessCategory, editOrganization, getOrganizationByAdmin } from "../../actions/organization.jsx"

import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const OrganizationEditSchema = Yup.object().shape({
  name: Yup.string()
          .required("This is required Field"),
  businessCategoryId: Yup.string().required("Please select category"),
  telephone: Yup.string().required("Please enter a valid phone Number")
})

class OrganizationEdit extends React.Component {
  constructor(props) {
    super(props);
    const userDetail = JSON.parse(localStorage.getItem('user'));
    this.state = {
      name: this.props.userDetails ? this.props.userDetails.registerOrganizationName : '',
      businessAdminId: userDetail ? (userDetail.object ? userDetail.object.id : null) : null,
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organizationByAdmin && nextProps.organizationByAdmin.object)
      this.setState({ data: nextProps.organizationByAdmin.object })
  }

  componentDidMount() {
    const userDetail = JSON.parse(localStorage.getItem('user'));
    console.log("user details------", userDetail)
    if (userDetail) {
      this.props.getOrganizationByAdmin(userDetail.object.id);
    }
    this.props.getBusinessCategory()
  }

  submit = (values) => {
    values.businessAdminId = this.state.businessAdminId;
    // this is the case of 1st time registering the organization along with admin
    this.props.editOrganization(values, this.props.history);
  }

  moveToCreate = () => {
    this.props.history.push('/organization/create');
  }

  render() {
    const {
      classes,
      businessCategory,
      userDetails,
      organizationByAdmin,
      organizationByAdminLoading
    } = this.props;
    const { data } = this.state;
    let categoryOptions = [];
    if (businessCategory && businessCategory.objects) {
      categoryOptions = businessCategory.objects;
    }
    const userDetail = JSON.parse(localStorage.getItem('user'));

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (

      (<GridContainer>
        {userDetail === null ?
          <SweetAlert
            info
            title={<span> <small>Please create an organization before editing.</small></span>}
            onConfirm={this.moveToCreate}
          />
          :
          (<GridContainer>
            {organizationByAdminLoading ?
              < ClipLoader
                className={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={organizationByAdminLoading}
              />
              :
              (<GridContainer>
                {organizationByAdmin.success === false ?
                  <SweetAlert
                    info
                    title={<span> <small>Please create an organization before editing.</small></span>}
                    onConfirm={this.moveToCreate}
                  />
                  :
                  <GridItem xs={12} sm={12} md={12}>
                    {data && data.preferences ?
                      <Formik
                        initialValues={{
                          id: data.id,
                          name: data.name,
                          orgMode: data.orgMode,
                          businessCategoryId: data.businessCategoryId,
                          preferences: {
                            allowListingOnQuezone: data.preferences.allowListingOnQuezone,
                            allowReschedule: data.preferences.allowReschedule,
                            allowSmsCommunication: data.preferences.allowSmsCommunication,
                            displayPhoneNumber: data.preferences.displayPhoneNumber,
                            enableWaitlist: data.preferences.enableWaitlist,
                            isCustomerRegistrationRequired: data.preferences.isCustomerRegistrationRequired,
                            preferGuestcheckout: data.preferences.preferGuestcheckout,
                            trackManualTime: data.preferences.trackManualTime,
                            bookingHorizon: data.preferences.bookingHorizon,
                            dataRetention: data.preferences.dataRetention,
                            serviceHours: [
                              {
                                "day": "Monday",
                                "endTime": data.preferences.serviceHours[0].endTime,
                                "startTime": data.preferences.serviceHours[0].startTime
                              },
                              {
                                "day": "Tuesday",
                                "endTime": data.preferences.serviceHours[1].endTime,
                                "startTime": data.preferences.serviceHours[1].startTime
                              },
                              {
                                "day": "Wednesday",
                                "endTime": data.preferences.serviceHours[2].endTime,
                                "startTime": data.preferences.serviceHours[2].startTime
                              },
                              {
                                "day": "Thursday",
                                "endTime": data.preferences.serviceHours[3].endTime,
                                "startTime": data.preferences.serviceHours[3].startTime
                              },
                              {
                                "day": "Friday",
                                "endTime": data.preferences.serviceHours[4].endTime,
                                "startTime": data.preferences.serviceHours[4].startTime
                              },
                              {
                                "day": "Saturday",
                                "endTime": data.preferences.serviceHours[5].endTime,
                                "startTime": data.preferences.serviceHours[5].startTime
                              },
                              {
                                "day": "Sunday",
                                "endTime": data.preferences.serviceHours[6].endTime,
                                "startTime": data.preferences.serviceHours[6].startTime
                              }
                            ],
                          },
                          telephone: data.telephone,
                          logo: data.logo,
                          website: data.website,
                          queueModel: data.queueModel,
                        }}
                        validationSchema={OrganizationEditSchema}
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
                                  <h4 className={classes.cardTitle}>Edit Organization Details</h4>
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
                                          <GridItem xs={12} sm={4} style={{'flex-basis': '17.333%'}}>
                                            <CustomInput
                                              id="name"
                                              inputProps={{
                                                disabled: true,
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
                                          <GridItem xs={12} sm={3} style={{'flex-basis': '18%'}}>
                                            <FormLabel className={classes.labelHorizontal}>
                                              Mode of Organization
                                            </FormLabel>
                                          </GridItem>
                                          <GridItem xs={12} sm={3} style={{'flex-basis': '15%'}}>
                                           
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
                                        <GridContainer style={{paddingBottom: '15px'}}>
                                          <GridItem >
                                            <FormLabel className={classes.labelHorizontal}>
                                              Service Hours
                                            </FormLabel>
                                          </GridItem>
                                          {days.map((day, index) => (
                                            <div>
                                               <GridItem xs={12} sm={3} style={{'max-width': '100%'}}>
                                            <FormLabel >
                                              {day}
                                          </FormLabel>
                                          </GridItem>
                                          <GridItem xs={12} sm={3} style={{'max-width': '87%'}}>
                                            <FormControl fullWidth style={{margin:'-3px'}}>
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
                                          <GridItem xs={12} sm={3} style={{'max-width': '87%'}}>
                                            <FormControl fullWidth style={{margin:'-3px'}}>
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
                                        <Grid>
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
                                          </GridContainer>
                                          <GridContainer>
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
                                          </GridContainer>
                                          <GridContainer>
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
                                        </Grid>
                                    }
                                  ]}
                                />
                              </CardBody>
                              <CardFooter className={classes.justifyContentCenter}>
                                <Button color="rose" onClick={handleSubmit}>
                                  Update
                              </Button>
                                <Button color="rose" >
                                  Delete
                              </Button>
                              </CardFooter>
                            </Card>
                          )}
                      />
                      :
                      null
                    }
                  </GridItem>
                }
              </GridContainer>)
            }</GridContainer>)
        }
      </GridContainer>)
    )
  }
}

OrganizationEdit.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapsStateToProp = (state) => ({
  userDetails: state.user.userDetails,
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
    editOrganization: (data, history) => dispatch(editOrganization(data, history)),
    getOrganizationByAdmin: (id) => dispatch(getOrganizationByAdmin(id))
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapsStateToProp, mapDispatchToProps),
)(OrganizationEdit);
