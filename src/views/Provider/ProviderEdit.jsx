import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, FormControlLabel, FormLabel, MenuItem, Select, Switch} from '@material-ui/core'
import TagsInput from "react-tagsinput";

import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import {createProvider, fetchProvider, fetchTimezones} from '../../actions/provider';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import {fetchAllLocations} from '../../actions/location';

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
    this.props.fetchAllLocations();
    const { id } = this.props.match.params
    console.log("id------", id)
    this.props.fetchProvider(id);
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props---------", nextProps)
    this.setState({ provider: nextProps.provider})
  }

  doubleClick(fieldName) {
    console.log("This has been clicked");
   this.setState({isEditMode: fieldName});
  }


  handleUpdate(option) {

  }

  render() {
    const { classes, timezones, getAllLocations } = this.props;
    let categoryOptions = [];
    let geoLocations = [];
		if ((timezones.length && getAllLocations.length) > 0) {
      categoryOptions = timezones;
      geoLocations = getAllLocations;
    }
    if (!this.state.provider) {
      return null;
  }
  console.log("data-----", this.state.provider)
		return(
      <Formik
        initialValues={{
          cognitoToken: this.state.provider.cognitoToken,
          description: this.state.provider.description,
          email: this.state.provider.email,
          familyName: this.state.provider.familyName,
          geoLocationId: this.state.provider.geoLocationId,
          givenName: this.state.provider.givenName,
          isAdmin: this.state.provider.isAdmin,
          organizationId: this.state.provider.organizationId,
          qualifications: this.state.provider.qualifications && this.state.provider.qualifications.length > 0 ? this.state.provider.qualifications : [],
          tags: this.state.provider.tags && this.state.provider.tags.length > 0 ? this.state.provider.tags : [],
          telephone: this.state.provider.telephone,
          timeZoneId: this.state.provider.timeZoneId,
          userStatus: this.state.provider.userStatus,
          userSub: this.state.provider.userSub
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
                        First Name
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
                        Last Name
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
                          Description
                      </FormLabel>
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
                        Is Provider Admin?
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                name="isAdmin"
                                checked={values.isAdmin}
                                value="isAdmin"
                                onChange={handleChange}
                            />
                        }
                    />
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
                          value={values.timeZoneId}
                          onChange={handleChange('timeZoneId')}
                          name="timeZoneId"
                      >
                          {categoryOptions.map(option => (
                                <MenuItem
                                key={ option }
                                value={ option }
                                id="timeZoneId"
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
                        Telephone
                    </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        id="telephone"
                        name="telephone"
                        onChange={handleChange}
                        value={values.telephone}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                      Tags
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <TagsInput
                    id="tags"
                    value={values.tags}
                    onChange={(value) => setFieldValue('tags', value)}
                    addKeys={[9, 13, 32, 188]}
                    tagProps={{ className: "react-tagsinput-tag info" }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                      Qualifications
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <TagsInput
                    id="qualifications"
                    value={values.qualifications}
                    onChange={(value) => setFieldValue('qualifications', value)}
                    addKeys={[9, 13, 32, 188]}
                    tagProps={{ className: "react-tagsinput-tag info" }}
                  />
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
                      Location
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <FormControl
                      fullWidth
                      className={classes.selectFormControl}>
                      <Select
                        value={values.geoLocationId}
                        onChange={handleChange('geoLocationId')}
                        name="geoLocationId"
                      >
                        {geoLocations.map(option => (
                            <MenuItem
                              key={ option.id }
                              value={ option.id }
                            >
                              {option.streetAddress}, {option.city}, {option.country}
                            </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" onClick={handleSubmit}>
                Add Provider
              </Button>
              <Button color="rose" onClick={this.props.history.goBack}>
                Save & Exit
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

function mapStateToProps(state) {
  return {
    provider: state.providers.provider,
    timezones: state.providers.timezones,
    getAllLocations: state.location.getAllLocations,
    getAllLocationsLoading: state.location.getAllLocationsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvider: (id) => dispatch(fetchProvider(id)),
    createProvider: (provider) => dispatch(createProvider(provider)),
    fetchTimezones: () => dispatch(fetchTimezones()),
    fetchAllLocations: () => dispatch(fetchAllLocations())
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ProviderEdit);
