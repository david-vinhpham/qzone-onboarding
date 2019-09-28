import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  FormLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { historyType, classesType, matchType } from 'types/global.js';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import defaultImage from '../../assets/img/image_placeholder.jpg';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import { fetchServiceCategories, fetchServiceById, editService } from '../../actions/service';
import { fetchOrganizationsByBusinessAdminId } from '../../actions/organization';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ServiceEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name too short')
    .max(50, 'Name too long')
    .required('This field is required'),
  description: Yup.string()
    .min(50, 'Description too short')
    .max(1500, 'Description too long')
    .required('this field is required'),
  duration: Yup.number().min(1),
  gapBetweenAppointments: Yup.number()
    .min(1)
    .max(600),
  numberOfParallelCustomer: Yup.number().min(1).max(999),
  bookingHorizon: Yup.number()
    .min(1)
    .max(1095)
});

class ServiceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: defaultImage,
      imageObject: null
    };
  }

  static getDerivedStateFromProps(props) {
    if (!props.imageLoading) {
      if (!!props.service && !!props.service.image) {
        return { imagePreviewUrl: props.service.image.fileUrl };
      } else {
        return { imagePreviewUrl: defaultImage };
      }
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchServiceCategories();
    const { id } = this.props.match.params;
    this.props.fetchServiceById(id);
    const userSub = localStorage.getItem('userSub');
    if (userSub) {
      this.props.fetchOrganizationsByBusinessAdminId(userSub);
    }
    localStorage.removeItem('imageObject');
  }

  saveClicked = values => {
    let imageObject = localStorage.getItem('imageObject');
    if (imageObject === null) {
      imageObject = this.state.imageObject;
    } else {
      imageObject = JSON.parse(imageObject);
    }
    if (imageObject != null) {
      values.image = imageObject;
    }
    if (!Object.is(values.imagePreviewUrl, null) && !Object.is(values.imagePreviewUrl, undefined)) {
      if (values.image === null) {
        values.image = values.imagePreviewUrl;
      }
    }
    this.props.editService(values, this.props.history);
  };

  handleService(option) {
    if (_.isEmpty(this.state.name)) this.setState({ nameState: 'error' });
    if (_.isEmpty(this.state.avgServiceTime)) this.setState({ avgServiceTimeState: 'error' });

    if (this.state.nameState === 'success' && this.state.avgServiceTimeState === 'success') {
      if (option === 'Save') {
        window.location = '/services/list';
      } else {
        window.location = '/services/create';
      }
    }
  }

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
        // provider: provider
      });
    };
    reader.readAsDataURL(files);
  }

  render() {
    const {
      classes,
      categories,
      organizations,
      fetchServiceLoading,
      editServiceError,
      service
    } = this.props;
    let categoryOptions = [];
    let organizationOptions = [];
    if (categories != null && categories.length > 0) {
      categoryOptions = categories;
    }
    if (organizations != null && organizations.length > 0) {
      organizationOptions = organizations;
    }

    if (fetchServiceLoading || !service) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchServiceLoading}
        />
      );
    }

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <Formik
            initialValues={{
              id: service.id,
              allowProviderSelection: service.allowProviderSelection,
              name: service.name,
              bookingHorizon: service.bookingHorizon,
              description: service.description,
              duration: service.duration,
              gapBetweenAppointments: service.gapBetweenAppointments,
              mode: service.mode,
              serviceCategoryId: service.serviceCategoryId,
              organizationId: service.organizationId,
              organizationName: service.organizationName,
              businessAdminId: service.businessAdminId,
              image: service.image,
              imageShow: service.image ? service.image.fileUrl : defaultImage,
              tags: service.tags,
              imagePreviewUrl:
                this.props.imageObject ||
                (service.image ? service.image.fileUrl : this.state.imagePreviewUrl)
            }}
            enableReinitialize
            validationSchema={ServiceEditSchema}
            onSubmit={values => this.saveClicked(values)}
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
                    {!!editServiceError ? (
                      <CardFooter className={classes.justifyContentCenter}>
                        <div style={{ color: 'red' }}> {editServiceError.message} </div>
                      </CardFooter>
                    ) : (
                        <>
                          <CardFooter className={classes.justifyContentCenter} />
                          <form>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>
                                  Service Organization
                            </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <FormControl fullWidth className={classes.selectFormControl}>
                                  <Select
                                    value={values.organizationId}
                                    onChange={handleChange('organizationId')}
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
                                <FormControl fullWidth className={classes.selectFormControl}>
                                  <Select
                                    value={values.serviceCategoryId}
                                    onChange={handleChange('serviceCategoryId')}
                                    name="serviceCategoryId"
                                  >
                                    {categoryOptions.map(categoryOption => (
                                      <MenuItem
                                        key={categoryOption.id}
                                        value={categoryOption.id}
                                        id="serviceCategoryId"
                                      >
                                        {categoryOption.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>Name</FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                  id="name"
                                  name="name"
                                  onChange={handleChange}
                                  value={values.name}
                                />
                                {errors.name && touched.name ? (
                                  <div style={{ color: 'red' }}>{errors.name}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>Description</FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={3}>
                                <CustomInput
                                  id="description"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    multiline: true,
                                    rows: 5
                                  }}
                                  value={values.description}
                                  onChange={handleChange}
                                />
                                {errors.description && touched.description ? (
                                  <div style={{ color: 'red' }}>{errors.description}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>
                                  Duration of Service
                            </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                  placeholder="in mins"
                                  id="duration"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'number'
                                  }}
                                  value={values.duration}
                                  onChange={handleChange}
                                />
                                {errors.duration && touched.duration ? (
                                  <div style={{ color: 'red' }}>{errors.duration}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>
                                  Booking Horizon
                            </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                  placeholder="in mins"
                                  id="bookingHorizon"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'number'
                                  }}
                                  value={values.bookingHorizon}
                                  onChange={handleChange}
                                />
                                {errors.bookingHorizon && touched.bookingHorizon ? (
                                  <div style={{ color: 'red' }}>{errors.bookingHorizon}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>Tags</FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                  placeholder="Tags"
                                  id="tags"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'text'
                                  }}
                                  value={values.tags}
                                  onChange={handleChange}
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel
                                  className={`${classes.labelHorizontal} ${
                                    classes.labelHorizontalRadioCheckbox
                                    }`}
                                >
                                  Service Mode
                            </FormLabel>
                              </GridItem>

                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={values.mode === 'SCHEDULE'}
                                      onChange={handleChange}
                                      value="SCHEDULE"
                                      name="mode"
                                      aria-label="Appointment"
                                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                      checkedIcon={
                                        <FiberManualRecord className={classes.radioChecked} />
                                      }
                                      classes={{
                                        checked: classes.radio
                                      }}
                                    />
                                  }
                                  classes={{
                                    label: classes.label
                                  }}
                                  label="Appointment"
                                />
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={values.mode === 'QUEUE'}
                                      onChange={handleChange}
                                      value="QUEUE"
                                      name="mode"
                                      aria-label="Queue"
                                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                      checkedIcon={
                                        <FiberManualRecord className={classes.radioChecked} />
                                      }
                                      classes={{
                                        checked: classes.radio
                                      }}
                                    />
                                  }
                                  classes={{
                                    label: classes.label
                                  }}
                                  label="Queue"
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel
                                  className={`${classes.labelHorizontal} ${
                                    classes.labelHorizontalRadioCheckbox
                                    }`}
                                >
                                  Allow Provider Selection
                            </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={2}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      name="allowProviderSelection"
                                      checked={values.allowProviderSelection}
                                      value="allowProviderSelection"
                                      onChange={handleChange}
                                    />
                                  }
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={3}>
                                <FormLabel className={classes.labelHorizontal}>
                                  Gap between Appointments
                            </FormLabel>
                              </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                  placeholder="in mins"
                                  id="gapBetweenAppointments"
                                  name="gapBetweenAppointments"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: 'number'
                                  }}
                                  onChange={handleChange}
                                  value={values.gapBetweenAppointments}
                                />
                                {errors.gapBetweenAppointments && touched.gapBetweenAppointments ? (
                                  <div style={{ color: 'red' }}>{errors.gapBetweenAppointments}</div>
                                ) : null}
                              </GridItem>
                            </GridContainer>
                            {/* <GridContainer>
                                              <GridItem xs={12} md={12}>
                                                <div className="fileinput text-center">
                                                  <div className={"thumbnail"}>
                                                   <img src={values.imageShow} alt="..." />
                                                  </div>
                                                </div>
                                              </GridItem>
                                          </GridContainer> */}
                            <GridContainer>
                              <GridItem xs={12} md={12}>
                                <ImageUpload imagePreviewUrl={values.imageShow} />
                              </GridItem>
                            </GridContainer>
                          </form>
                        </>
                      )}
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
              )}
          />
        </Card>
      </GridItem>
    );
  }
}

