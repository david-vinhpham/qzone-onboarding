import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormLabel } from '@material-ui/core';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import { editProvider, fetchProvider } from '../../actions/provider';
import { fetchTimezoneOptions } from '../../actions/timezoneOptions';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import { fetchOrganizationsOptionByBusinessAdminId } from '../../actions/organization';
import defaultImage from "../../assets/img/image_placeholder.jpg";
import _ from "lodash";
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import { weekDays, defaultWorkingHours } from 'constants.js';
import { formatTimeToString } from 'utils/formatTime.js';

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  display: flex;
  justify-content: center;`;

const ProviderSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Please write correct format'),
  givenName: Yup.string()
    .required('This field is required')
    .min(3, 'Name should be atleast 3 letters')
    .max(40, 'Too Long')
});

class ProviderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        providerInformation: {
          image: null,
        }
      }
    };
  }

  componentDidMount() {
    this.props.fetchTimezoneOptions();
    const { id } = this.props.match.params;
    this.props.fetchProvider(id);
    const userSub = localStorage.getItem('userSub');
    if (userSub) {
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
    }
    localStorage.removeItem('imageObject');
  }

  doubleClick = (fieldName) => {
    this.setState({ isEditMode: fieldName });
  }

  change = (event, stateName) => {
    if (_.isEmpty(event.target.value)) this.setState({ [`${stateName}State`]: 'error' });
    else {
      this.setState({ [`${stateName}State`]: 'success' });
    }
    this.setState({ [stateName]: event.target.value || event.target.checked });
  }

  handleProvider = (values) => {
    const { provider: { data }, imageObject, history } = this.props;
    values.imageUrl = imageObject
      ? imageObject.fileUrl
      : data.providerInformation.image.fileUrl;
    values.providerInformation = {
      ...values.providerInformation,
      organizationId: values.providerInformation.organizationId.value,
      timeZoneId: values.providerInformation.timeZoneId.label,
      image: imageObject || data.providerInformation.image,
      workingHours: Object.keys(values.providerInformation.workingHours).map(day => {
        const startTime = values.providerInformation.workingHours[day].startTime.split(':');
        const endTime = values.providerInformation.workingHours[day].endTime.split(':');
        return {
          day,
          startTime: {
            hour: parseInt(startTime[0], 10),
            minute: parseInt(startTime[1], 10),
          },
          endTime: {
            hour: parseInt(endTime[0], 10),
            minute: parseInt(endTime[1], 10),
          },
        }
      }),
    };

    this.props.editProvider(values, history);
  }

  selectTimeZoneAndOrg = (setFieldValue, key) => (value) => {
    setFieldValue(key, value);
  }

  render() {
    const {
      classes,
      timezones,
      organizations,
      fetchProviderLoading,
      editProviderError,
      provider
    } = this.props;
    if (fetchProviderLoading || !provider || !provider.data || provider.length === 0) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={fetchProviderLoading}
        />
      );
    }

    return (
      <Formik
        initialValues={{
          id: provider.data.id,
          email: provider.data.email,
          familyName: provider.data.familyName === null ? '' : provider.data.familyName,
          givenName: provider.data.givenName,
          telephone: provider.data.telephone,
          userStatus: provider.data.userStatus,
          userSub: provider.data.userSub,
          userType: provider.data.userType,
          provider: 'aws',
          imageShow: provider.data.providerInformation.image ? provider.data.providerInformation.image.fileUrl : defaultImage,
          providerInformation: {
            ...provider.data.providerInformation,
            organizationId: organizations.find(org => org.value === provider.data.providerInformation.organizationId),
            timeZoneId: timezones.find(tz => tz.label === provider.data.providerInformation.timeZoneId),
            workingHours: provider.data.providerInformation.workingHours.length > 0
              ? provider.data.providerInformation.workingHours.reduce((acc, value) => {
                return {
                  ...acc,
                  [value.day]: {
                    startTime: `${
                      formatTimeToString(value.startTime.hour)
                      }:${
                      formatTimeToString(value.startTime.minute)
                      }`,
                    endTime: `${
                      formatTimeToString(value.endTime.hour)
                      }:${
                      formatTimeToString(value.endTime.minute)
                      }`,
                  },
                };
              }, {})
              : { ...defaultWorkingHours },
          }
        }}
        validationSchema={ProviderSchema}
        onSubmit={this.handleProvider}
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
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Edit Provider</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                {editProviderError !== null ? (
                  <CardFooter className={classes.justifyContentCenter}>
                    <div style={{ color: 'red' }}> {editProviderError.message} </div>
                  </CardFooter>
                ) : (
                    <CardFooter className={classes.justifyContentCenter} />
                  )}
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Given Name</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      id="givenName"
                      name="givenName"
                      onChange={handleChange}
                      value={values.givenName}
                    />
                    {errors.givenName && touched.givenName ? (
                      <div style={{ color: 'red' }}>{errors.givenName}</div>
                    ) : null}
                  </GridItem>
                </GridContainer>
               {/* <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Family Name</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      id="familyName"
                      name="familyName"
                      onChange={handleChange}
                      value={values.familyName}
                    />
                  </GridItem>
                </GridContainer>*/}
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Email</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: 'red' }}>{errors.email}</div>
                    ) : null}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Telephone</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <PhoneInput
                      id="telephone"
                      placeholder="e.g.+61 3 xxxx xxxx"
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
               {/* <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Description</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      id="providerInformation.description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3
                      }}
                      value={values.providerInformation.description}
                      onChange={handleChange}
                    />
                    {errors.description && touched.description ? (
                      <div style={{ color: 'red' }}>{errors.description}</div>
                    ) : null}
                  </GridItem>
                </GridContainer>*/}
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel
                      className={`${classes.labelHorizontal} ${classes.labelHorizontalRadioCheckbox}`}
                    >
                      Time Zone
                  </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        options={timezones}
                        value={values.providerInformation.timeZoneId}
                        name="providerInformation.timeZoneId"
                        onChange={this.selectTimeZoneAndOrg(setFieldValue, 'providerInformation.timeZoneId')}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Service Organization</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={4}>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        options={organizations}
                        value={values.providerInformation.organizationId}
                        name="providerInformation.organizationId"
                        onChange={this.selectTimeZoneAndOrg(setFieldValue, 'providerInformation.organizationId')}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Working Hours
                    </FormLabel>
                  </GridItem>
                  <GridItem sm={9}>
                    <GridContainer>
                      {weekDays.map((day) => (
                        <GridItem className={classes.workingHours} xs={3} lg={2} key={`providerInformation.workingHours[${day}]`}>
                          <label>{day}</label>
                          <CustomInput
                            inputProps={{
                              placeholder: "Start Time",
                              type: "time",
                              name: `providerInformation.workingHours[${day}].startTime`
                            }}
                            onChange={handleChange}
                            value={values.providerInformation.workingHours[day].startTime}
                          />
                          <CustomInput
                            inputProps={{
                              placeholder: "End Time",
                              type: "time",
                              name: `providerInformation.workingHours[${day}].endTime`
                            }}
                            onChange={handleChange}
                            value={values.providerInformation.workingHours[day].endTime}
                          />
                        </GridItem>
                      ))}
                    </GridContainer>
                  </GridItem>
                </GridContainer>
               {/* <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Tags</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      id="providerInformation.tags"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3
                      }}
                      placeholder="tag1,tag2,tag3,..."
                      value={values.providerInformation.tags}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>Qualifications</FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      id="providerInformation.qualifications"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3
                      }}
                      placeholder="Empathy,Thick Skin,Flexibility,..."
                      value={values.providerInformation.qualifications}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>*/}
                <GridContainer>
                  <GridItem xs={12} md={12}>
                    <ImageUpload imagePreviewUrl={values.imageShow} />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" onClick={handleSubmit}>
                  Update
              </Button>
                <Button color="rose" onClick={this.props.history.goBack}>
                  Exit
              </Button>
              </CardFooter>
            </Card>
          )}
      />
    );
  }
}

ProviderEdit.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    imageObject: state.image.image,
    imageError: state.image.imageError,
    imageLoading: state.image.imageLoading,
    provider: state.provider.provider,
    timezones: state.options.timezone.tzOptions,
    organizations: state.organization.organizations,
    fetchProviderLoading: state.provider.fetchProviderLoading,
    editProviderError: state.provider.editProviderError
  };
};

const mapDispatchToProps = {
  fetchProvider,
  editProvider,
  fetchTimezoneOptions,
  fetchOrganizationsOptionByBusinessAdminId,
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProviderEdit);
