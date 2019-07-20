import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Geocode from 'react-geocode';

import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardText from '../../components/Card/CardText.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import validationFormStyle from '../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx';
import { createLocation } from '../../actions/location';
import LocationForm from './LocationForm';
import { GEO_CODING_KEY } from '../../config/config';

const LocationSchema = Yup.object().shape({
  city: Yup.string().required('Please enter a city'),
  country: Yup.string().required('Please enter a valid Country'),
  postCode: Yup.string().required('Please enter a valid Postal code'),
  state: Yup.string().required('Please enter a valid State')
});
class LocationCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.doubleClick = this.doubleClick.bind(this);

    Geocode.setApiKey(GEO_CODING_KEY);
    Geocode.enableDebug();
  }

  doubleClick(fieldName) {
    this.setState({ isEditMode: fieldName });
  }

  handleLocation(values) {
    Geocode.fromAddress(values.streetAddress + values.city + values.country + values.postCode).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        values.coordinates = {};
        values.coordinates.latitude = lat;
        values.coordinates.longitude = lng;
        this.props.createLocation(values, this.props.history);
      },
      error => {
        console.error(error);
        values.coordinates = {};
        values.coordinates.latitude = 0;
        values.coordinates.longitude = 0;
        this.props.createLocation(values, this.props.history);
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Create a new Address</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              streetAddress: '',
              district: '',
              city: '',
              country: '',
              postCode: '',
              state: '',
              coordinates: {
                latitude: 0,
                longitude: 0
              }
            }}
            validationSchema={LocationSchema}
            onSubmit={values => this.handleLocation(values)}
            children={props => (
              <LocationForm
                {...props}
                locationInfo={this.state}
                onDoubleClick={this.doubleClick}
                classes={this.props.classes}
                buttonName="Create Address"
              />
            )}
          />
        </CardBody>
      </Card>
    );
  }
}

LocationCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createLocation: (values, history) => dispatch(createLocation(values, history))
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    null,
    mapDispatchToProps
  )
)(LocationCreate);
