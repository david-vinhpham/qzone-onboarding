import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TagsInput from "react-tagsinput";
import { connect } from 'react-redux';
import { compose } from 'redux';

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { fetchTimezones } from '../../../actions/provider'

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  ...customSelectStyle
};

const userStatusOptions = [ 
  'CONFIRMED', 
  'UNCONFIRMED', 
  'ARCHIVED', 
  'COMPROMISED', 
  'UNKNOWN', 
  'RESET_REQUIRED', 
  'FORCE_CHANGE_PASSWORD' 
]

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      qualifications:[],
      userStatus: 'FORCE_CHANGE_PASSWORD',
      timezoneId: ''
    };
  }
  
  componentDidMount() {
    this.props.fetchTimezones();
  }

  sendState() {
    return this.state;
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isValidated() {
    return true;
  }

  handleTags = (regularTags) => {
    this.setState({ tags: regularTags });
  }

  handleQualifications = (regularTags)  => {
    this.setState({ qualifications: regularTags})
  }

  render() {
    const { classes, timezones } = this.props;
    let categoryOptions = [];
		if (timezones.length > 0) {
			categoryOptions = timezones;
		}
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>Tell us about you?</h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={5}>
            <InputLabel >Tags</InputLabel>
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTags}
              addKeys={[9, 13, 32, 188]}
              tagProps={{ className: "react-tagsinput-tag info" }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <InputLabel >Qualifications</InputLabel>
            <TagsInput
              value={this.state.qualifications}
              onChange={this.handleQualifications}
              addKeys={[9, 13, 32, 188]}
              tagProps={{ className: "react-tagsinput-tag info" }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
          <InputLabel > User Status   </InputLabel>
              <Select
                name="userStatus"
                value={this.state.userStatus}
                onChange={this.handleSimple}
              >

                {userStatusOptions.map(option => (
                  <MenuItem
                    key={ option }
                    value={ option }

                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
           
          </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <InputLabel >  Time Zone   </InputLabel>
              <Select
                name="timezoneId"
                value={this.state.timezoneId}
                onChange={this.handleSimple}
              >

                {categoryOptions.map(option => (
                  <MenuItem
                    key={ option }
                    value={ option }

                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
           
          </GridItem>
        </GridContainer>
      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    timezones: state.providers.timezones
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTimezones: () => dispatch(fetchTimezones())
  }
}
export default compose(
	withStyles(style),
	connect(mapStateToProps, mapDispatchToProps),
)(Step3);

