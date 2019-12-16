import 'polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Amplify from 'aws-amplify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueColor from '@material-ui/core/colors/blue';
import pinkColor from '@material-ui/core/colors/pink';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import thunk from 'redux-thunk';

import indexRoutes from './routes';
import reducers from './reducers';
import './utils/responseHandler';
import './assets/scss/material-dashboard-pro-react.css';
import 'react-phone-number-input/style.css';
import 'assets/scss/global.scss';
import { RESET_ALL_STATES } from 'actions/common';
import axios from 'axios';
import { API_ROOT } from 'config/config';
import Alert from 'components/Alert/Alert';

axios.defaults.baseURL = API_ROOT;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-2:adab2657-684c-4222-a17a-9a82b6a5ee84',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-2',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'ap-southeast-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-2_0sAegznUX',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3ov1blo2eji4acnqfcv88tcidn',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true

    // OPTIONAL - customized storage object
    // storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  Analytics: {
    disabled: process.env.NODE_ENV === 'development',
  }
});

const hist = createBrowserHistory();
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware((state, action) => {
  if (action.type === RESET_ALL_STATES) return reducers(undefined, action);
  return reducers(state, action);
});
const theme = createMuiTheme({
  typography: {},
  palette: {
    primary: blueColor,
    secondary: pinkColor,
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            {indexRoutes.map(prop => {
              return <Route path={prop.path} component={prop.component} key={prop.path} />;
            })}
          </Switch>
        </Router>
        <Alert />
      </Provider>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

export default store;
