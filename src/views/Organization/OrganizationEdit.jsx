import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, FormControl, InputLabel, MenuItem, Select, ListItemText, Grid } from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';

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
import CustomRadio from "components/CustomRadio/CustomRadio.jsx";
import { fetchBusinessCategory, createOrganization, getOrganizationByAdmin } from "../../actions/organization.jsx"

import _ from 'lodash';
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

const userDetail = JSON.parse(localStorage.getItem('user'));

class OrganizationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      name: this.props.userDetails ? this.props.userDetails.registerOrganizationName : '',
      organizationNameState: null,
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
            "endTime": "string",
            "startTime": "string"
          }
        ],
      },
      phone: {
        areaCode: '',
        countryCode: '',
        number:''
      },
      logo: '',
      website: '',
      queueModel: '',
      businessAdmin: {
        cognitoToken: localStorage.getItem('CognitoIdentityServiceProvider.3ov1blo2eji4acnqfcv88tcidn.' + (localStorage.getItem('username')) + '.idToken'),
        email: this.props.email ? this.props.email : '',
        userSub: localStorage.getItem('username'),
        userName: localStorage.getItem('username')
      }
    };

    this.change = this.change.bind(this);
  }

  change(event, stateName, type, value) {
    if (type !== undefined && value !== undefined) {
      this.setState({
        ...this.state,
        [stateName]: {
          ...this.state[stateName],
          [type]: value
        }
      })
    } else if (type !== undefined) {
      this.setState({
        ...this.state,
        [stateName]: {
          ...this.state[stateName],
          [type]: event.target.value
        }
      })
    }

    else {
      this.setState({ [stateName]: (event.target.value || event.target.checked) })
    }
    console.log("state value----", this.state)
  }

  componentDidMount() {
    console.log("user details------", this.userDetails)
    if (this.userDetails.object.id !== null) {
      this.props.getOrganizationByAdmin(this.userDetails.object.id);
    }
    this.props.getBusinessCategory()
  }

  submit = () => {
    
    this.props.createOrganization(this.state);
  }

  render() {
    const { classes, businessCategory, userDetails } = this.props;
    let categoryOptions = [];
    if(businessCategory && businessCategory.objects) {
      categoryOptions = businessCategory.objects;
    }
    return (
      <GridItem xs={12} sm={12} md={12}>
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
                      <GridItem>
                        <FormLabel className={classes.labelHorizontal}>
                          Name
                        </FormLabel>
                      </GridItem>
                      <GridItem >
                        <CustomInput
                          labelText="Name"
                          success={this.state.organizationNameState === "success"}
                          error={this.state.organizationNameState === "error"}
                          id="name"
                          inputProps={{
                            onChange: event =>
                              this.change(event, "name"),
                            type: "text"
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                          Mode of Organization
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
                          value={this.state.orgMode}
                          onChange={(event) => { this.change(event, "orgMode") }}
                          inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                          }}>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="PROVIDER_BASED">
                            PROVIDER_BASED
                            </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="COUNTER_BASED">
                            COUNTER_BASED
                            </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="ANY">
                            ANY
                            </MenuItem>
                        </Select>
                      </GridItem>
                      <GridItem xs={12} sm={3}> 
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
                          value={this.state.businessCategoryId}
                          onChange={(event) => { this.change(event, "businessCategoryId") }}
                          inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                          }}>
                          {categoryOptions.map(business => (
                            <MenuItem key={business.id} value={business.id}>
                              <ListItemText primary={business.name} />
                            </MenuItem>
                          )) }
                        </Select>
                      </GridItem>
                    </GridContainer>
                },
                {
                  title: "Preferences",
                  content:
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
                        <CustomRadio
                          checkedValue={this.state.preferences.allowListingOnQuezone}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event, "preferences", "allowListingOnQuezone", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.allowListingOnQuezone}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "allowListingOnQuezone", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.allowReschedule}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "allowReschedule", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.allowReschedule}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "allowReschedule", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.allowSmsCommunication}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "allowSmsCommunication", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.allowSmsCommunication}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "allowSmsCommunication", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.displayPhoneNumber}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event, "preferences","displayPhoneNumber", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.displayPhoneNumber}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "displayPhoneNumber", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.enableWaitlist}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "enableWaitlist", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.enableWaitlist}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "enableWaitlist", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.isCustomerRegistrationRequired}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "isCustomerRegistrationRequired", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.isCustomerRegistrationRequired}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "isCustomerRegistrationRequired", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.preferGuestcheckout}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "preferGuestcheckout", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.preferGuestcheckout}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "preferGuestcheckout", false)} />
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
                        <CustomRadio
                          checkedValue={this.state.preferences.trackManualTime}
                          label="Yes"
                          value={true}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "trackManualTime", true)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={2}>
                        <CustomRadio
                          checkedValue={this.state.preferences.trackManualTime}
                          label="No"
                          value={false}
                          classes={classes}
                          onClick={event =>
                            this.change(event,"preferences", "trackManualTime", false)} />
                      </GridItem>
                      <GridItem >
                        <FormLabel className={classes.labelHorizontal}>
                          Booking Horizon
                          </FormLabel>
                      </GridItem>
                      <GridItem >
                        <CustomInput
                          labelText="Booking Horizon"
                          id="bookingHorizon"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: event =>
                              this.change(event,"preferences", "bookingHorizon"),
                            type: "number"
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                          Data Retention
                          </FormLabel>
                      </GridItem>
                      <GridItem xs={12} sm={3}>
                        <CustomInput
                          labelText="Data Retention"
                          id="dataRetention"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: event =>
                              this.change(event,"preferences", "dataRetention"),
                            type: "number"
                          }}
                        />
                      </GridItem>
                    </GridContainer>
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
                          labelText="Country Code"
                          id="countryCode"
                          inputProps={{
                            onChange: event =>
                              this.change(event, "phone", "countryCode"),
                            type: "text"
                          }}
                        />
                        <CustomInput
                          labelText="Area Code"
                          id="areaCode"
                          inputProps={{
                            onChange: event =>
                              this.change(event,"phone", "areaCode"),
                            type: "text"
                          }}
                        />
                        <CustomInput
                          labelText="Phone Number"
                          id="number"
                          inputProps={{
                            onChange: event =>
                              this.change(event,"phone", "number"),
                            type: "text"
                          }}
                        />
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
                            labelText="Website"
                            id="website"
                            inputProps={{
                              onChange: event =>
                                this.change(event, "website"),
                              type: "text"
                            }}
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
                            labelText="Queue Model"
                            id="queueModel"
                            inputProps={{
                              onChange: event =>
                                this.change(event, "queueModel"),
                              type: "text"
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </Grid>
                }
              ]}
            />
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="rose" onClick={() => this.submit(userDetails)}>
              Update
            </Button>
            <Button color="rose" >
              Delete
            </Button>
          </CardFooter>
        </Card>

      </GridItem>
    )
  }
}

OrganizationEdit.propTypes = {
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
    createOrganization: (data) => dispatch(createOrganization(data)),
    getOrganizationByAdmin: (id) => dispatch(getOrganizationByAdmin(id))
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapsStateToProp, mapDispatchToProps),
)(OrganizationEdit);
