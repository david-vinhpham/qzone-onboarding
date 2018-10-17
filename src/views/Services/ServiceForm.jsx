import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomRadio from "../../components/CustomRadio/CustomRadio.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import PictureUpload from "../../components/CustomUpload/PictureUpload";

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
        return (
            <form>
                <GridContainer>
                    <GridItem xs={12}>
                        <PictureUpload changeProfileImage={this.props.changeProfileImage} imagePreviewUrl={serviceInfo.imagePreviewUrl} />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Standard Name
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
                            *Name
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
                            *Avg Service Time
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Avg Service Time"
                            success={serviceInfo.avgServiceTimeState === "success"}
                            error={serviceInfo.avgServiceTimeState === "error"}
                            id="avgServiceTime"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "avgServiceTime"),
                                type: "number",
                                min: "5"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Tkt Prefix
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Tkt Prefix"
                            id="tktPrefix"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "tktPrefix"),
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
                                this.props.change(event, "serviceMode")} />
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
                        <FormLabel className={classes.labelHorizontal}>
                            Avg Customers Per Hour
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Avg Customers Per Hour"
                            id="avgCustomersPerHour"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "avgCustomersPerHour"),
                                type: "number",
                                min: "0"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Avg Provider Count
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Avg Provider Count"
                            id="avgProviderCount"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event =>
                                    this.props.change(event, "avgProviderCount"),
                                type: "number",
                                min: "0"
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </form>
        )

    }
}

export default withStyles(validationFormStyle)(ServiceForm);
