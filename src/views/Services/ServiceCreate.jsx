import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, Select, Switch } from "@material-ui/core";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createService, fetchServiceCategories } from '../../actions/service';
import defaultImage from "../../assets/img/default-avatar.png";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import SlotCustomInput from "../../components/CustomInput/SlotCustomInput.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import ImageUpload from "../../components/CustomUpload/ImageUpload"
import { fetchOrganizationsByBusinessAdminId } from "../../actions/organization";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
const override = css`
    margin: 0 auto;
    border-color: red;
    width: 100%;
    display: flex;
    justify-content: center;
`;
const ServiceCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name too short")
    .max(50, "Name too long")
    .required("This field is required"),
  description: Yup.string()
    .min(50, "Description too short")
    .max(1500, "Description too long")
    .required("this field is required"),
  duration: Yup.number()
    .min(1),
  gapBetweenAppointments: Yup.number()
    .min(1)
    .max(600),
  numberOfParallelCustomer: Yup.number()
    .min(1).max(999),
  bookingHorizon: Yup.number()
    .min(1)
    .max(1095)

})

class ServiceCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allowProviderSelection: true,
      name: "",
      nameState: "",
      bookingHorizon: 3,
      description: "",
      duration: 60,
      gapBetweenAppointments: 1,
      mode: "SCHEDULE",
      numberOfParallelCustomer: 1,
      serviceCategoryId: null,
      organizationId: null,
      tags: "",
      imagePreviewUrl: defaultImage,
    }
  }

  componentDidMount() {
    this.props.fetchServiceCategories();
    let userSub = localStorage.getItem('userSub');
    if (userSub) {
      this.props.fetchOrganizationsByBusinessAdminId(userSub);
    }
    localStorage.removeItem('imageObject');
  }

  handleService(values) {
    let imageObject = localStorage.getItem('imageObject');
    if (imageObject !== null) {
      imageObject = JSON.parse(imageObject)
    }
    //values.image = this.props.imageObject;
    values.image = imageObject;
    values.businessAdminId = localStorage.getItem('userSub');
    this.props.createService(values, this.props.history);
  }

  changeProfileImage(e) {
    e.preventDefault();
    let reader = new FileReader();
    let files = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
        //provider: provider
      });
    };
    reader.readAsDataURL(files);
  }


  change(event, stateName, value) {
    if (value !== undefined) {
      this.setState({ [stateName]: (value) })
    } else if (event.target.type === "number") {
      this.setState({ [stateName]: (event.target.valueAsNumber) })
    } else {
      this.setState({ [stateName]: (event.target.value) })
    }
  }

  render() {
    const { classes, categories, organizations, createServiceError, createServiceLoading } = this.props;
    let categoryOptions = [];
    let organizationOptions = [];
    if (categories != null && categories.length > 0) {
      categoryOptions = categories;
    }
    if (organizations != null && organizations.length > 0) {
      organizationOptions = organizations;
    }
    if (createServiceLoading) {
      return < BeatLoader
        className={override}
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={createServiceLoading}
      />;
    }
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <Formik
            initialValues={{
              allowProviderSelection: this.state.allowProviderSelection,
              name: this.state.name,
              bookingHorizon: this.state.bookingHorizon,
              description: this.state.description,
              duration: this.state.duration,
              gapBetweenAppointments: this.state.gapBetweenAppointments,
              mode: this.state.mode,
              serviceCategoryId: this.state.serviceCategoryId,
              tags: this.state.tags,
              organizationId: organizationOptions !== null && organizationOptions.length > 0 ? organizationOptions[0].id : null,
              organizationName: this.state.organizationName,
              businessAdminId: this.state.businessAdminId,
              imagePreviewUrl: this.props.imageObject || (this.state.image ? this.state.image.fileUrl : this.state.imagePreviewUrl)
            }}
            enableReinitialize={true}
            validationSchema={ServiceCreateSchema}
            onSubmit={(values) => this.handleService(values)}
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
                      <h4 className={classes.cardTitle}>Create a new Service</h4>
                    </CardText>
                  </CardHeader>
                  <CardBody>
                    {createServiceError !== null ? (<CardFooter className={classes.justifyContentCenter}>
                      <div style={{ color: "red" }} > {createServiceError.message} </div>
                    </CardFooter>)
                      :
                      (<CardFooter className={classes.justifyContentCenter}>
                      </CardFooter>)}
                    <form>
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
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}>

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
                          <FormLabel className={classes.labelHorizontal}>
                            Name
                                              </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                          <CustomInput
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                          />
                          {errors.name && touched.name ? (
                            <div style={{ color: "red" }}>{errors.name}</div>
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
                          <FormLabel className={classes.labelHorizontal}>
                            Duration of Service
                                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                          <SlotCustomInput
                            placeholder="in mins"
                            id="duration"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "number",
                            }}
                            value={values.duration}
                            onChange={handleChange}
                          />
                          {errors.duration && touched.duration ? (
                            <div style={{ color: "red" }}>{errors.duration}</div>
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
                          <SlotCustomInput
                            placeholder="in mins"
                            id="bookingHorizon"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "number",
                            }}
                            value={values.bookingHorizon}
                            onChange={handleChange}
                          />
                          {errors.bookingHorizon && touched.bookingHorizon ? (
                            <div style={{ color: "red" }}>{errors.bookingHorizon}</div>
                          ) : null}
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={3}>
                          <FormLabel className={classes.labelHorizontal}>
                            Tags
                                            </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                          <CustomInput
                            placeholder="Tags"
                            id="tags"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text"
                            }}
                            value={values.tags}
                            onChange={handleChange}
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
                            Service Mode
                          </FormLabel>
                        </GridItem>
                        <GridItem xs={12} sm={2}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={values.mode === "SCHEDULE"}
                                onChange={handleChange}
                                value="SCHEDULE"
                                name="mode"
                                aria-label="Appointment"
                                icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
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
                                checked={values.mode === "QUEUE"}
                                onChange={handleChange}
                                value="QUEUE"
                                name="mode"
                                aria-label="Queue"
                                icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
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
                            className={
                              classes.labelHorizontal +
                              " " +
                              classes.labelHorizontalRadioCheckbox
                            }
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
                              type: "number",
                            }}
                            onChange={handleChange}
                            value={values.gapBetweenAppointments}
                          />
                          {errors.gapBetweenAppointments && touched.gapBetweenAppointments ? (
                            <div style={{ color: "red" }}>{errors.gapBetweenAppointments}</div>
                          ) : null}
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} md={12}>
                          <ImageUpload imagePreviewUrl={values.imagePreviewUrl} />
                        </GridItem>
                      </GridContainer>
                    </form>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button color="rose" onClick={handleSubmit}>
                      Create
                                        </Button>
                    <Button color="rose" onClick={this.props.history.goBack}>
                      Exit
                                        </Button>
                  </CardFooter>
                </div>
              )
            }
          />
        </Card>
      </GridItem>
    );
  }
}

ServiceCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    imageError: state.image.imageError,
    categories: state.service.serviceCategories,
    createServiceLoading: state.service.createServiceLoading,
    createServiceError: state.service.createServiceError,
    organizations: state.organization.organizations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizationsByBusinessAdminId: (id) => dispatch(fetchOrganizationsByBusinessAdminId(id)),
    createService: (data, history) => dispatch(createService(data, history)),
    fetchServiceCategories: () => dispatch(fetchServiceCategories())
  }
}

export default compose(
  withStyles(validationFormStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(ServiceCreate);
