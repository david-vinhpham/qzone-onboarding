import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {FormLabel, MenuItem, Select, FormControlLabel, Switch} from "@material-ui/core";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
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
import PhoneInput from 'react-phone-number-input'
import ImageUpload from "../../components/CustomUpload/ImageUpload"
import { createOrganization } from "../../actions/organization.jsx"
import { fetchBusinessCategories } from "../../actions/businessCategories";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import slide_default from "../../assets/img/slide_default.jpg";
import your_logo from "../../assets/img/your_logo.png";
import PictureUpload from "../../components/CustomUpload/PictureUpload";

const override = css`
    margin: 0 auto;
    border-color: red;
    width: 100%;
    display: flex;
    justify-content: center;
`;

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
        email: this.props.email || '',
        userSub: localStorage.getItem('userSub'),
      },
      businessAdminEmail: localStorage.getItem('loginEmail'),
      imagePreviewUrl: your_logo,
      imageChange: false,
      picturePreviewUrl: slide_default,
      pictureChange: false,

    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageLoading) {
      this.setState({ imageChange: true })
    }
    if (nextProps.pictureLoading) {
      this.setState({ pictureChange: true })
    }
  }

  componentDidMount() {
    this.props.fetchBusinessCategories()
  }

  changeProfileImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let files = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(files);
  }

  changeProfilePicture = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let files = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        picturePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(files);
  }

  change = (event, stateName, value) => {
    if (value !== undefined) {
      this.setState({ [stateName]: (value) })
    } else if (event.target.type === "number") {
      this.setState({ [stateName]: (event.target.valueAsNumber) })
    } else {
      this.setState({ [stateName]: (event.target.value) })
    }
  }

  submit = (values) => {
    let imageObject = localStorage.getItem('imageObject');
    if (imageObject !== null) {
      imageObject = JSON.parse(imageObject)
    }
    values.logo = imageObject;
    //Adv
    let pictureObject = localStorage.getItem('pictureObject');
    if (pictureObject !== null) {
      pictureObject = JSON.parse(pictureObject)
    }
    values.advPic = pictureObject;
    values.businessAdminEmail = localStorage.getItem('loginEmail');
    values.userSub = localStorage.getItem('userSub');
    this.props.createOrganization(values, this.props.history);
  }

  render() {
    const { classes, businessCategories, createOrganizationError, createOrganizationLoading } = this.props;
    if (createOrganizationLoading) {
      return < BeatLoader
        className={override}
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={createOrganizationLoading}
      />;
    }
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Formik
          initialValues={{
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
            },
            telephone: '',
            website: '',
            businessAdminEmail: '',
            userSub: '',
            imagePreviewUrl: this.props.imageObject || (this.state.image ? this.state.image.fileUrl : this.state.imagePreviewUrl),
            picturePreviewUrl: this.props.pictureObject || (this.state.picture ? this.state.picture.fileUrl : this.state.picturePreviewUrl)
          }}
          validationSchema={OrganizationCreateSchema}
          enableReinitialize={true}
          onSubmit={this.submit}
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
                {createOrganizationError !== null ? (<CardFooter className={classes.justifyContentCenter}>
                  <div style={{ color: "red" }} > {createOrganizationError.message} </div>
                </CardFooter>)
                  :
                  (<CardFooter className={classes.justifyContentCenter}>
                  </CardFooter>)}
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
                                {businessCategories.map(business => (
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
                                placeholder="e.g.+61 3 xxxx xxxx"
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
                            <GridContainer>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Organization Logo
                                </FormLabel>
                              </GridItem>
                            <GridItem xs={12} md={12}>
                              <ImageUpload imagePreviewUrl={values.imagePreviewUrl} />
                            </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem>
                                <FormLabel className={classes.labelHorizontal}>
                                  Select your marketing picture
                                </FormLabel>
                              </GridItem>
                            <GridItem xs={12} md={12}>
                              <PictureUpload picturePreviewUrl={values.picturePreviewUrl} />
                            </GridItem>
                          </GridContainer>
                          </GridContainer>
                      },
                    ]}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" onClick={handleSubmit}>
                    Create
                  </Button>
                  <Link to="#" onClick={this.props.history.goBack}>
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
  email: state.user.email,
  businessCategories: state.businessCategory.businessCategories,
  fetchBusinessCategoriesLoading: state.businessCategory.fetchBusinessCategoriesLoading,
  createOrganizationError: state.organization.createOrganizationError,
  organization: state.organization.organization,
  imageError: state.image.imageError,
  imageLoading: state.image.imageLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessCategories: () => dispatch(fetchBusinessCategories()),
    createOrganization: (data, history) => dispatch(createOrganization(data, history)),
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapsStateToProp, mapDispatchToProps),
)(OrganizationCreate);
