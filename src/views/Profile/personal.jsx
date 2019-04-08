import React, { PureComponent } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/CheckCircleOutlined';
import PhoneInput from 'react-phone-number-input';
import CustomInput from '../../components/CustomInput/CustomInput';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import personalPageStyles from '../../assets/jss/material-dashboard-pro-react/modules/personalPageStyles';
import 'react-phone-number-input/style.css';

const PersonalSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Please write correct format'),
  givenName: Yup.string()
    .required('This field is required')
    .min(3, 'Name should be atleast 3 letters')
    .max(40, 'Too Long')
});

class Personal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      user: this.props,
    };
  }

  changeEditMode = () => {
    this.setState({ isEditMode: true });
  };

  cancelEdit = () => {
    this.setState(
      { isEditMode: false },
    );
    let userInfo = localStorage.getItem('user');
    userInfo = JSON.parse(userInfo);
    this.setState({ user: userInfo });
  };

  saveEdit(values) {
    console.log('saveEdit');
    let address  = values.address;
    values.address = address;
    this.props.editProvider(values, this.props.history);
  };

  render() {
    const {
      classes,
    } = this.props;
    const { user, isEditMode, ...oldPersonalInfo } = this.state;
    let isPersonalModified = true;
    console.log('user: ' + user);
    return (
        <Formik
        initialValues={{
          id: user.id,
          email: this.props.email,
          givenName:this.props.givenName === null ? '' : this.props.givenName,
          familyName: this.props.familyName === null ? '' : this.props.familyName,
          telephone: this.props.telephone === null ? '' : this.props.telephone,
          userStatus: this.props.userStatus === null ? '' : this.props.userStatus,
          userType:this.props.userType === null ? '' : this.props.userType,
          address: {
            streetAddress: (this.props.address === null ||  this.props.address.streetAddress === undefined )? '' :
              (this.props.address.streetAddress === null ? '' : this.props.address.streetAddress),
            city: (user === null ||  user.address === undefined )? '' :
              (user.address.city === null ? '' : user.address.city),
            state: (this.props.address === null ||  this.props.address.state === undefined )? '' :
              (this.props.address.state === null ? '' : this.props.address.state),
            postCode: (this.props.address === null ||  this.props.address.postCode === undefined )? '' :
              (this.props.address.postCode === null ? '' : this.props.address.postCode),
            country: (this.props.address === null ||  this.props.address.country === undefined )? '' :
              (this.props.address.country === null ? '' : this.props.address.country),
          }
        }}
        validationSchema={PersonalSchema}
        enableReinitialize
        onSubmit={values => {
          this.saveEdit(values);
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
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Personal information</h4>
          <div>
            {!isEditMode && <IconButton aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>}
            {isEditMode
              && (
                <IconButton
                  aria-label="Cancel"
                  color="secondary"
                  onClick={this.cancelEdit}
                >
                  <CancelIcon />
                </IconButton>
              )
            }
            {isEditMode
              && (
                <IconButton
                  aria-label="Save"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={
                   !isPersonalModified
                  }
                >
                  <SaveIcon />
                </IconButton>
              )
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={6}>
              <CustomInput
                labelText="Given name (required)"
                id="givenName"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                  autoFocus: isEditMode, // the focus() only works from the initial render
                }}
                onChange={handleChange}
                value={isEditMode === true ? values.givenName: user.givenName === null ? '' : user.givenName}
              />
              {errors.givenName && touched.givenName ? (
                <div style={{ color: 'red' }}>{errors.givenName}</div>
              ) : null}
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Family name"
                id="familyName"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={handleChange}
                value={isEditMode === true ? values.familyName: user.familyName === null ? '' : user.familyName}
              />
            </GridItem>
            <GridItem md={6}>
              <PhoneInput
                placeholder="e.g.+61 3 xxxx xxxx"
                country="AU"
                name="telephone"
                value={isEditMode === true ? values.telephone: user.telephone === null ? '' : user.telephone}
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={e => setFieldValue('telephone', e)}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="User status"
                id="userStatus"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                }}
                onChange={handleChange}
                value={values.userStatus}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="User Type"
                id="userType"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                }}
                onChange={handleChange}
                value={values.userType}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Street Address"
                id="address.streetAddress"
                inputProps={{
                  disabled: !isEditMode,
                }}
                value={isEditMode === true ? values.address.streetAddress : user.address.streetAddress === null ? '' : user.address.streetAddress}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="city"
                id="address.city"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                value={isEditMode === true ? values.address.city : user.address.city === null ? '' : user.address.city}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="State"
                id="address.state"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                value={isEditMode === true ? values.address.state : user.address.state === null ? '' : user.address.state}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your post code"
                id="address.postCode"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                value={isEditMode === true ? values.address.postCode : user.address.postCode === null ? '' : user.address.postCode}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Country"
                id="address.country"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                value={isEditMode === true ? values.address.country : user.address.country === null ? '' : user.address.country}
                onChange={handleChange}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        )}
        />
    );
  }
}

export default withStyles(personalPageStyles)(Personal);
