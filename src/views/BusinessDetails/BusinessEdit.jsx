import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormLabel, MenuItem, FormControl, Select }  from "@material-ui/core";  
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import _ from 'lodash';
import validationFormStyle from "../../assets/jss/material-dashboard-pro-react/views/validationFormStyle.jsx";
import CustomRadio from '../../components/CustomRadio/CustomRadio.jsx';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox.jsx';
import BusinessModal from "./BusinessModal";
import * as countryList from "./CountryAndRegion"
var regionList = countryList.COUNTRY_REGION[0].regions
class BusinessEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      standardName: '',
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
      country: countryList.COUNTRY_REGION[0].countryName,
      region: '',
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
      avgRating: '',
      open: false

    };

    this.change = this.change.bind(this);
  }

  change(event, stateName,type,value){
    if (_.isEmpty(event.target.value))
      this.setState({[stateName + "State"]: "error"})
    else {
      this.setState({ [stateName + "State"]: "success" });
    }
    if (stateName === 'country'){
      countryList.COUNTRY_REGION.map(function(arrVal)
      {
        if (arrVal.countryName === event.target.value){
          regionList = arrVal.regions 
          return true
        }
        return false
      });
    }
    this.setState({[stateName]: (event.target.value || event.target.checked)})
    
  }

  editBusiness(option) {
    const {name, address1,city, zip, nameState, address1State, cityState, zipState} = this.state
    if (_.isEmpty(name))
      this.setState({nameState: "error"})
    if (_.isEmpty(address1))
      this.setState({address1State: "error"})
    if (_.isEmpty(city))
      this.setState({cityState: "error"})
    if (_.isEmpty(zip))
      this.setState({zipState: "error"})
    if(nameState === 'success' && address1State === 'success' && cityState === 'success' && zipState === 'success'){
      window.location = '/business_details'
    }
  }

  deleteBusiness(){

  }

  handleModal(){
    this.setState({open: true})
  }
  
  render() {
    const { classes } = this.props;
    const options = []
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
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Name
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Address1
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Address2
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *City
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *PostCode/Zip
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *Country
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <Select
                      value={this.state.country}
                      onChange={event =>
                        this.change(event, "country")}
                      classes={{ select: classes.select }}
                    > 
                      {countryList.COUNTRY_REGION.map(country => (
                        <MenuItem
                          key={country.countryName}
                          value={country.countryName} 
                        >
                          {country.countryName}
                        </MenuItem>
                      ))}
                    </Select>     
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    *State
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <Select
                      value={this.state.region}
                      onChange={event =>
                        this.change(event, "region")}
                      classes={{ select: classes.select }}
                    > 
                      {regionList.map(region => (
                        <MenuItem
                          key={region.name}
                          value={region.name}
                        >
                          {region.name}
                        </MenuItem>
                      ))}
                    </Select>     
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Admin UserId
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <Select
                      value={this.state.standardName}
                      onChange={event =>
                        this.change(event, "standardName")}
                      classes={{ select: classes.select }}
                    > 
                      {options.map(standardName => (
                        <MenuItem
                          key={standardName}
                          value={standardName}
                          
                        >
                          {standardName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>                  
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Telephone
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    labelText="Telephone"
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Extension
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    labelText="Extension"
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Corporate Code
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    labelText="Corporate Code"
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Category
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Website
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Search Tags
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Logo
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomInput
                    
                    id="address1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "logo"),
                      type: "file"
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              <GridContainer>
                <GridItem xs={12} sm={3}>
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
                  <CustomRadio 
                    checkedValue={this.state.serviceType}
                    label="Counter" 
                    value="counter" 
                    classes={classes} 
                    onClick={event =>
                      this.change(event, "serviceType")}/>
                </GridItem>
                <GridItem xs={12} sm={2}>
                  <CustomRadio 
                    checkedValue={this.state.serviceType}
                    label="Provider" 
                    value="provider" 
                    classes={classes} 
                    onClick={event =>
                      this.change(event, "serviceType")}/>
                </GridItem>
              </GridContainer>
              
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Number Of Counters
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
                      min: "0"

                    }}
                  />
                </GridItem>
              </GridContainer>              
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Customer Addi Data
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <Link to="#" onClick={this.handleModal.bind(this)}>Update Customer Addi Data</Link>                     
                </GridItem>
                { this.state.open ? <BusinessModal open={this.state.open} onClose={()=> this.setState({open: false})}/> : ''}
              </GridContainer>    
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox }>
                    Allow Guest
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "allowGuest")}
                    classes={classes} />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox }>
                    Prefer Guest
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "preferGuest")}
                    classes={classes}/>
                </GridItem>
              </GridContainer>             
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox }>
                    Enable WaitList
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "enableWaitlist")}
                    classes={classes}/>
                </GridItem>
              </GridContainer>             
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox }>            
                    Join Remotely
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "joinRemotely")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>              
              <GridContainer>
                <GridItem xs={12} sm={3}>
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
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "providerSelection")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={3}>
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
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "serviceHistory")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>            
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Notification Window
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
                <GridItem xs={12} sm={3}>
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
                <GridItem xs={12} sm={7}>
                  <CustomCheckbox 
                    onClick={event =>this.change(event, "smartNotification")}
                    classes={classes}
                  />
                </GridItem>
              </GridContainer>             
              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Avg Rating
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={7}>
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
            <Button color="rose" onClick={this.editBusiness.bind(this)}>
              Update
            </Button>
            <Button color="rose" onClick={this.deleteBusiness.bind(this, "Save")}>
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
