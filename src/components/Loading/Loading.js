import React, { Component } from 'react';
import { roseColor } from 'assets/jss/material-dashboard-pro-react';
import { ClipLoader } from 'react-spinners';

const loading = {
  background: 'transparent',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  margin: '5em auto'
};

class Loading extends Component {
  render() {
    return (
      <div style={loading}>
        <ClipLoader color={roseColor} size={62} />
      </div>
    );
  }
}

export default Loading;
