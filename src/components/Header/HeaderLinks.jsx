import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Manager, Target, Popper } from "react-popper";
import withStyles from "@material-ui/core/styles/withStyles";
import { MenuItem, MenuList, ClickAwayListener, Paper, Grow, Hidden } from "@material-ui/core";
import { Person, Notifications, Dashboard } from "@material-ui/icons";
import Button from "../CustomButtons/Button";
import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    notificationOpen: false,
    userOpen: false
  };
  handleClick = () => {
    this.setState({ notificationOpen: !this.state.notificationOpen });
  };
  handleUserClick = () => {
    this.setState({ userOpen: !this.state.userOpen });
  };
  handleClose = () => {
    this.setState({ notificationOpen: false });
  };
  handleUserClose = () => {
    this.setState({ userOpen: false });
  };
  handleLogout = () => {
    this.setState({ userOpen: false });
    window.location = "/login"
  }
  render() {
    const { classes } = this.props;
    const { notificationOpen , userOpen} = this.state;
    const dropdownItem =
      classes.dropdownItem +
      " " 
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div>
        <Button
          color="transparent"
          simple
          aria-label="Dashboard"
          href="/dashboard"
          justIcon
          className={classes.buttonLink}
          muiClasses={{
            label: ""
          }}
        >
          <Dashboard
            className={
              classes.headerLinksSvg +
              " " +
              classes.links
            }
          />
          <Hidden mdUp>
            <span className={classes.linkText}>
              {"Dashboard"}
            </span>
          </Hidden>
        </Button>
        <Manager className={managerClasses}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={notificationOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
              muiClasses={{
                label: ""
              }}
            >
              <Notifications
                className={
                  classes.headerLinksSvg +
                  " " +
                  classes.links
                }
              />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <span onClick={this.handleClick} className={classes.linkText}>
                  {"Notification"}
                </span>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={notificationOpen}
            className={
              classNames({ [classes.popperClose]: !notificationOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={notificationOpen}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"Mike John responded to your email"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"You have 5 new tasks"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"You're now friend with Andrew"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"Another Notification"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"Another One"}
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>

        <Manager className={managerClasses}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Person"
              aria-owns={userOpen ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleUserClick}
              className={classes.buttonLink}
              muiClasses={{
                label:  ""
              }}
            >
              <Person
                className={
                  classes.headerLinksSvg +
                  " " +
                  classes.links
                }
              />
              <Hidden mdUp>
                <span className={classes.linkText}>
                  {"Profile"}
                </span>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={userOpen}
            className={
              classNames({ [classes.popperClose]: !userOpen }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleUserClose}>
              <Grow
                in={userOpen}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleUserClose}
                      className={dropdownItem}
                    >
                      {"Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleLogout}
                      className={dropdownItem}
                    >
                      {"Logout"}
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(HeaderLinks);
