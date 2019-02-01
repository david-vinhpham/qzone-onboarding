import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik} from 'formik';
import * as Yup from 'yup';

import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import { fetchLocation, editLocation } from '../../actions/location';
import LocationForm from "./LocationForm";

const LocationSchema = Yup.object().shape({
    city: Yup.string()
            .required("Please enter a city"),
    country: Yup.string()
                .required("Please enter a valid Country"),
    postCode: Yup.string()
                .required("Please enter a valid Postal code"),
    state: Yup.string()
            .required("Please enter a valid State")
    
})

class LocationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
        this.doubleClick = this.doubleClick.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        console.log("location", nextProps.location)
        this.setState({ data: nextProps.location })
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchLocation(id);
    }

    doubleClick(fieldName) {
        console.log("This has been clicked");
        this.setState({ isEditMode: fieldName });
    }

    handleLocation(values) {
        this.props.editLocation(values, this.props.history)
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="rose" text>
                    <CardText color="rose">
                        <h4 className={classes.cardTitle}>Create new Address</h4>
                    </CardText>
                </CardHeader>
                <CardBody>
                    <Formik 
                    initialValues={{
                        id: this.state.data.id,
                        streetAddress: this.state.data.streetAddress,
                        district: this.state.data.postCode,
                        city: this.state.data.district,
                        country: this.state.data.country,
                        postCode: this.state.data.postCode,
                        state: this.state.data.state,
                        coordinates: {
                            latitude: this.state.data.coordinates ? this.state.data.coordinates.latitude : 0,
                            longitude: this.state.data.coordinates ? this.state.data.coordinates.longitude : 0
                        }
                    }}
                    enableReinitialize={true}
                    validationSchema={LocationSchema}
                    onSubmit={values => this.handleLocation(values)}
                    children={props =>
                        <LocationForm
                            {...props}
                            locationInfo={this.state}
                            change={this.change}
                            onDoubleClick={this.doubleClick}
                            classes={this.props.classes}
                            buttonName="Edit Address"
                        />
                    }
                    />
                </CardBody>
                
            </Card>
        
            )
    }
}

LocationEdit.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        location: state.location.getLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocation: (id) => dispatch(fetchLocation(id)),
        editLocation: (values, history) => dispatch(editLocation(values, history))
    }
}

export default compose(
    withStyles(validationFormStyle),
    connect(mapStateToProps, mapDispatchToProps),
)(LocationEdit);