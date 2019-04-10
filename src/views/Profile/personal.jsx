import React, { PureComponent } from "react";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import SaveIcon from "@material-ui/icons/CheckCircleOutlined";
import PhoneInput from "react-phone-number-input";
import CustomInput from "../../components/CustomInput/CustomInput";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import personalPageStyles from "../../assets/jss/material-dashboard-pro-react/modules/personalPageStyles";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { classesType } from "../../types/global";

class Personal extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    givenName: PropTypes.string,
    userType: PropTypes.string.isRequired,
    givenNameState: PropTypes.string.isRequired,
    familyName: PropTypes.string,
    familyNameState: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    userSub: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    resetPersonalInfo: PropTypes.func.isRequired,
    inputChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    givenName: undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      givenName: props.givenName,
      userType: props.userType,
      givenNameState: props.givenNameState,
      familyName: props.familyName,
      telephone: props.telephone,
      userStatus: props.userStatus,
      streetAddress: props.streetAddress,
      city: props.city,
      state: props.state,
      postCode: props.postCode,
      country: props.country,
      userSub: props.userSub,
    };
  }

  onChangeGivenName = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'givenName', 'name');
  };

  onChangeFamilyName = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'familyName', 'familyName');
  };


  onChangeStreetAddress = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'streetAddress', 'streetAddress');
  };

  onChangeState = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'state', 'state');
  };

  onChangePostCode = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'postCode', 'postCode');
  };

  onChangePhoneNumber = (telephone) => {
    if (telephone) {
      const { inputChange: inputChangeAction } = this.props;
      inputChangeAction({ target: { value: telephone } }, 'telephone', 'telephone');
    }
  };
  onChangeCity = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'city', 'city');
  };

  onChangeCountry = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'country', 'country');
  };

  changeEditMode = () => {
    this.setState({ isEditMode: true });
  };

  cancelEdit = () => {
    console.log('cancelEdit...');
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
      givenName,
      givenNameState,
      familyName,
      userType,
      city,
      telephone,
      userStatus,
      streetAddress,
      state,
      country,
      postCode
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
                  givenNameState === 'error'
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
                success={givenNameState === 'success' && isEditMode}
                id="givenName"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                  autoFocus: isEditMode, // the focus() only works from the initial render
                }}
                onChange={this.onChangeGivenName}
                value={givenName}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Family name"
                id="familyName"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangeFamilyName}
                value={familyName}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="UserType (required)"
                id="userType"
                inputProps={{
                  disabled: true,
                }}
                formControlProps={{ fullWidth: true }}
                value={userType}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="User Status"
                id="userStatus"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                }}
                value={userStatus}
              />
            </GridItem>
            <GridItem md={6}>
              <PhoneInput
                placeholder="Your phone number"
                className={classes.telephone}
                disabled={!isEditMode}
                value={telephone}
                onChange={this.onChangePhoneNumber}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Street address"
                id="streetAddress"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangeStreetAddress}
                value={streetAddress}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="city"
                id="city"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangeCity}
                value={city}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="State"
                id="state"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangeState}
                value={state}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Your post code"
                id="postCode"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangePostCode}
                value={postCode}
              />
            </GridItem>
            <GridItem md={6}>
              <CustomInput
                labelText="Country"
                id="country"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: !isEditMode,
                }}
                onChange={this.onChangeCountry}
                value={country}
              />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(personalPageStyles)(Personal);
