import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email, LockOutline } from "@material-ui/icons";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import { loginUser } from '../../actions/auth';
//import { createScript, signIn } from '../../actions/googleAuth';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      loginEmail: "",
      loginEmailState: "",
      loginPassword: "",
      loginPasswordState: ""
    };

    this.loginClick = this.loginClick.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    //const ga = window.gapi && window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null;
    //if (!ga) createScript();
  }



  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  loginClick() {
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
    }
    if (this.state.loginEmailState === "success" && this.state.loginPasswordState === "success") {
      this.props.loginUser(this.state, this.props.history);
    }
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName]: event.target.value, [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName]: event.target.value, [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { classes, userLoading } = this.props;
    return (

       <div className={classes.content}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                {userLoading === true ?
                (
                  < ClipLoader
                    className={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={userLoading}
                  />
                )
                :
                  (
                  <form>
                    <Card login className={classes[this.state.cardAnimaton]}>
                      <CardHeader
                        className={`${classes.cardHeader} ${classes.textCenter}`}
                        color="rose"
                      >
                        <h4 className={classes.cardTitle}>Log in</h4>
                        <div className={classes.socialLine}>
                          <Button
                            justIcon
                            href=""
                            target="_blank"
                            color="transparent"
                          >
                            <i className={"fab fa-twitter"} />
                          </Button>
                          <Button
                            justIcon
                            href=""
                            target="_blank"
                            color="transparent"
                          >
                            <i className={"fab fa-facebook"} />
                          </Button>
                          <Button
                            justIcon
                            href=""
                            target="_blank"
                            color="transparent"
                          >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <CustomInput
                          labelText="Email..."
                          success={this.state.loginEmailState === "success"}
                          error={this.state.loginEmailState === "error"}
                          id="loginemail"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{

                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            )
                          }}
                          onChange = {event =>
                              this.change(event, "loginEmail", "email")}
                        />
                        <CustomInput
                          labelText="Password"
                          success={this.state.loginPasswordState === "success"}
                          error={this.state.loginPasswordState === "error"}
                          id="loginPassword"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{

                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <LockOutline
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            )
                          }}
                          onChange = {event =>
                              this.change(event, "loginPassword", "password")}
                        />
                        <div>
                          <Button color="rose" simple size="lg" block onClick={this.loginClick}>
                            Submit
                    </Button>
                        </div>
                        <div>
                          <Link to={`/register`}>
                            <Button color="rose" simple size="lg" block>
                              Register as Business User
                        </Button>
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </form>
                  )
              }

              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userDetail: state.user.userDetail,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    verify: state.user.verify
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (value, history) => dispatch(loginUser(value, history)),
  }
}

export default compose(
  withStyles(loginPageStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);
