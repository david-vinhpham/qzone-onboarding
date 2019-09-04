import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';

axios.interceptors.response.use(
  resp => {
    if (resp.data.message) {
      if (!resp.data.success) {
        Alert.error(<AlertMessage>{resp.data.message}</AlertMessage>);
      }
    }
    return resp;
  },
  error => {
    if (error.response && error.response.data.message) {
      Alert.error(<AlertMessage>{error.response.data.message}</AlertMessage>);
    }
  }
);
