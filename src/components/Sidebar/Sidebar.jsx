import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import { get } from 'lodash';
import withStyles from "@material-ui/core/styles/withStyles";
import { Collapse, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import sidebarStyle from "../../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
import { eUserType } from "constants.js";
import { providerRoutes, managementRoutes } from "routes/dashboard.js";

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
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
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
      openAvatar: managementRoutes.some(link => this.activeRoute(link.path)),
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
    } = this.props;
    const userName = get(userDetail, 'fullName');
    const userImage = get(userDetail, 'imageUrl');
    const isProvider = userDetail.userType ? userDetail.userType === eUserType.provider : true;
    const itemText = cx(classes.itemText, {
      [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
    });
    const collapseItemText = cx(classes.collapseItemText, {
      [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive
    });
    const userWrapperClass = cx(classes.user, {
      [classes.whiteAfter]: bgColor === "white"
    });

    const adminNavItems = (
      <List className={cx(classes.list, classes.collapseList)}>
        {managementRoutes.map(route => (
          <ListItem key={route.path} className={classes.collapseItem}>
            <NavLink
              to={route.path}
              data-test-id={route.dataTestId}
              className={cx(classes.itemLink, classes.userCollapseLinks, {
                [classes[color]]: this.activeRoute(route.path)
              })}
            >
              <span className={classes.collapseItemMini}>
                {route.shortName}
              </span>
              <ListItemText
                disableTypography
                primary={route.name}
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    );

    const user = (
      <div className={userWrapperClass}>
        <div className={classes.photo}>
          {userImage && <img src={userImage} className={classes.avatarImg} alt="..." />}
          {!userImage && <Avatar classes={{
            colorDefault: classes.avatar,
          }} component='div'>{userName && userName[0]}</Avatar>}
        </div>
        <List className={classes.list}>
          <ListItem className={cx(classes.item, classes.userItem)}>
            <NavLink
              to="#"
              data-test-id="openAvatar"
              className={cx(classes.itemLink, classes.userCollapseButton)}
              onClick={(e) => {
                e.preventDefault();
                if (!isProvider) this.openCollapse("openAvatar");
              }}
            >
              <ListItemText
                primary={userName}
                secondary={
                  !isProvider && <b className={cx(classes.caret, classes.userCaret, {
                    [classes.caretActive]: !!this.state.openAvatar
                  })} />
                }
                disableTypography={true}
                className={cx(itemText, classes.userItemText)}
              />
            </NavLink>
            {!isProvider && <Collapse in={this.state.openAvatar} unmountOnExit>
              {adminNavItems}
            </Collapse>}
          </ListItem>
        </List>
      </div >
    );

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
      [classes.logoNormalSidebarMini]: this.props.miniActive && this.state.miniActive
    });
    const logoClasses = cx(classes.logo, {
      [classes.whiteAfter]: bgColor === "white"
    });

    const brand = (
      <div className={logoClasses}>
        <a href="/" className={classes.logoMini}>
          <img src={logo} alt="logo" width="26px" height="25px" />
        </a>
        <a href="/" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper = cx(classes.drawerPaper, {
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive
    });
    const sidebarWrapper = cx(classes.sidebarWrapper, {
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1
    });

    return (
      <div ref="mainPanel">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
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
              user={user}
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
