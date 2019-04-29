import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';

axios.interceptors.response.use(null, error => {
  if (error.response) {
    Alert.error(<AlertMessage>{error.response.data.message}</AlertMessage>);
  }
});
