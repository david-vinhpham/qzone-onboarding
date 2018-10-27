import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, InputLabel }  from "@material-ui/core";      
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import PictureUpload from "../../components/CustomUpload/PictureUpload";

class ProviderForm extends React.Component{
  
	render() {
    const { classes,providerInfo} = this.props;
    const {provider, firstNameState, lastNameState, emailState} = providerInfo
		return(
      <form>
        <GridContainer>
          <GridItem md={12}>
            <PictureUpload changeProfileImage={this.props.changeProfileImage} imagePreviewUrl={provider.imagePreviewUrl}/>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              *First Name
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'firstName' 
              ?
              <CustomInput
                labelText="First Name"
                success={firstNameState === "success"}
                value={provider.firstName || ''}
                error={firstNameState === "error"}
                id="firstName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "firstName", "first-name"),
                  type: "text"
                }}
              /> 
              :
              <InputLabel 
                className={classes.labelLeftHorizontal} 
                sm={4}
                onClick={() => this.props.onDoubleClick('firstName')}
              >
                {provider.firstName || 'firstName'}
              </InputLabel> 
            }
          </GridItem>

          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              External Provider Id
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'externalProviderId'
              ?
              <CustomInput
                labelText="External Provider Id"
                id="externalProviderId"
                value={provider.externalProviderId || ''}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "externalProviderId"),
                  type: "number"
                }}
              /> 
              :
              <InputLabel 
                className={classes.labelLeftHorizontal} 
                onClick={() => this.props.onDoubleClick('externalProviderId')}
              >
                {provider.externalProviderId || 'externalProviderId'}
              </InputLabel>
            }
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              *Last Name
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'lastName' 
              ?
              <CustomInput
                labelText="Last Name"
                success={lastNameState === "success"}
                error={lastNameState === "error"}
                value={provider.lastName || ''}
                id="lastName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "lastName", "last-name"),
                  type: "text"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('lastName')}
              >
                {provider.lastName || 'lastName'}
              </FormLabel>
            }
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              Avg Service Time
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'avgServiceTime'
              ?
              <CustomInput
                labelText="Avg Service Time"
                value={provider.avgServiceTime || ''}
                id="avgServiceTime"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "avgServiceTime"),
                  type: "number"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('avgServiceTime')}
              >
                {provider.avgServiceTime || 'avgServiceTime'}
              </FormLabel>
            }
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              *Email
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {providerInfo.isEditMode === 'email'
              ?
              <CustomInput
                labelText="Email"
                success={emailState === "success"}
                error={emailState === "error"}
                value={provider.email || ''}
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "email", "email"),
                  type: "email"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('email')}
              >
                {provider.email || 'email'}
              </FormLabel>
            }
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              Avg Customer Per Hour
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'avgCustomersPerHour'
              ?
              <CustomInput
                labelText="Avg Customer Per Hour"
                value={provider.avgCustomersPerHour || ''}
                id="avgCustomersPerHour"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "avgCustomersPerHour"),
                  type: "number"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('avgCustomersPerHour')}
              >
                {provider.avgCustomersPerHour || 'avgCustomersPerHour'}
              </FormLabel>
            }
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel
              className={
                classes.labelHorizontal +
                " " +
                classes.labelHorizontalRadioCheckbox
              }
            >
              Email Preference
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <CustomCheckbox 
              value="IN" 
              label="Individual Appointment Alert" 
              checked={provider.emailPreference.includes("IN") || false}
              onClick={event =>this.props.changeCheckbox(event, "emailPreference", "preference")}
              classes={classes}
            />
            <CustomCheckbox 
              value="DS" 
              label="Daily Summary" 
              checked={provider.emailPreference.includes("DS") || false}
              onClick={event =>this.props.changeCheckbox(event, "emailPreference", "preference")}
              classes={classes}
            />
            <CustomCheckbox 
              value="WS" 
              label="Weekly Summary" 
              checked={provider.emailPreference.includes("WS") || false}
              onClick={event =>this.props.changeCheckbox(event, "emailPreference", "preference")}
              classes={classes}
            />
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormLabel
              className={
                classes.labelHorizontal +
                " " +
                classes.labelHorizontalRadioCheckbox
              }
            >
              Enable WaitList
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            <CustomCheckbox 
              value=""
              checked={provider.enableWaitListAppointment || false}
              label="" 
              onClick={event =>this.props.change(event, "enableWaitListAppointment", "waitlist")}
              classes={classes}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              Mobile
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'mobileNumber'
              ?
              <CustomInput
                labelText="Mobile No"
                value={provider.mobileNumber || ''}
                id="mobileNumber"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "mobileNumber"),
                  type: "text"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('mobileNumber')}
              >
                {provider.mobileNumber || 'mobileNumber'}
              </FormLabel>
            }
          </GridItem>

          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              Credentials
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {providerInfo.isEditMode === 'credentials'
              ?
              <CustomInput
                labelText="Credentials"
                value={provider.credentials || ''}
                id="credentials"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "credentials"),
                  type: "text"
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('credentials')}
              >
                {provider.credentials || 'credentials'}
              </FormLabel>
            }
          </GridItem>

        </GridContainer>
        
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel
              className={
                classes.labelHorizontal +
                " " +
                classes.labelHorizontalRadioCheckbox
              }
            >
              Is Open
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={2}>
            <CustomCheckbox 
              value=""
              checked={provider.isOpen || false}
              onClick={event =>this.props.change(event, "isOpen", "isOpen")}
              classes={classes}
            />
          </GridItem>
          
        </GridContainer>
      </form>
		)
	}
}

export default withStyles(validationFormStyle)(ProviderForm);