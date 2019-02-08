import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormLabel, Switch, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'
import TagsInput from "react-tagsinput";

import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from '../../actions/provider';
import {verifyLength, verifyEmail} from "../../validation/validation.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import { fetchTimezones } from '../../actions/provider';
import { fetchAllLocations } from '../../actions/location';


const ProviderSchema = Yup.object().shape({
  email: Yup.string()
            .required("This field is required")
            .email("Please write correct format"),
  givenName: Yup.string()
                .required("This field is required")
                .min(3, "Name should be atleast 3 letters")
                .max(40, "Too Long")
})
class ProviderCreate extends React.Component{
	constructor(props) {
    super(props);


    this.change = this.change.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
    this.doubleClick = this.doubleClick.bind(this);

  }

  componentDidMount() {
    this.props.fetchTimezones();
    this.props.fetchAllLocations();
  }

  doubleClick(fieldName) {
    console.log("This has been clicked");
    this.setState({ isEditMode: fieldName });
  }

  change(event, stateName, type){
    const { provider } = this.state
    provider[stateName]= (event.target.value || event.target.checked)
    this.setState({provider: provider})
    switch (type) {
      case "first-name":
        if (verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "email":
        if (verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "last-name":
        if (verifyLength(event.target.value, 3)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  changeCheckbox(event, stateName, type){
    const { emailPreference } = this.state.provider;
    const currentIndex = emailPreference.indexOf(event.target.value);
    const newChecked = [...emailPreference];
    if (event.target.checked) {
      newChecked.push(event.target.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const {provider} = this.state
    provider['emailPreference']= newChecked
    this.setState({
      provider: provider
    });
  }

  changeProfileImage(e) {
    //const { file, imagePreviewUrl } = this.state.provider;
    console.log("inside change image function", e);
    console.log("event---", e)
    e.preventDefault();
    let reader = new FileReader();
    let files = e.target.files[0];
    const { provider } = this.state
    console.log("file-------", files)
    reader.onloadend = () => {
      provider['file'] = files
      provider['imagePreviewUrl'] = reader.result
      this.setState({
        // file: file,
        // imagePreviewUrl: reader.result
        provider: provider
      });
    };
    reader.readAsDataURL(files);
  }

  handleProvider(values) {
    console.log("values", values);
    this.props.createProvider(values, this.props.history);
  }

	render() {
    const { classes, timezones, getAllLocations } = this.props;
    let categoryOptions = [];
    let geoLocations = [];
		if ((timezones.length && getAllLocations.length) > 0) {
      categoryOptions = timezones;
      geoLocations = getAllLocations;
    }
		return(
      
          <Formik 
            initialValues={{
              cognitoToken: "",
              description: "",
              email: "",
              familyName: "",
              geoLocationId: "",
              givenName: "",
              isAdmin: true,
              organizationId: localStorage.getItem('organizationId'),
              qualifications: [],
              tags: [],
              telephone: "",
              timeZoneId: "",
              userStatus: "FORCE_CHANGE_PASSWORD",
              userSub: null
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

ProviderCreate.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    timezones: state.providers.timezones,
    getAllLocations: state.location.getAllLocations,
    getAllLocationsLoading: state.location.getAllLocationsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProvider: (provider, history) => dispatch(createProvider(provider, history)),
    fetchTimezones: () => dispatch(fetchTimezones()),
    fetchAllLocations: () => dispatch(fetchAllLocations())
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ProviderCreate);