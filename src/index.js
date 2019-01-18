import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Amplify from 'aws-amplify';

//import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import indexRoutes from "./routes/index.jsx";
import reducers from './reducers';
import "./assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import App from './App';
import { withAuthenticator } from 'aws-amplify-react';
//const AppWithAuth = withAuthenticator(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const federated = {
    google_client_id: '1075505092107-j8821j05r48pco773m0mqb16g1po5gtj.apps.googleusercontent.com',
    facebook_app_id: '243175483037775',
    amazon_client_id: ''
};

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-southeast-2:adab2657-684c-4222-a17a-9a82b6a5ee84',
        
        // REQUIRED - Amazon Cognito Region
        region: 'AP-SOUTHEAST-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'AP-SOUTHEAST-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-southeast-2_0sAegznUX',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3ov1blo2eji4acnqfcv88tcidn',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        
        // OPTIONAL - customized storage object
        //storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH'
	}
});

const hist = createBrowserHistory();
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk, logger))(createStore);
const store = createStoreWithMiddleware(reducers);
ReactDOM.render(
	<Provider store={store}>
		<Router history={hist}>
			<Switch>
	      {indexRoutes.map((prop, key) => {
	        return <Route path={prop.path} component={prop.component} key={key} />;
	      })}
			</Switch>
		</Router>
	    </Provider>,
	document.getElementById('root')
);

