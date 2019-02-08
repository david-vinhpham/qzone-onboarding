import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, InputLabel }  from "@material-ui/core";      
import TagsInput from "react-tagsinput";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox.jsx";
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import PictureUpload from "../../components/CustomUpload/PictureUpload";

class ProviderForm extends React.Component{
  
	render() {
    const { classes, providerInfo, values, handleChange, handleSubmit, errors, touched} = this.props;
    const {provider, firstNameState, lastNameState, emailState} = providerInfo
		return(
      <form>
        
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              First Name
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'givenName' 
              ?
              <CustomInput
                labelText="First Name"
                value={values.givenName || ''}
                id="givenName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text"
                }}
                onChange= {handleChange}
              /> 
              :
              <InputLabel 
                className={classes.labelLeftHorizontal} 
                sm={4}
                onClick={() => this.props.onDoubleClick('givenName')}
              >
                {values.givenName || 'Given Name'}
              </InputLabel> 
            }
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
             Last Name
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'familyName'
              ?
              <CustomInput
                id="familyName"
                value={values.familyName || ''}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  
                  type: "text"
                }}
                onChange= {handleChange}
              /> 
              :
              <InputLabel 
                className={classes.labelLeftHorizontal} 
                onClick={() => this.props.onDoubleClick('familyName')}
              >
                {values.familyName || 'Family Name'}
              </InputLabel>
            }
          </GridItem>
        </GridContainer>

        <GridContainer>
        <GridItem xs={12} sm={2}>
            <FormLabel className={classes.labelHorizontal}>
              Email
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            { providerInfo.isEditMode === 'email' 
              ?
              <CustomInput
                value={values.email || ''}
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text"
                }}
                onChange= {handleChange}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('email')}
              >
                {values.email || 'Email'}
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
                value={values.avgServiceTime || ''}
                id="avgServiceTime"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  
                  type: "number"
                }}
                
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('avgServiceTime')}
              >
                {values.avgServiceTime || 'avgServiceTime'}
              </FormLabel>
            }
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
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <FormLabel
              className={
                classes.labelHorizontal 
              }
            >
              Email Preference
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4}>
            {providerInfo.isEditMode === 'emailPreference'
              ?
              <CustomInput
                labelText="Email Preference"
                value={values.emailPreference || ''}
                id="emailPreference"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event =>
                    this.props.change(event, "emailPreference")
                }}
              />
              :
              <FormLabel
                className={classes.labelLeftHorizontal}
                onClick={() => this.props.onDoubleClick('emailPreference')}
              >
                {values.emailPreference || 'emailPreference'}
              </FormLabel>
            }
          </GridItem>

          {/* <GridItem xs={12} sm={4}>
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
          </GridItem> */}
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
              checked={values.enableWaitListAppointment || false}
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
                value={values.mobileNumber || ''}
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
                {values.mobileNumber || 'mobileNumber'}
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
                value={values.credentials || ''}
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
                {values.credentials || 'credentials'}
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
              checked={values.isOpen || false}
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