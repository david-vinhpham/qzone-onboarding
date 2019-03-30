import React from 'react';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputLabel } from '@material-ui/core';

// core components
import GridContainer from '../../../components/Grid/GridContainer.jsx';
import GridItem from '../../../components/Grid/GridItem.jsx';
import CustomInput from '../../../components/CustomInput/CustomInput.jsx';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      firstnameState: '',
      lastname: '',
      description: ''
    };
  }

  sendState() {
    return this.state;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [`${stateName}State`]: 'success' });
        } else {
          this.setState({ [`${stateName}State`]: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }

  isValidated() {
    if (this.state.firstnameState === 'success' && this.state.lastnameState === 'success') {
      return true;
    }
    if (this.state.firstnameState !== 'success') {
      this.setState({ firstnameState: 'error' });
    }
    if (this.state.lastnameState !== 'success') {
      this.setState({ lastnameState: 'error' });
    }

    return true;
  }

  onDoubleClick = fieldname => {
    this.setState({ isEditMode: fieldname });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Let's start with the basic information</h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <CustomInput
            success={this.state.firstnameState === 'success'}
            error={this.state.firstnameState === 'error'}
            labelText={
              <span>
                First Name <small>(required)</small>
              </span>
            }
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
            onChange={event => this.change(event, 'firstname', 'length', 3)}
          />
        </GridItem>
        <GridItem xs={12} sm={5}>
          <CustomInput
            labelText={<span>Last Name</span>}
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.inputAdornment}>
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
            onChange={event => this.change(event, 'lastname')}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <InputLabel style={{ color: '#AAAAAA' }}>Description</InputLabel>
          <CustomInput
            id="about-me"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              multiline: true,
              rows: 5
            }}
            onChange={event => this.change(event, 'description')}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step1);
