import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Switch
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardText from 'components/Card/CardText.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Accordion from 'components/Accordion/Accordion.jsx';

import PhoneInput from 'react-phone-number-input';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import _ from 'lodash';
import { classesType, historyType, matchType, businessCategoryType } from 'types/global.js';
import defaultImage from '../../assets/img/image_placeholder.jpg';
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import {
  editOrganization,
  fetchOrganization
} from '../../actions/organization.jsx';
import { fetchBusinessCategories } from "../../actions/businessCategories";
import { weekDays } from 'constants.js';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OrganizationEditSchema = Yup.object().shape({
  name: Yup.string().required('This is required Field'),
  businessCategoryId: Yup.string().required('Please select category'),
  telephone: Yup.string().required('Please enter a valid phone Number')
});

class OrganizationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      imagePreviewUrl: defaultImage,
      imageObject: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchOrganization(id);
    this.props.fetchBusinessCategories();
    localStorage.removeItem('imageObject');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.imageLoading) {
      this.setState({ data: nextProps.organization });
      if (nextProps.organization !== null && nextProps.organization.logo != null) {
        this.setState({ imagePreviewUrl: nextProps.organization.logo.fileUrl });
      } else {
        this.setState({ imagePreviewUrl: defaultImage });
      }
    }
  }

  submit = values => {
    let imageObject = localStorage.getItem('imageObject');
    if (imageObject === null) {
      imageObject = this.state.imageObject;
    } else {
      imageObject = JSON.parse(imageObject);
    }
    if (imageObject != null) {
      values.logo = imageObject;
    }
    if (!Object.is(values.imagePreviewUrl, null) && !Object.is(values.imagePreviewUrl, undefined)) {
      if (values.logo === null) {
        values.logo = values.imagePreviewUrl;
      }
    }
    this.props.editOrganization(values, this.props.history);
  };

  moveToCreate = () => {
    this.props.history.push('/organization/list');
  };

  change(event, stateName) {
    if (_.isEmpty(event.target.value)) this.setState({ [`${stateName}State`]: 'error' });
    else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    this.setState({ [stateName]: event.target.value || event.target.checked });
  }

  handleImageChange(e) {
    const self = this;
    e.preventDefault();
    const reader = new FileReader();
    const files = e.target.files[0];
    reader.onloadend = () => {
      self.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(files);
  }

  render() {
    const {
      classes,
      businessCategories,
      fetchOrganizationLoading,
      editOrganizationError
    } = this.props;

    const { data } = this.state;
    if (fetchOrganizationLoading || !this.state.data || this.state.data.length === 0) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchOrganizationLoading}
        />
      );
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {data && data.preferences ? (
            <Formik
              initialValues={{
                id: data.id,
                name: data.name,
                orgMode: data.orgMode,
                businessCategoryId: data.businessCategoryId,
                imageShow: data.logo ? data.logo.fileUrl : defaultImage,
                imagePreviewUrl:
                  this.props.imageObject ||
                  (this.state.data.logo
                    ? this.state.data.logo.fileUrl
                    : this.state.imagePreviewUrl),
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
                      day: 'Monday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[0].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[0].startTime
                          : ''
                    },
                    {
                      day: 'Tuesday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[1].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[1].startTime
                          : ''
                    },
                    {
                      day: 'Wednesday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[2].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[2].startTime
                          : ''
                    },
                    {
                      day: 'Thursday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[3].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[3].startTime
                          : ''
                    },
                    {
                      day: 'Friday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[4].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[4].startTime
                          : ''
                    },
                    {
                      day: 'Saturday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[5].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[5].startTime
                          : ''
                    },
                    {
                      day: 'Sunday',
                      endTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[6].endTime
                          : '',
                      startTime:
                        data.preferences.serviceHours.length > 0
                          ? data.preferences.serviceHours[6].startTime
                          : ''
                    }
                  ]
                },
                telephone: data.telephone,
                logo: data.logo,
                website: data.website,
                queueModel: data.queueModel,
                businessAdminEmail: data.businessAdminEmail,
                userSub: data.userSub
              }}
              validationSchema={OrganizationEditSchema}
              enableReinitialize
              onSubmit={values => this.submit(values)}
              render={({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                <Card>
                  <CardHeader color="rose" text>
                    <CardText color="rose">
                      <h4 className={classes.cardTitle}>Edit Organization Details</h4>
                    </CardText>
                  </CardHeader>
                  {editOrganizationError !== null ? (
                    <CardFooter className={classes.justifyContentCenter}>
                      <div style={{ color: 'red' }}> {editOrganizationError.message} </div>
                    </CardFooter>
                  ) : (
                    <CardFooter className={classes.justifyContentCenter} />
                  )}
                  <CardBody>
                    <Accordion
                      active={0}
                      collapses={[
                        {
                          title: 'About',
                          content: (
                            <GridContainer>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>Name</FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4} style={{ 'flexBasis': '17.333%' }}>
                                <CustomInput
                                  id="name"
                                  inputProps={{
                                    disabled: false,
                                    placeholder: 'Name',
                                    type: 'text'
                                  }}
                                  onChange={handleChange}
                                  value={values.name}
                                />
                                {errors.name && touched.name ? (
                                  <div style={{ color: 'red' }}>{errors.name}</div>
                                ) : null}
                              </GridItem>
                              <GridItem xs={12} sm={3} style={{ 'flexBasis': '18%' }}>
                                <FormLabel className={classes.labelHorizontal}>
                                  Mode of Organization
                                </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={3} style={{ 'flexBasis': '15%' }}>
                                <Select
                                  value={values.orgMode}
                                  onChange={handleChange('orgMode')}
                                  name="orgMode"
                                  style={{ paddingTop: '16%' }}
                                  fullWidth
                                  MenuProps={{
                                    className: classes.selectMenu
                                  }}
                                  classes={{
                                    select: classes.select
                                  }}
                                >
                                  <MenuItem value="PROVIDER_BASED">PROVIDER_BASED</MenuItem>
                                  <MenuItem value="COUNTER_BASED">COUNTER_BASED</MenuItem>
                                  <MenuItem value="ANY">ANY</MenuItem>
                                </Select>
                              </GridItem>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Business Category
                                </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={3}>
                                <Select
                                  style={{ paddingTop: '9%' }}
                                  fullWidth
                                  MenuProps={{
                                    className: classes.selectMenu
                                  }}
                                  classes={{
                                    select: classes.select
                                  }}
                                  value={values.businessCategoryId}
                                  onChange={handleChange('businessCategoryId')}
                                  name="businessCategoryId"
                                >
                                  {businessCategories.map(business => (
                                    <MenuItem key={business.id} value={business.id}>
                                      {business.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.businessCategoryId && touched.businessCategoryId ? (
                                  <div style={{ color: 'red' }}>{errors.businessCategoryId}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                          )
                        },
                        {
                          title: 'Preferences',
                          content: (
                            <div>
                              <GridContainer style={{ paddingBottom: '15px' }}>
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Service Hours
                                  </FormLabel>
                                </GridItem>
                                {weekDays.map((day, index) => (
                                  <div key={day}>
                                    <GridItem xs={12} sm={3} style={{ 'maxWidth': '100%' }}>
                                      <FormLabel>{day}</FormLabel>
                                    </GridItem>
                                    <GridItem xs={12} sm={3} style={{ 'maxWidth': '100%' }}>
                                      <FormControl fullWidth style={{ margin: '-1px' }}>
                                        <CustomInput
                                          id={`preferences.serviceHours[${index}].startTime`}
                                          inputProps={{
                                            placeholder: 'Start Time',
                                            type: 'time'
                                          }}
                                          onChange={handleChange}
                                          value={values.preferences.serviceHours[index].startTime}
                                        />
                                      </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={3} style={{ 'maxWidth': '100%' }}>
                                      <FormControl fullWidth style={{ margin: '-1px' }}>
                                        <CustomInput
                                          id={`preferences.serviceHours[${index}].endTime`}
                                          value={values.preferences.serviceHours[index].endTime}
                                          inputProps={{ placeholder: 'End Time', type: 'time' }}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                    className={`${classes.labelHorizontal} ${
                                      classes.labelHorizontalRadioCheckbox
                                    }`}
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
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Booking Horizon
                                  </FormLabel>
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    id="preferences.bookingHorizon"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      placeholder: 'Booking Horizon',
                                      type: 'number'
                                    }}
                                    onChange={handleChange}
                                    value={values.preferences.bookingHorizon}
                                  />
                                </GridItem>
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Data Retention
                                  </FormLabel>
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    id="preferences.dataRetention"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: 'number',
                                      placeholder: 'Data Retention'
                                    }}
                                    onChange={handleChange}
                                    value={values.preferences.dataRetention}
                                  />
                                </GridItem>
                              </GridContainer>
                            </div>
                          )
                        },
                        {
                          title: 'Personal Information',
                          content: (
                            <Grid>
                              <GridContainer>
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Phone Number
                                  </FormLabel>
                                </GridItem>
                                <GridItem>
                                  <PhoneInput
                                    id="telephone"
                                    placeholder="Enter phone number"
                                    country="AU"
                                    name="telephone"
                                    value={values.telephone}
                                    onChange={e => setFieldValue('telephone', e)}
                                  />
                                  {errors.telephone && touched.telephone ? (
                                    <div style={{ color: 'red' }}>{errors.telephone}</div>
                                  ) : null}
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>Website</FormLabel>
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    id="website"
                                    inputProps={{
                                      placeholder: 'Website',
                                      type: 'text'
                                    }}
                                    onChange={handleChange}
                                    value={values.website}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                {/* <GridItem>
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
                                            </GridItem> */}
                                <GridItem>
                                  <FormLabel className={classes.labelHorizontal}>
                                    Organization Image
                                  </FormLabel>
                                </GridItem>
                                <GridItem xs={12} md={12}>
                                  <ImageUpload imagePreviewUrl={values.imageShow} />
                                </GridItem>
                              </GridContainer>
                            </Grid>
                          )
                        }
                      ]}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button color="rose" onClick={handleSubmit}>
                      Update
                    </Button>
                    <Link to="/organization/list">
                      <Button color="rose">Exit</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            />
          ) : null}
        </GridItem>
      </GridContainer>
    );
  }
}

OrganizationEdit.propTypes = {
  classes: classesType.isRequired,
  imageObject: PropTypes.string,
  history: historyType.isRequired,
  match: matchType.isRequired,
  fetchBusinessCategories: PropTypes.func.isRequired,
  editOrganization: PropTypes.func.isRequired,
  fetchOrganization: PropTypes.func.isRequired,
  imageLoading: PropTypes.bool.isRequired,
  organization: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  businessCategories: PropTypes.arrayOf(businessCategoryType).isRequired,
  fetchOrganizationLoading: PropTypes.bool.isRequired,
  editOrganizationError: PropTypes.objectOf(PropTypes.string)
};

OrganizationEdit.defaultProps = {
  imageObject: null,
  editOrganizationError: null
};

const mapsStateToProp = state => ({
  businessCategories: state.businessCategory.businessCategories,
  fetchBusinessCategoriesLoading: state.businessCategory.fetchBusinessCategoriesLoading,
  organization: state.organization.organization,
  editOrganizationLoading: state.organization.editOrganizationLoading,
  editOrganizationError: state.organization.editOrganizationError,
  fetchOrganizationLoading: state.organization.fetchOrganizationLoading,
  imageObject: state.image.image,
  imageError: state.image.imageError,
  imageLoading: state.image.imageLoading
});

const mapDispatchToProps = dispatch => {
  return {
    fetchBusinessCategories: () => dispatch(fetchBusinessCategories()),
    editOrganization: (data, history) => dispatch(editOrganization(data, history)),
    fetchOrganization: id => dispatch(fetchOrganization(id))
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapsStateToProp,
    mapDispatchToProps
  )
)(OrganizationEdit);
