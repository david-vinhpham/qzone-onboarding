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
import { editProvider, fetchProvider} from '../../actions/provider';
import { fetchTimezoneOptions } from '../../actions/timezoneOptions';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import { fetchOrganizationsOptionByBusinessAdminId } from '../../actions/organization';
import defaultImage from "../../assets/img/image_placeholder.jpg";
import _ from "lodash";
import ImageUpload from '../../components/CustomUpload/ImageUpload';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
      provider: null,
      businessAdminId: null,
      timezoneOption: null,
      organizationOption: null,
      imagePreviewUrl: defaultImage,
      imageObject: null,
      data: {
        providerInformation: {
          image: null,
        }
      }
    };

    this.doubleClick = this.doubleClick.bind(this);
    this.handleTimezone = this.handleTimezone.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTimezoneOptions();
    const { id } = this.props.match.params;
    this.props.fetchProvider(id);
    const userSub = localStorage.getItem('userSub');
    if(userSub) {
      this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
    }
    localStorage.removeItem('imageObject');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.imageLoading) {
      this.setState({ provider: nextProps.provider });
      if (nextProps.provider != null && nextProps.provider.image != null) {
        this.setState({ imagePreviewUrl: nextProps.service.image.fileUrl });
      } else {
        this.setState({ imagePreviewUrl: defaultImage });
      }
    }
  }

  handleOrgChange(selectedOption) {
    this.setState({ organizationOption: selectedOption });
  }

  handleTimezone(selectedOption) {
    this.setState({ timezoneOption: selectedOption });
  }

  doubleClick(fieldName) {
    this.setState({ isEditMode: fieldName });
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

  handleProvider(values) {
    let providerInformation  = values.providerInformation;
    let imageObject = localStorage.getItem('imageObject');
    if (imageObject === null) {
      imageObject = this.state.imageObject;
    } else {
      imageObject = JSON.parse(imageObject);
    }
    if (imageObject != null) {
      providerInformation.image = imageObject;
    }
    if (!Object.is(values.imagePreviewUrl, null) && !Object.is(values.imagePreviewUrl, undefined)) {
      if (Object.is(values.providerInformation.image, null) || Object.is(values.providerInformation.image, undefined)) {
        providerInformation.image = values.imagePreviewUrl;
      }
    }
    if (!Object.is(values.imagePreviewUrl, null) && !Object.is(values.imagePreviewUrl, undefined)) {
      if (values.image === null) {
        values.image = values.imagePreviewUrl;
      }
    }
    values.providerInformation = providerInformation;
    this.props.editProvider(values, this.props.history);
  }

  render() {
    const {
      classes,
      timezones,
      organizations,
      fetchProviderLoading,
      editProviderError
    } = this.props;
    const { timezoneOption, organizationOption, provider } = this.state;
    let organizationOptions = [];
    if (organizations.length > 0) {
      organizationOptions = organizations;
    }
    if (fetchProviderLoading || !this.state.provider || this.state.provider.length === 0) {
      return (
        <BeatLoader
          className={override}
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
          imagePreviewUrl:
            this.props.imageObject ||
            (provider.data.providerInformation.image ? provider.data.providerInformation.image.fileUrl : this.state.imagePreviewUrl),
          providerInformation: {
            image: provider.data.providerInformation.image,
            description: provider.data.providerInformation.description,
            qualifications: provider.data.providerInformation.qualifications,
            tags: provider.data.providerInformation.tags,
            organizationId:
              organizationOption !== null
                ? organizationOption.value
                : provider.data.providerInformation.organizationId,
            timeZoneId:
              timezoneOption === null
                ? provider.data.providerInformation.timeZoneId
                : timezoneOption.label,
            businessId: provider.data.providerInformation.businessId
          }
        }}
        validationSchema={ProviderSchema}
        enableReinitialize
        onSubmit={values => {
          this.handleProvider(values);
        }}
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
              <GridContainer>
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
              </GridContainer>
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
              <GridContainer>
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
              </GridContainer>
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
                      value={
                        timezoneOption === null
                          ? timezones.find(element => {
                              return element.label === values.providerInformation.timeZoneId;
                            })
                          : timezoneOption
                      }
                      onChange={this.handleTimezone}
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
                      options={organizationOptions}
                      value={
                        organizationOption === null
                          ? organizationOptions.find(element => {
                              return element.value === values.providerInformation.organizationId;
                            })
                          : organizationOption
                      }
                      onChange={this.handleOrgChange}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
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
              </GridContainer>
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
    timezones: state.timezoneOptions.tzOptions,
    organizations: state.organization.organizations,
    fetchProviderLoading: state.provider.fetchProviderLoading,
    editProviderError: state.provider.editProviderError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProvider: id => dispatch(fetchProvider(id)),
    editProvider: (provider, history) => dispatch(editProvider(provider, history)),
    fetchTimezoneOptions: () => dispatch(fetchTimezoneOptions()),
    fetchOrganizationsOptionByBusinessAdminId: id =>
      dispatch(fetchOrganizationsOptionByBusinessAdminId(id))
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProviderEdit);
