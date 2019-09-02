import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  MenuItem,
  Menu,
  Hidden
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '../CustomButtons/Button';
import headerLinksStyle from '../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import { logout } from "../../actions/auth";


class HeaderLinks extends React.Component {
  state = {
    userOpen: false,
    userAnchorEl: null
  };

  handleUserClick = (e) => {
    const currentEl = e.currentTarget;
    this.setState({
      userOpen: !this.state.userOpen,
      userAnchorEl: currentEl
    });
  };

  handleUserClose = () => {
    this.setState({ userOpen: false });
  };

  handleLogout = () => {
    logout();
  }

  render() {
    const { classes } = this.props;
    const { userOpen, userAnchorEl } = this.state;

    return (
      <div>
        <Button
          color="transparent"
          justIcon
          aria-label="Person"
          aria-owns={userOpen ? 'menu-list' : null}
          aria-haspopup="true"
          onClick={this.handleUserClick}
          className={classes.buttonLink}
          muiClasses={{ label: '' }}
        >
          <Person className={classNames(classes.headerLinksSvg, classes.links)} />
          <Hidden mdUp>
            <span className={classes.linkText}>Profile</span>
          </Hidden>
        </Button>
        <Menu keepMounted anchorEl={userAnchorEl} open={userOpen} onClose={this.handleUserClose}>
          <MenuItem>
            <Link to="/profile">{'Profile'}</Link>
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>
            <Link to="/login">{'Logout'} </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(HeaderLinks);
