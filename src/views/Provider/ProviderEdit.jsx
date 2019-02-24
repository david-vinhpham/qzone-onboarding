import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, FormLabel, MenuItem, Select} from '@material-ui/core'

import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import {editProvider, fetchProvider, fetchTimezones} from '../../actions/provider';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {getOrganizationByBusinessAdminId} from "../../actions/organization";

const ProviderSchema = Yup.object().shape({
  email: Yup.string()
            .required("This field is required")
            .email("Please write correct format"),
  givenName: Yup.string()
                .required("This field is required")
                .min(3, "Name should be atleast 3 letters")
                .max(40, "Too Long")
})
class ProviderEdit extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      provider: null
    };


    this.doubleClick = this.doubleClick.bind(this);
  }

  componentDidMount(){
    this.props.fetchTimezones();
    const { id } = this.props.match.params
    console.log("id------", id)
    this.props.fetchProvider(id);
    let userSub = localStorage.getItem('userSub');
    console.log('userSub: ' + userSub);
    this.props.getOrganizationByBusinessAdminId(userSub);
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props---------", nextProps)
    this.setState({ provider: nextProps.provider})
  }

  doubleClick(fieldName) {
    console.log("This has been clicked");
   this.setState({isEditMode: fieldName});
  }

  handleProvider(values) {
    console.log("values", values);
    this.props.editProvider(values, this.props.history);
  }

  render() {
    const { classes, timezones, organizationLists } = this.props;
    let timeZoneOptions = [];
    let organizationOptions = [];
    if ((timezones.length) > 0) {
      timeZoneOptions = timezones;
    }
    if(organizationLists.length > 0) {
      organizationOptions = organizationLists;
    }
    if (!this.state.provider) {
      return null;
   }
    return(
      <Formik
        initialValues={{
          email: this.state.provider.data.email,
          familyName: this.state.provider.data.familyName == null ? '' : this.state.provider.data.familyName,
          givenName: this.state.provider.data.givenName,
          telephone: this.state.provider.data.telephone,
          userStatus: this.state.provider.data.userStatus,
          userSub: this.state.provider.data.userSub,
          userType: this.state.provider.data.userType,
          providerInformation: {
            description: this.state.provider.data.providerInformation.description,
            qualifications:this.state.provider.data.providerInformation.qualifications,
            tags:this.state.provider.data.providerInformation.tags,
            organizationId: this.state.provider.data.providerInformation.organizationId,
            timeZoneId: this.state.provider.data.providerInformation.timeZoneId,
            businessId:this.state.provider.data.providerInformation.businessId,
          },
        }}
        validationSchema={ProviderSchema}
        onSubmit={(values) => {this.handleProvider(values)}}
        render={({values, handleChange, errors, touched, setFieldValue, handleSubmit}) => (
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Create Provider</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Given Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    id="givenName"
                    name="givenName"
                    onChange={handleChange}
                    value={values.givenName}
                  />
                  {errors.givenName && touched.givenName ? (
                    <div style={{ color: "red" }}>{errors.givenName}</div>
                  ) : null}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Family Name
                  </FormLabel>
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
                  <FormLabel className={classes.labelHorizontal}>
                    Email
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Telephone
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <CustomInput
                    id="providerInformation.description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                    value={values.providerInformation.description}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description ? (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  ) : null}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Time Zone
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>

                    <Select
                      value={values.providerInformation.timeZoneId}
                      onChange={handleChange('providerInformation.timeZoneId')}
                      name="timeZoneId"
                    >
                      {timeZoneOptions.map(option => (
                        <MenuItem
                          key={ option }
                          value={ option }
                          id="providerInformation.timeZoneId"
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Service Organization
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <Select
                      value={values.providerInformation.organizationId}
                      onChange={handleChange('providerInformation.organizationId')}
                      name="organizationId"
                    >
                      {organizationOptions.map(organizationOption => (
                        <MenuItem
                          key={organizationOption.id}
                          value={organizationOption.id}
                          id="providerInformation.organizationId"
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
                    Tags
                  </FormLabel>
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
                  <FormLabel className={classes.labelHorizontal}>
                    Qualifications
                  </FormLabel>
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
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" onClick={handleSubmit}>
                Save
              </Button>
               <Button color="rose" onClick={this.props.history.goBack}>
                Back
              </Button>
            </CardFooter>
          </Card>
        )}
      />

    )
  }
}

ProviderEdit.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    provider: state.providers.provider,
    timezones: state.providers.timezones,
    getAllLocations: state.location.getAllLocations,
    getAllLocationsLoading: state.location.getAllLocationsLoading,
    organizationLists: state.organization.getOrganizations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvider: (id) => dispatch(fetchProvider(id)),
    editProvider: (provider, history) => dispatch(editProvider(provider, history)),
    fetchTimezones: () => dispatch(fetchTimezones()),
    getOrganizationByBusinessAdminId: (id) => dispatch(getOrganizationByBusinessAdminId(id)),
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ProviderEdit);
