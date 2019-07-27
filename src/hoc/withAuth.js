import React from 'react';
import { logout } from "../actions/auth";
import { eUserType } from 'constants.js';
import { providerRoutes } from 'routes/dashboard';

export default function withAuth(WrapComponent, userDetail) {
  return class extends React.Component {
    componentDidMount() {
      const userSub = localStorage.getItem('userSub');
      if (
        !userSub
        || (userDetail
          && userDetail.userType === eUserType.provider
          && !providerRoutes.includes(this.props.history.location.pathname))
      ) {
        logout(this.props.history);
      }
    }

    render() {
      return <WrapComponent {...this.props} />
    }
  };
}
