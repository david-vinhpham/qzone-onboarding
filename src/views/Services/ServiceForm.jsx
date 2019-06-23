import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {FormControl, FormLabel, InputLabel, MenuItem, Select} from "@material-ui/core";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomRadio from "../../components/CustomRadio/CustomRadio.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import ImageUpload from "../../components/CustomUpload/ImageUpload"

class ServiceForm extends React.Component {

    render() {
        const { classes, serviceInfo } = this.props;
        const standardNames = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
        ];
        const serviceCategory = [
            "Appointment",
            "Queue"
        ]
        return (
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
                            success={serviceInfo.nameState === "success"}
                            error={serviceInfo.nameState === "error"}
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "name"),
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
                            id="about-me"
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
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
                            <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}>
                                Choose Standard Name
                            </InputLabel>
                            <Select
                                value={serviceInfo.standardName}
                                onChange={event =>
                                    this.props.change(event, "standardName")}
                            >

                                {standardNames.map(standardName => (
                                    <MenuItem
                                        key={standardName}
                                        value={standardName}

                                    >
                                        {standardName}
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
                            labelText="Duration of Service"
                            success={serviceInfo.duration === "success"}
                            error={serviceInfo.duration === "error"}
                            id="duration"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "duration"),
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
                            labelText="Booking Horizon"
                            success={serviceInfo.bookingHorizon === "success"}
                            error={serviceInfo.bookingHorizon === "error"}
                            id="bookingHorizon"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "bookingHorizon"),
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
                                    this.props.change(event, "tags"),
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
                            checkedValue={serviceInfo.serviceMode}
                            label="Queue"
                            value="queue"
                            classes={classes}
                            onClick={event =>
                            this.props.change(event, "serviceMode")} 
                        />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                        <CustomRadio
                            checkedValue={serviceInfo.serviceMode}
                            label="Appointment"
                            value="appointment"
                            classes={classes}
                            onClick={event =>
                                this.props.change(event, "serviceMode")} />
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
                        checkedValue={serviceInfo.allowProviderSelection}
                        label="Yes"
                        value={true}
                        classes={classes}
                        onClick={event =>
                        this.props.change(event, "allowListingOnQuezone", true)}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                    <CustomRadio
                        checkedValue={serviceInfo.allowProviderSelection}
                        label="No"
                        value={false}
                        classes={classes}
                        onClick={event =>
                        this.props.change(event, "allowProviderSelection", false)} />
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
                                    this.props.change(event, "numberOfParallelCustomer"),
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
                            labelText="Gap between Bookings"
                            id="gapBetweenBookings"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "gapBetweenBookings"),
                                type: "number",
                                min: "0"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} md={12}>
                        <ImageUpload changeProfileImage={this.props.changeProfileImage} imagePreviewUrl={serviceInfo.imagePreviewUrl} />
                    </GridItem>
                </GridContainer>
            </form>
        )

    }
}

export default withStyles(validationFormStyle)(ServiceForm);
