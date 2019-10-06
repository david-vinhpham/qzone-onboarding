import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink, Link } from "react-router-dom";
import cx from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { Collapse, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import sidebarStyle from "../../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
import { eUserType } from "constants.js";
import { providerRoutes } from "routes/dashboard.js";

var ps;

class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      miniActive: true
    };
  }

  activeRoute = (routeName) => {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }

  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  render() {
    const {
      classes,
      color,
      logo,
      image,
      logoText,
      routes,
      bgColor,
      userDetail,
      miniActive,
      open,
      handleDrawerToggle
    } = this.props;
    const isProvider = userDetail.userType ? userDetail.userType === eUserType.provider : true;
    const itemText = cx(classes.itemText, {
      [classes.itemTextMini]: miniActive && this.state.miniActive,
    });
    const collapseItemText = cx(classes.collapseItemText, {
      [classes.collapseItemTextMini]: miniActive && this.state.miniActive
    });

    const links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (isProvider && !providerRoutes.includes(prop.path)) { return null; }
          if (prop.redirect) { return null; }
          if (prop.collapse) {
            const navLinkClasses = cx(classes.itemLink, {
              [classes.collapseActive]: this.activeRoute(prop.path)
            });

            return (
              <ListItem key={key} className={classes.item}>
                <NavLink
                  to={"#"}
                  className={navLinkClasses}
                  onClick={() => this.openCollapse(prop.state)}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name}
                    secondary={
                      <b
                        className={cx(classes.caret, {
                          [classes.caretActive]: !!this.state[prop.state]
                        })}
                      />
                    }
                    disableTypography={true}
                    className={itemText}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={cx(classes.list, classes.collapseList)}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect) {
                        return null;
                      }
                      const navLinkClasses = cx(classes.collapseItemLink, {
                        [classes[color]]: this.activeRoute(prop.path)
                      });

                      return (
                        <ListItem key={key} className={classes.collapseItem}>
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={classes.collapseItemMini}>
                              {prop.mini}
                            </span>
                            <ListItemText
                              primary={prop.name}
                              disableTypography={true}
                              className={collapseItemText}
                            />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }

          const navLinkClasses = cx(classes.itemLink, {
            [classes[color]]: this.activeRoute(prop.path)
          });

          return (
            <ListItem key={key} className={classes.item}>
              <NavLink to={prop.path} data-test-id={prop.dataTestId} className={navLinkClasses}>
                <ListItemIcon className={classes.itemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.name}
                  disableTypography={true}
                  className={itemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    const logoNormal = cx(classes.logoNormal, {
      [classes.logoNormalSidebarMini]: miniActive && this.state.miniActive
    });

    const brand = (
      <div className={classes.logo}>
        <Link to="/dashboard" className={classes.logoMini}>
          <img src={logo} alt="logo" width="26px" height="25px" />
        </Link>
        <Link to="/dashboard" className={logoNormal}>
          {logoText}
        </Link>
      </div>
    );
    const drawerPaper = cx(classes.drawerPaper, {
      [classes.drawerPaperMini]: miniActive && this.state.miniActive
    });
    const sidebarWrapper = cx(classes.sidebarWrapper, {
      [classes.drawerPaperMini]: miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1
    });

    return (
      <div ref="mainPanel">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              // user={user}
              headerLinks={<HeaderLinks />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={"left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              // user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  userDetail: PropTypes.objectOf(PropTypes.any),
};

export default compose(
  withStyles(sidebarStyle),
  connect(state => ({
    ...state.user,
  })),
)(Sidebar);
