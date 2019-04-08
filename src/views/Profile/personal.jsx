import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/CheckCircleOutlined';
import PhoneInput from 'react-phone-number-input';
import CustomInput from '../../components/CustomInput/CustomInput';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import personalPageStyles from '../../assets/jss/material-dashboard-pro-react/modules/personalPageStyles';
import { classesType } from '../../types/global';
import 'react-phone-number-input/style.css';

class Personal extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    firstname: PropTypes.string,
    firstnameState: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    lastnameState: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    resetPersonalInfo: PropTypes.func.isRequired,
    inputChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    firstname: undefined,
    lastname: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      firstname: props.firstname,
      firstnameState: props.firstnameState,
      lastname: props.lastname,
      lastnameState: props.lastnameState,
      department: props.department,
      companyName: props.companyName,
      phoneNumber: props.phoneNumber,
      postCode: props.postCode,
    };
  }

  onChangeFirstname = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'firstname', 'name');
  };

  onChangeLastname = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'lastname', 'name');
  };

  onChangeDepartment = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'department', 'department');
  };

  onChangeCompanyName = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'companyName', 'companyName');
  };

  onChangePhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      const { inputChange: inputChangeAction } = this.props;
      inputChangeAction({ target: { value: phoneNumber } }, 'phoneNumber', 'phoneNumber');
    }
  };

  onChangePostCode = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'postCode', 'postCode');
  };

  changeEditMode = () => {
    this.setState({ isEditMode: true });
  };

  cancelEdit = () => {
    const { ...oldPersonalInfo } = this.state;
    const { resetPersonalInfo: resetPersonalInfoAction } = this.props;
    this.setState(
      { isEditMode: false },
      () => { resetPersonalInfoAction(oldPersonalInfo); },
    );
  };

  saveEdit = () => {
    const { saveProfile: saveProfileAction } = this.props;
    this.setState({ isEditMode: false }, saveProfileAction);
  };

  render() {
    const {
      classes,
      firstname,
      firstnameState,
      lastname,
      lastnameState,
      department,
      companyName,
      phoneNumber,
      postCode,
    } = this.props;
    const { isEditMode, ...oldPersonalInfo } = this.state;
    let isPersonalModified = false;
    Object.keys(oldPersonalInfo).forEach((key) => {
      if (!key.includes('State')) {
        // eslint-disable-next-line react/destructuring-assignment
        if (oldPersonalInfo[key] !== this.props[key]) {
          isPersonalModified = true;
        }
      }
    });

    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Personal information</h4>
          <div>
            {!isEditMode && <IconButton aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>}
            {isEditMode
              && (
                <IconButton
                  aria-label="Cancel"
                  color="secondary"
                  onClick={this.cancelEdit}
                >
                  <CancelIcon />
                </IconButton>
              )
            }
            {isEditMode
              && (
                <IconButton
                  aria-label="Save"
                  color="primary"
                  onClick={this.saveEdit}
                  disabled={
                    firstnameState === 'error'
                    || lastnameState === 'error'
                    || !isPersonalModified
                  }
                >
                  <SaveIcon />
                </IconButton>
              )
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={6}>
              <CustomInput
                labelText="First name (required)"
                success={firstnameState === 'success' && isEditMode}
                error={firstnameState === 'error' && isEditMode}
                id="firstname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                  autoFocus: isEditMode, // the focus() only works from the initial render
                  onChange: this.onChangeFirstname,
                }}
                value={firstname}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Last name (required)"
                success={lastnameState === 'success' && isEditMode}
                error={lastnameState === 'error' && isEditMode}
                id="lastname"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeLastname,
                  disabled: !isEditMode,
                }}
                value={lastname}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your department"
                id="department"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeDepartment,
                  disabled: !isEditMode,
                }}
                value={department}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your company"
                id="company"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeCompanyName,
                  disabled: !isEditMode,
                }}
                value={companyName}
              />
            </GridItem>
            <GridItem md={6}>
              <PhoneInput
                placeholder="Your phone number"
                className={classes.phoneNumber}
                disabled={!isEditMode}
                value={phoneNumber}
                onChange={this.onChangePhoneNumber}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your post code"
                id="postCode"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangePostCode,
                  disabled: !isEditMode,
                }}
                value={postCode}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(personalPageStyles)(Personal);
