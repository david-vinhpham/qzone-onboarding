import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createService, getServiceCategory } from '../../actions/service';
import defaultImage from "../../assets/img/default-avatar.png";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomRadio from "../../components/CustomRadio/CustomRadio.jsx";
import ImageUpload from "../../components/CustomUpload/ImageUpload"


class ServiceCreate extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			allowProviderSelection: true,
			name: "",
			nameState: "",
			bookingHorizon: 0,
			description: "",
			duration: 1,
			gapBetweenBookings: 1,
			mode: "APPOINTMENT",
			numberOfParallelCustomer: 0,
			serviceCategoryId: "",
			tags: "",
			imagePreviewUrl: defaultImage
		}
	}

	componentDidMount() {
		this.props.getServiceCategory();
	}

	handleService() {
		let orgId = localStorage.getItem('organizationId');
		this.setState({
			organizationId: orgId,
			image: this.props.imageObject
		},
			() => {
				this.props.createService(this.state);
			});
	}

	changeProfileImage(e) {
		//const {file, imagePreviewUrl} = this.state.provider;
		console.log("inside change image function", e);
		console.log("event---", e)
		e.preventDefault();
		let reader = new FileReader();
		let files = e.target.files[0];
		console.log("file-------", files)
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
		console.log("state---", this.state)
	}

	render() {
		const { classes, serviceCategory} = this.props;
		let categoryOptions = [];
		if (serviceCategory.length > 0) {
			categoryOptions = serviceCategory;
		}
		
		return (
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="rose" text>
						<CardText color="rose">
							<h4 className={classes.cardTitle}>Add a Service</h4>
						</CardText>
					</CardHeader>
					<CardBody>
						<form>
							<GridContainer>
								<GridItem xs={12} sm={3}>
									<FormLabel className={classes.labelHorizontal}>
										Name
                  </FormLabel>
								</GridItem>
								<GridItem xs={12} sm={4}>
									<CustomInput
										labelText="Name"
										success={this.state.nameState === "success"}
										error={this.state.nameState === "error"}
										id="name"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "name"),
											type: "text"
										}}
									/>
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
											onChange: event => this.change(event, "description"),
											multiline: true,
											rows: 5
										}}
										
									/>
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
											value={this.state.serviceCategoryId}
											onChange={event =>
												this.change(event, "serviceCategoryId")}
										>

											{categoryOptions.map(categoryOption => (
												<MenuItem
													key={ categoryOption.id }
													value={ categoryOption.id }

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
										Duration of Service
                        			</FormLabel>
								</GridItem>
								<GridItem xs={12} sm={4}>
									<CustomInput
										labelText="in mins"
										success={this.state.duration === "success"}
										error={this.state.duration === "error"}
										id="duration"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "duration"),
											type: "number",
											min: "5"
										}}
									/>
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
										labelText="in mins"
										success={this.state.bookingHorizon === "success"}
										error={this.state.bookingHorizon === "error"}
										id="bookingHorizon"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "bookingHorizon"),
											type: "number",
											min: "0"
										}}
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
									<CustomInput
										labelText="Tags"
										id="tags"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "tags"),
											type: "text"
										}}
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
									<CustomRadio
										checkedValue={this.state.mode}
										label="Queue"
										value="QUEUE"
										classes={classes}
										onClick={event =>
											this.change(event, "mode")}
									/>
								</GridItem>
								<GridItem xs={12} sm={2}>
									<CustomRadio
										checkedValue={this.state.mode}
										label="Appointment"
										value="APPOINTMENT"
										classes={classes}
										onClick={event =>
											this.change(event, "mode")} />
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
									<CustomRadio
										checkedValue={this.state.allowProviderSelection}
										label="Yes"
										value={true}
										classes={classes}
										onClick={event =>
											this.change(event, "allowProviderSelection", true)}
									/>
								</GridItem>
								<GridItem xs={12} sm={2}>
									<CustomRadio
										checkedValue={this.state.allowProviderSelection}
										label="No"
										value={false}
										classes={classes}
										onClick={event =>
											this.change(event, "allowProviderSelection", false)} />
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={3}>
									<FormLabel className={classes.labelHorizontal}>
										No. of Parallel Customer
                        			</FormLabel>
								</GridItem>
								<GridItem xs={12} sm={4}>
									<CustomInput
										labelText="No. of Parallel Customer"
										id="numberOfParallelCustomer"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "numberOfParallelCustomer"),
											type: "number",
											min: "0"
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={3}>
									<FormLabel className={classes.labelHorizontal}>
										Gap between Bookings
                        			</FormLabel>
								</GridItem>
								<GridItem xs={12} sm={4}>
									<CustomInput
										labelText="in mins"
										id="gapBetweenBookings"
										formControlProps={{
											fullWidth: true
										}}
										inputProps={{
											onChange: event =>
												this.change(event, "gapBetweenBookings"),
											type: "number",
											min: "0"
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} md={12}>
									<ImageUpload changeProfileImage={this.changeProfileImage} imagePreviewUrl={this.state.imagePreviewUrl} />
								</GridItem>
							</GridContainer>
						</form>

					</CardBody>
					<CardFooter className={classes.justifyContentCenter}>
						<Button color="rose" onClick={() => this.handleService()}>
							Add Service
            			</Button>
						<Button color="rose">
							Cancel
            			</Button>
					</CardFooter>
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
		imageObject: state.image.image,
		imageError: state.image.imageError,
		imageLoading: state.image.imageLoading,
		serviceCategory: state.service.serviceCategory
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createService: (data) => dispatch(createService(data)),
		getServiceCategory: () => dispatch(getServiceCategory())
	}
}

export default compose(
	withStyles(validationFormStyle),
	connect(mapStateToProps, mapDispatchToProps),
)(ServiceCreate);