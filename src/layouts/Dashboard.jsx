import React, { createRef } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import withStyles from '@material-ui/core/styles/withStyles';
import { dashboardRoutes, otherRoutes } from '../routes/dashboard.js';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Header from '../components/Header/Header.jsx';
import appStyle from '../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx';
import image from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/favicon.png';
import withAuth from "../hoc/withAuth";
import { refreshToken, fetchUser } from 'actions/auth.jsx';
import axios from 'axios';

let ps;
class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mainPanelRef = createRef();
    this.state = {
      mobileOpen: false,
      miniActive: false
    };
  }

  async componentDidMount() {
    const { history, userDetail } = this.props;
    const userSub = userDetail.id || localStorage.getItem('userSub');

    await this.props.refreshToken(history);
    if (userSub) this.props.fetchUser(userSub, history);

    if (this.mainPanelRef.current && navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanelRef.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanelRef.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    if (ps && navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }

  getRoute() {
    return this.props.location.pathname !== '/maps/full-screen-maps';
  }

  handleDrawerToggle = () => {
    this.setState(oldState => ({ mobileOpen: !oldState.mobileOpen }));
  };

  sidebarMinimize = () => {
    this.setState(oldState => ({ miniActive: !oldState.miniActive }));
  };

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel = `${classes.mainPanel} ${cx({
      [classes.mainPanelSidebarMini]: this.state.miniActive,
      [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1
    })}`;

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText="QueZone"
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref={this.mainPanelRef}>
          <Header
            sidebarMinimize={this.sidebarMinimize}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              {!!axios.defaults.headers.common['Authorization'] && <Switch>
                {[...otherRoutes, ...dashboardRoutes].map((prop) => {
                  if (prop.redirect) return <Redirect from={prop.path} to={prop.pathTo} key={prop.path} />;
                  return <Route path={prop.path} component={withAuth(prop.component, rest.userDetail)} key={prop.path} />;
                })}
              </Switch>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetail: PropTypes.object.isRequired,
  refreshToken: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userDetail: state.user.userDetail,
});

export default withStyles(appStyle)(connect(mapStateToProps, { refreshToken, fetchUser })(Dashboard));