ServiceEdit.propTypes = {
  classes: classesType.isRequired,
  history: historyType.isRequired,
  imageObject: PropTypes.string,
  fetchOrganizationsByBusinessAdminId: PropTypes.func.isRequired,
  fetchServiceCategories: PropTypes.func.isRequired,
  fetchServiceById: PropTypes.func.isRequired,
  editService: PropTypes.func.isRequired,
  imageLoading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  service: PropTypes.shape({
    id: PropTypes.string,
  }),
  fetchServiceLoading: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  editServiceError: PropTypes.string,
  match: matchType.isRequired
};

ServiceEdit.defaultProps = {
  imageObject: null,
  service: null,
  editServiceError: null,
};

const mapStateToProps = state => {
  return {
    imageObject: state.image.image,
    imageError: state.image.imageError,
    imageLoading: state.image.imageLoading,
    categories: state.service.serviceCategories,
    service: state.service.service,
    fetchServiceLoading: state.service.fetchServiceLoading,
    organizations: state.organization.organizations,
    editServiceError: state.service.editServiceError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizationsByBusinessAdminId: id => dispatch(fetchOrganizationsByBusinessAdminId(id)),
    fetchServiceCategories: () => dispatch(fetchServiceCategories()),
    fetchServiceById: id => dispatch(fetchServiceById(id)),
    editService: (values, history) => dispatch(editService(values, history))
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ServiceEdit);
