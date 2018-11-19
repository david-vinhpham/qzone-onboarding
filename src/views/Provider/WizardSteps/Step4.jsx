import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

import TagsInput from "react-tagsinput";

// core components
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";

import customSelectStyle from "../../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    ...customSelectStyle
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const locations = [
    'New Delhi',
    'Bengluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Bhopal',
    'Indore',
    'Mumbai',
    'Pune',
    'Noida',
];

const services = [
    'Credit Card',
    'Loan', 
    'Account',
    'Net Banking'
]

class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            services: []
        };
        
    }
    sendState() {
        return this.state;
    }
    isValidated() {
        return true;
    }
    handleChange = event => {
        this.setState({ name: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12}>
                        <h4 className={classes.infoText}>Update providers location and service</h4>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} >
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel >Location</InputLabel>
                            <Select
                                multiple
                                value={this.state.locations}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {locations.map(location => (
                                    <MenuItem key={location} value={location}>
                                        <Checkbox checked={this.state.locations.indexOf(location) > -1} />
                                        <ListItemText primary={location} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12}>
                        <FormControl fullWidth className={classes.formControl}>
                            {/* <InputLabel >Services</InputLabel>
                            <Select
                                multiple
                                value={this.state.services}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {services.map(service => (
                                    <MenuItem key={service} value={service}>
                                        <Checkbox checked={this.state.services.indexOf(service) > -1} />
                                        <ListItemText primary={service} />
                                    </MenuItem>
                                ))}
                            </Select> */}
                        </FormControl>
                        
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}

export default withStyles(style)(Step4);
