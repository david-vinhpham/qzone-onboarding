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
import { fetchLocation, editLocation } from '../../actions/location';
import LocationForm from './LocationForm';
import { GEO_CODING_KEY } from '../../config/config';

const LocationSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Please enter a streetAddress'),
  city: Yup.string().required('Please enter a city'),
  country: Yup.string().required('Please enter a valid Country'),
  /*postCode: Yup.string().required('Please enter a valid Postal code'),*/
  /*state: Yup.string().required('Please enter a valid State')*/
});

class LocationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.doubleClick = this.doubleClick.bind(this);
    Geocode.setApiKey(GEO_CODING_KEY);
    Geocode.enableDebug();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchLocation(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.location });
  }

  doubleClick(fieldName) {
    this.setState({ isEditMode: fieldName });
  }

  handleLocation(values) {
    let fullAddress = values.streetAddress;
    if(values.district != null && values.district.length > 0) {
      fullAddress += ', ' + values.district;
    }
    if(values.city != null && values.city.length > 0) {
      fullAddress += ', ' + values.city;
    }
    if(values.state != null && values.state.length > 0) {
      fullAddress += ', ' + values.state;
    }
    if(values.postCode != null && values.postCode.length > 0) {
      fullAddress += ' ' + values.postCode;
    }
    if(values.country != null && values.country.length > 0) {
      fullAddress += ', ' + values.country;
    }
    Geocode.fromAddress(fullAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        values.coordinates = {};
        values.coordinates.latitude = lat;
        values.coordinates.longitude = lng;
        this.props.editLocation(values, this.props.history);
      },
      error => {
        console.error(error);
        values.coordinates = {};
        values.coordinates.latitude = 0;
        values.coordinates.longitude = 0;
        this.props.editLocation(values, this.props.history);
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Update a Service Location</h4>
          </CardText>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              id: this.state.data.id,
              streetAddress: this.state.data.streetAddress,
              district: this.state.data.district,
              city: this.state.data.city,
              country: this.state.data.country,
              postCode: this.state.data.postCode,
              state: this.state.data.state,
              coordinates: {
                latitude: this.state.data.coordinates ? this.state.data.coordinates.latitude : 0,
                longitude: this.state.data.coordinates ? this.state.data.coordinates.longitude : 0
              }
            }}
            enableReinitialize
            validationSchema={LocationSchema}
            onSubmit={values => this.handleLocation(values)}
            children={props => (
              <LocationForm
                {...props}
                locationInfo={this.state}
                change={this.change}
                onDoubleClick={this.doubleClick}
                classes={this.props.classes}
                buttonName="Save"
              />
            )}
          />
        </CardBody>
      </Card>
    );
  }
}

LocationEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    location: state.location.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocation: id => dispatch(fetchLocation(id)),
    editLocation: (values, history) => dispatch(editLocation(values, history))
  };
};

export default compose(
  withStyles(validationFormStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LocationEdit);
