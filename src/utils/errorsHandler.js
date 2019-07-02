import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import AlertMessage from 'components/Alert/Message';

axios.interceptors.response.use(
  resp => {
    if (resp.config.method !== 'get') {
      if (resp.data.success) {
        Alert.success(<AlertMessage>{resp.data.message}</AlertMessage>);
      } else {
        Alert.error(<AlertMessage>{resp.data.message}</AlertMessage>);
      }
    }
    return resp;
  },
  error => {
    if (error.response) {
      Alert.error(<AlertMessage>{error.response.data.message}</AlertMessage>);
    }
  }
);
