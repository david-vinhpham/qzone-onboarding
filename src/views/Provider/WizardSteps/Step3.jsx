import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
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
const KeyCodes = {
  comma: 188,
  enter: 13,
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["pizza", "pasta", "parmesan"]
    };
    this.handleSimple = this.handleSimple.bind(this);
    this.handleTags = this.handleTags.bind(this);
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
  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>Tell us about you?</h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={5}>
            <InputLabel style={{ color: "#AAAAAA" }}>Tags</InputLabel>
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTags}
              addKeys={[9, 13, 32, 188]}
              tagProps={{ className: "react-tagsinput-tag info" }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <InputLabel style={{ color: "#AAAAAA" }}>Qualifications</InputLabel>
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTags}
              addKeys={[9, 13, 32, 188]}
              tagProps={{ className: "react-tagsinput-tag info" }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <InputLabel style={{ color: "#AAAAAA" }}>Description</InputLabel>
            <CustomInput
              id="about-me"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5
              }}
            />
          </GridItem>
        </GridContainer>

      </div>
     );
  }
}

export default withStyles(style)(Step3);
