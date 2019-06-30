import React from 'react';
import { logout } from "../actions/auth";

export default function withAuth(WrapComponent) {
  return class extends React.Component {
    componentDidMount() {
      const userSub = localStorage.getItem('userSub');

      if (!userSub) {
        logout(this.props.history);
      }

    }
    render() {
      return <WrapComponent {...this.props} />
    }
  };
}
