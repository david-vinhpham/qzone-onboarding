import React from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormControlLabel,
         FormLabel,
         Checkbox}  from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import _ from 'lodash';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import validationFormStyle from "assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";


class BusinessEdit extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameState: '',
      searchTags: '',
      description: '',
      logo: '',
      address1: '',
      address1State: '',
      serviceType: null,
      address2: '',
      counter: '',
      city: '',
      cityState: '',
      addiData: '',
      zip: '',
      zipState: '',
      allowGuest: '',
      preferGuest: '',
      country: 'India',
      region: 'Rajasthan',
      userId: '',
      enableWaitlist: '',
      telephone: '',
      providerSelection: '',
      joinRemotely: '',
      extension: '',
      serviceHistory: '',
      corporateCode: '',
      notificationWindow: '',
      category: '',
      smartNotification: '',
      website: '',
     	avgRating: ''

    };

    this.change = this.change.bind(this);
  }



  change(event, stateName,type,value){
  	if (_.isEmpty(this.state.name))
  		this.setState({[stateName + "State"]: "error"})
  	else {
      this.setState({ [stateName + "State"]: "success" });
    }
  	this.setState({[stateName]: (event.target.value || event.target.checked)})
  	// switch (type) {
   //    case "name":
   //      if (this.verifyLength(event.target.value, 3)) {
   //        this.setState({ [stateName + "State"]: "success" });
   //      } else {
   //        this.setState({ [stateName + "State"]: "error" });
   //      }
   //      this.setState({[stateName]: event.target.value})
   //      break;
   //    case "email":
   //      if (this.verifyEmail(event.target.value)) {
   //        this.setState({ [stateName + "State"]: "success" });
   //      } else {
   //        this.setState({ [stateName + "State"]: "error" });
   //      }
   //      this.setState({[stateName]: event.target.value})
   //      break;
   //    case "last-name":
   //      if (this.verifyLength(event.target.value, 3)) {
   //        this.setState({ [stateName + "State"]: "success" });
   //      } else {
   //        this.setState({ [stateName + "State"]: "error" });
   //      }
   //      this.setState({[stateName]: event.target.value})
   //      break;
   //    case "preference":
   //      const { preferenceChecked } = this.state;
   //      const currentIndex = preferenceChecked.indexOf(value);
   //      const newChecked = [...preferenceChecked];

   //      if (currentIndex === -1) {
   //        newChecked.push(value);
   //      } else {
   //        newChecked.splice(currentIndex, 1);
   //      }

   //      this.setState({
   //        preferenceChecked: newChecked
   //      });
   //      break;
   //    case "waitlist":
   //      this.setState({[stateName]: event.target.checked})
   //      break;
   //    case "isOpen":
   //      this.setState({[stateName]: event.target.checked})
   //      break;
   //    default:
   //      this.setState({[stateName]: event.target.value})
   //      break;
   //  }
  }
  handleDropdown(event,stateName){
  	this.setState({[stateName]: event})
  }
  handleProvider(option) {
  	if (_.isEmpty(this.state.name))
  		this.setState({nameState: "error"})
  	if (_.isEmpty(this.state.address1))
  		this.setState({address1State: "error"})
  	if (_.isEmpty(this.state.city))
  		this.setState({cityState: "error"})
  	if (_.isEmpty(this.state.zip))
  		this.setState({zipState: "error"})
  	// if (this.state.lastNameState === "")
  	// 	this.setState({lastNameState: "error"})
   //  if (this.state.emailState === "") {
   //    this.setState({ emailState: "error" });
   //  }
  	// if (this.state.firstNameState === "success" && this.state.lastNameState === "success" && this.state.emailState === "success"){
   //    if (option === "Save")
  	// 	  window.location = "/provider/list"
   //    else
   //      window.location = "/provider/create"
   //  }
  }
	render() {
    const { classes } = this.props;

		return(
			<GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Edit Business Details</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Name"
                    success={this.state.nameState === "success"}
                    error={this.state.nameState === "error"}
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "name"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Search Tags
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Search Tags"
                    id="searchTags"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "searchTags"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "description"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                  	Logo
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Address1
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Address1"
                    success={this.state.address1State === "success"}
                    error={this.state.address1State === "error"}
                    id="address1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "address1"),
                      type: "text"
                    }}
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
                    Service Type
                	</FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                	<div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
	                 	<FormControlLabel
	                    control={
	                      <Radio
	                      	checked={this.state.serviceType === "counter"}
                          value="counter"
	                        onClick={event =>
                            this.change(event, "serviceType")
                          }
	                        name="service_type_counter"
	                        aria-label="C"
	                        icon={
	                          <FiberManualRecord
	                            className={classes.radioUnchecked}
	                          />
	                        }
	                        checkedIcon={
	                          <FiberManualRecord
	                            className={classes.radioChecked}
	                          />
	                        }
	                        classes={{
	                          checked: classes.radio
	                        }}
	                      />
	                    }
	                    classes={{
	                      label: classes.label
	                    }}
	                    label="Counter"
	                  />
	                 </div>
                </GridItem>
                <GridItem xs={12} sm={2}>
                	<div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
	                 	<FormControlLabel
	                    control={
	                      <Radio
	                      	checked={this.state.serviceType === "provider"}
                          onChange={this.handleChange}
                          value="provider"
	                        onClick={event =>
                            this.change(event, "serviceType")
                          }
	                        name="service_type_provider"
	                        aria-label="P"
	                        icon={
	                          <FiberManualRecord
	                            className={classes.radioUnchecked}
	                          />
	                        }
	                        checkedIcon={
	                          <FiberManualRecord
	                            className={classes.radioChecked}
	                          />
	                        }
	                        classes={{
	                          checked: classes.radio
	                        }}
	                      />
	                    }
	                    classes={{
	                      label: classes.label
	                    }}
	                    label="Provider"
	                  />
	                 </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Address2
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Address2"   
                    id="address2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "address2"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Number Of Counters
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Number Of Counter"   
                    id="counter"
                    
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "counter"),
                      type: "number",
                      min: "0",
                      maxLength: "5"
                      
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *City
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="City"
                  	success={this.state.cityState === "success"}
                    error={this.state.cityState === "error"}
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "city"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Customer Addi Data
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *PostCode/Zip
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Zip"
                  	success={this.state.zipState === "success"}
                    error={this.state.zipState === "error"}
                    id="zip"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "zip", "zip"),
                      type: "text"
                    }}
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
                    Allow Guest
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "allowGuest")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Country
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CountryDropdown
					          value={this.state.country}
					          onChange={event =>
                            this.handleDropdown(event, "country")
                          } />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Prefer Guest
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "preferGuest")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    *State
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <RegionDropdown
					          country={this.state.country}
					          value={this.state.region}
					          onChange={event =>
                            this.handleDropdown(event, "region")
                          } />
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
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "enableWaitlist")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Admin UserId
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Join Remotely
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "joinRemotely")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Telephone
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Telephone"
                  	success={this.state.telephoneState === "success"}
                    error={this.state.telephoneState === "error"}
                    id="telephone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "telephone"),
                      type: "text"
                    }}
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
                    Provider Selection
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "providerSelection")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Extension
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Extension"
                  	success={this.state.extensionState === "success"}
                    error={this.state.extensionState === "error"}
                    id="extension"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "extension"),
                      type: "text"
                    }}
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
                    Store Customer Service History
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "serviceHistory")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Corporate Code
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Corporate Code"
                  	success={this.state.corporateCodeState === "success"}
                    error={this.state.corporateCodeState === "error"}
                    id="corporateCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "corporateCode"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Notification Window
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Notification Window"
                    id="notificationWindow"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "notificationWindow"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Category
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                    labelText="Category"
                    id="category"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "category"),
                      type: "text"
                    }}
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
                    Smart Notification
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={event =>
                            this.change(event, "smartNotification")
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                        }
                        classes={{
                          label: classes.label
                        }}  
                    />
                  </div>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Website
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Website"
                    id="website"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "website"),
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Avg Rating
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <CustomInput
                  	labelText="Avg Rating"
                    id="avg_rating"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    	onChange: event =>
                      	this.change(event, "avgRating"),
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
          	<Button color="rose" onClick={this.handleProvider.bind(this)}>
              Update
            </Button>
            <Button color="rose" onClick={this.handleProvider.bind(this, "Save")}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
		)
	}
}

BusinessEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(validationFormStyle)(BusinessEdit);
