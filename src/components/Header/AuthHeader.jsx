import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Button from '../CustomButtons/Button';
import authRoutes from '../../routes/auth.js';
import authHeaderStyle from '../../assets/jss/material-dashboard-pro-react/components/authHeaderStyle.jsx';

class AuthHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }

  handleDrawerToggle = () => {
    this.setState(oldState => ({ open: !oldState.open }));
  };

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  render() {
    const { classes, color } = this.props;
    const appBarClasses = cx({
      [` ${classes[color]}`]: color
    });
    const list = (
      <List className={classes.list}>
        {authRoutes.map(prop => {
          if (prop.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [` ${classes.navLinkActive}`]: this.activeRoute(prop.path)
            });
          return (
            <ListItem key={prop.path} className={classes.listItem}>
              <NavLink to={prop.path} className={navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.shortName}
                  disableTypography
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown implementation="css">
            <div className={classes.flex}>
              <Button href="/" className={classes.title} color="transparent">
                QueZone
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="/" className={classes.title} color="transparent">
                QueZone
              </Button>
            </div>
          </Hidden>
          <Hidden smDown implementation="css">
            {list}
          </Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor="right"
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

AuthHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
};

export default withStyles(authHeaderStyle)(AuthHeader);
