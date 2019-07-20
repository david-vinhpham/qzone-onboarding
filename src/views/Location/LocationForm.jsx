import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormLabel, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';

import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import Button from '../../components/CustomButtons/Button.jsx';

class LocationForm extends React.Component {
  render() {
    const {
      classes,
      locationInfo,
      values,
      handleChange,
      handleSubmit,
      errors,
      touched
    } = this.props;
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Street Address</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={3}>
            {locationInfo.isEditMode === 'streetAddress' ? (
              <CustomInput
                value={values.streetAddress}
                id="streetAddress"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  placeholder: 'Street Address'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                sm={4}
                onClick={() => this.props.onDoubleClick('streetAddress')}
              >
                {values.streetAddress || 'Street address'}
              </InputLabel>
            )}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>District</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {locationInfo.isEditMode === 'district' ? (
              <CustomInput
                id="district"
                value={values.district || ''}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: 'district',
                  type: 'text'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('district')}
              >
                {values.district || 'District'}
              </InputLabel>
            )}
            {errors.district && touched.district ? <div style={{ color: 'red' }}>{errors.district}</div> : null}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>City</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {locationInfo.isEditMode === 'city' ? (
              <CustomInput
                id="city"
                value={values.city || ''}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: 'City',
                  type: 'text'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('city')}
              >
                {values.city || 'City'}
              </InputLabel>
            )}
            {errors.city && touched.city ? <div style={{ color: 'red' }}>{errors.city}</div> : null}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>State</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {locationInfo.isEditMode === 'state' ? (
              <CustomInput
                id="state"
                value={values.state}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: 'State',
                  type: 'text'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('state')}
              >
                {values.state || 'State'}
              </InputLabel>
            )}
            {errors.state && touched.state ? (
              <div style={{ color: 'red' }}>{errors.state}</div>
            ) : null}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>PostCode</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {locationInfo.isEditMode === 'zipcode' ? (
              <CustomInput
                id="postCode"
                value={values.postCode}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: 'Post Code',
                  type: 'text'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('zipcode')}
              >
                {values.postCode || 'Zipcode'}
              </InputLabel>
            )}
            {errors.postCode && touched.postCode ? (
              <div style={{ color: 'red' }}>{errors.postCode}</div>
            ) : null}
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Country</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {locationInfo.isEditMode === 'country' ? (
              <CustomInput
                id="country"
                value={values.country}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: 'Country',
                  type: 'text'
                }}
                onChange={handleChange}
              />
            ) : (
              <InputLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('country')}
              >
                {values.country || 'Country'}
              </InputLabel>
            )}
            {errors.country && touched.country ? (
              <div style={{ color: 'red' }}>{errors.country}</div>
            ) : null}
          </GridItem>
        </GridContainer>

        <GridContainer style={{ justifyContent: 'center' }}>
          <Button color="rose" onClick={handleSubmit}>
            {this.props.buttonName}
          </Button>
          <Link to="/location/list">
            <Button color="rose">Exit</Button>
          </Link>
        </GridContainer>
      </form>
    );
  }
}

export default withStyles(validationFormStyle)(LocationForm);
