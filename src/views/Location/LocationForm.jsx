import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomRadio from "../../components/CustomRadio/CustomRadio.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";

class LocationForm extends React.Component {

    render() {
        const { classes, locationInfo } = this.props;
        const { location } = locationInfo;
        return (
            <form>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Address Line 1
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        {locationInfo.isEditMode === 'address1'
                            ?
                            <CustomInput
                                labelText="Address Line 1"
                                success={locationInfo.address1State === "success"}
                                value={location.address1 || ''}
                                error={locationInfo.address1State === "error"}
                                id="address1"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "address1", "not-null"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                sm={4}
                                onClick={() => this.props.onDoubleClick('address1')}
                            >
                                {location.address1 || 'address 1'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Address Line 2
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        {locationInfo.isEditMode === 'address2'
                            ?
                            <CustomInput
                                labelText="Address Line 2"
                                success={locationInfo.address2State === "success"}
                                error={locationInfo.address2State === "error"}
                                value={location.address2 || ''}
                                id="address2"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "address2", "not-null"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                sm={4}
                                onClick={() => this.props.onDoubleClick('address2')}
                            >
                                {location.address2 || 'address 2'}
                            </InputLabel>
                        }
                    </GridItem>

                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Address Line 3
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'address3'
                            ?
                            <CustomInput
                                labelText="Address Line 3"
                                id="address3"
                                value={location.address3 || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "address3"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                sm={4}
                                onClick={() => this.props.onDoubleClick('address3')}
                            >
                                {location.address3 || 'address3'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            District
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'district'
                            ?
                            <CustomInput
                                labelText="District"
                                id="district"
                                value={location.district || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "district"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                onClick={() => this.props.onDoubleClick('district')}
                            >
                                {location.district || 'district'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            City
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'city'
                            ?
                            <CustomInput
                                labelText="City"
                                id="city"
                                value={location.city || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "city"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                onClick={() => this.props.onDoubleClick('city')}
                            >
                                {location.city || 'city'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Country
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'country'
                            ?
                            <CustomInput
                                labelText="Country"
                                id="country"
                                success={locationInfo.countryState === "success"}
                                error={locationInfo.countryState === "error"}
                                value={location.country || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "country", "not-null"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                onClick={() => this.props.onDoubleClick('country')}
                            >
                                {location.country || 'country'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            Zipcode
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'zipcode'
                            ?
                            <CustomInput
                                labelText="Zipcode"
                                id="zipcode"
                                success={locationInfo.zipcodeState === "success"}
                                error={locationInfo.zipcodeState === "error"}
                                value={location.zipcode || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "zipcode", "not-null"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                onClick={() => this.props.onDoubleClick('zipcode')}
                            >
                                {location.zipcode || 'zipcode'}
                            </InputLabel>
                        }
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={3}>
                        <FormLabel className={classes.labelHorizontal}>
                            State
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        {locationInfo.isEditMode === 'state'
                            ?
                            <CustomInput
                                labelText="State"
                                id="state"
                                value={location.state || ''}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.props.change(event, "state"),
                                    type: "text"
                                }}
                            />
                            :
                            <InputLabel
                                className={classes.labelLeftHorizontal}
                                onClick={() => this.props.onDoubleClick('state')}
                            >
                                {location.state || 'state'}
                            </InputLabel>
                        }
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
                            Does it have billing address?
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                        <CustomRadio
                            checkedValue={location.isBillingAddress}
                            label="Yes"
                            value= "Yes"
                            classes={classes}
                            onClick={event =>
                                this.props.change(event, "isBillingAddress")}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                        <CustomRadio
                            checkedValue={location.isBillingAddress}
                            label="No"
                            value="No"
                            classes={classes}
                            onClick={event =>
                                this.props.change(event, "isBillingAddress")} />
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
                            Is it the Head Office?
                        </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                        <CustomRadio
                            checkedValue={location.isHeadOffice}
                            label="Yes"
                            value= "Yes"
                            classes={classes}
                            onClick={event =>
                                this.props.change(event, "isHeadOffice")}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                        <CustomRadio
                            checkedValue={location.isHeadOffice}
                            label="No"
                            value= "No"
                            classes={classes}
                            onClick={event =>
                                this.props.change(event, "isHeadOffice")} />
                    </GridItem>
                </GridContainer>

            </form>
        )

    }
}

export default withStyles(validationFormStyle)(LocationForm);
