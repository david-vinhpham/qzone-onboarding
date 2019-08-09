import React from 'react';
import { logout } from "../actions/auth";
import { eUserType } from 'constants.js';
import { providerRoutes } from 'routes/dashboard';

export default function withAuth(WrapComponent, userDetail) {
  return class extends React.PureComponent {
    componentDidMount() {
      const userSub = localStorage.getItem('userSub');
      if (
        !userSub
        || (userDetail
          && userDetail.userType === eUserType.provider
          && !providerRoutes.some((route) =>
            this.props.history.location.pathname.includes(
              route.split('/:')[0]
            )
          ))
      ) {
        logout(this.props.history);
      }
    }

    render() {
      return <WrapComponent {...this.props} />
    }
  };
}
