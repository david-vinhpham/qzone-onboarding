import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormControl, FormLabel} from '@material-ui/core'
import Select from 'react-select';
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import {editProvider, fetchProvider, fetchTimezonesOption} from '../../actions/provider';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {fetchOrganizationsOptionByBusinessAdminId} from "../../actions/organization";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


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
      provider: null,
      businessAdminId: null,
      timezoneOption: null,
      organizationOption: null,
    };


    this.doubleClick = this.doubleClick.bind(this);
    this.handleTimeZone = this.handleTimeZone.bind(this);
    this.handleOrgChange = this.handleOrgChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchTimezonesOption();
    const { id } = this.props.match.params
    console.log("id------", id)
    this.props.fetchProvider(id);
    let userSub = localStorage.getItem('userSub');
    console.log('userSub: ' + userSub);
    this.props.fetchOrganizationsOptionByBusinessAdminId(userSub);
  }

  handleOrgChange(selectedOption) {
    this.setState({ organizationOption: selectedOption });
  }

  handleTimeZone(selectedOption) {
    this.setState({ timezoneOption: selectedOption });
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
    const { classes, timezones, organizations, fetchProviderLoading, editProviderError } = this.props;
    const { timezoneOption, organizationOption, provider } = this.state;
    let timeZoneOptions = [];
    let organizationOptions = [];
    if ((timezones.length) > 0) {
      timeZoneOptions = timezones;
    }
    if(organizations.length > 0) {
      organizationOptions = organizations;
    }
    if (fetchProviderLoading || !this.state.provider || this.state.provider.length === 0) {
      return < ClipLoader
        className={override}
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={fetchProviderLoading}
      />;
    }
    console.log('this.state.provider: ' + this.state.provider);
    return(
      <Formik
        initialValues={{
          id: provider.data.id,
          email: provider.data.email,
          familyName: provider.data.familyName === null ? '' : provider.data.familyName,
          givenName:provider.data.givenName,
          telephone: provider.data.telephone,
          userStatus: provider.data.userStatus,
          userSub: provider.data.userSub,
          userType: provider.data.userType,
          providerInformation: {
            description: provider.data.providerInformation.description,
            qualifications:provider.data.providerInformation.qualifications,
            tags:provider.data.providerInformation.tags,
            organizationId: organizationOption !== null ? organizationOption.value : provider.data.providerInformation.organizationId,
            timeZoneId: timezoneOption === null ? provider.data.providerInformation.timeZoneId : timezoneOption.label,
            businessId:provider.data.providerInformation.businessId,
          },
        }}
        validationSchema={ProviderSchema}
        enableReinitialize={true}
        onSubmit={(values) => {this.handleProvider(values)}}
        render={({ values,
                   errors,
                   status,
                   touched,
                   handleBlur,
                   handleChange,
                   handleSubmit,
                   isSubmitting,
                   setFieldValue}) => (
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Edit Provider</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              {editProviderError !== null ? (<CardFooter className={classes.justifyContentCenter}>
                  <div  style={{ color: "red" }} > {editProviderError.message} </div>
                </CardFooter>)
                :
                ( <CardFooter className={classes.justifyContentCenter}>
                </CardFooter>)}
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
                      rows: 3
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
                      options={timeZoneOptions}
                      value={ timezoneOption === null ? timeZoneOptions.find((element) => {
                        return element.label === values.providerInformation.timeZoneId;
                      }) : timezoneOption}
                      onChange={this.handleOrgChange}
                    >
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
                      options={organizationOptions}
                      value={ organizationOption === null ? organizationOptions.find((element) => {
                        return element.value === values.providerInformation.organizationId;
                      }) : organizationOption}
                      onChange={this.handleOrgChange}
                    >
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
                Update
              </Button>
               <Button color="rose" onClick={this.props.history.goBack}>
                Exit
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
    provider: state.provider.provider,
    timezones: state.provider.timezones,
    organizations: state.organization.organizations,
    fetchProviderLoading: state.provider.fetchProviderLoading,
    editProviderError: state.provider.editProviderError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvider: (id) => dispatch(fetchProvider(id)),
    editProvider: (provider, history) => dispatch(editProvider(provider, history)),
    fetchTimezonesOption: () => dispatch(fetchTimezonesOption()),
    fetchOrganizationsOptionByBusinessAdminId: (id) => dispatch(fetchOrganizationsOptionByBusinessAdminId(id)),
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ProviderEdit);
