import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { createProvider } from '../../actions/provider';
import { verifyLength, verifyEmail } from "../../validation/validation.jsx";
import LocationForm from "./LocationForm";


class LocationCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                address1: "",
                address2: "",
                address3: "",
                district: "",
                city: "",
                country: "",
                postCode: "",
                state: "",
                isBillingAddress: false,
                isHeadOffice: false
            },
            address1State: "",
            address2State: "",
            countryState: "",
            postCodeState: "",
        };

        this.change = this.change.bind(this);
        
        this.doubleClick = this.doubleClick.bind(this);

    }

    changeCheckbox(event, stateName, type) {
        //const { stateName } = this.state.location;
        const currentIndex = stateName.indexOf(event.target.value);
        const newChecked = [...stateName];
        if (event.target.checked) {
            newChecked.push(event.target.value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        const { location } = this.state
        location[stateName] = newChecked
        this.setState({
            location: location
        });
    }

    doubleClick(fieldName) {
        console.log("This has been clicked");
        this.setState({ isEditMode: fieldName });
    }

    change(event, stateName, type) {
        const { location } = this.state
        location[stateName] = (event.target.value || event.target.checked)
        this.setState({ location: location })
        switch (type) {
            case "not-null":
                if (verifyLength(event.target.value, 3)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                this.setState({ [stateName]: event.target.value })
                break;;
        }
    }

    handleLocation(option) {
        if (this.state.address1State === "")
            this.setState({ address1State: "error" })
        if (this.state.address2State === "")
            this.setState({ address2State: "error" })
        if (this.state.countryState === "") {
            this.setState({ countryState: "error" });
        }
        if (this.state.postCodeState === "") {
            this.setState({ postCodeState: "error" });
        }
        if (this.state.address1State === "success" && this.state.address2State === "success" && this.state.countryState === "success" && this.state.postCodeState === "success") {
            if (option === "Save") {
                this.props.createProvider(this.state.provider, (response) => {
                    window.location = "/provider/list";
                });
            }
            else {
                this.props.createProvider(this.state.provider, () => {
                    window.location = "/provider/create"
                });
            }
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="rose" text>
                    <CardText color="rose">
                        <h4 className={classes.cardTitle}>Create Provider</h4>
                    </CardText>
                </CardHeader>
                <CardBody>
                    <LocationForm
                        locationInfo={this.state}
                        change={this.change}
                        onDoubleClick={this.doubleClick}
                        classes={this.props.classes}
                    />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                    <Button color="rose" onClick={this.handleLocation.bind(this)}>
                        Add Another Provider
                    </Button>
                    <Button color="rose" onClick={this.handleLocation.bind(this, "Save")}>
                        Save & Exit
          </Button>
                </CardFooter>
            </Card>
        )
    }
}

LocationCreate.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProvider: (provider) => dispatch(createProvider(provider))
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(null, mapDispatchToProps),
)(LocationCreate);