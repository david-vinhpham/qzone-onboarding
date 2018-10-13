import React, {Component} from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
//import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import indexRoutes from "./routes/index.jsx";
import reducers from './reducers';
import "./assets/scss/material-dashboard-pro-react.css?v=1.2.0";

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        
        // REQUIRED - Amazon Cognito Region
        region: 'US-EAST-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'US-EAST-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_fzgRc0TBS',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1tkt351u2v46f1rdj9lmb1mvdc',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        
        // OPTIONAL - customized storage object
        //storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH'
	}
});
const hist = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers)

class App extends Component {
  
    render() {
      return (
        <Provider store={store}>
		<Router history={hist}>
			<Switch>
	      {indexRoutes.map((prop, key) => {
	        return <Route path={prop.path} component={prop.component} key={key} />;
	      })}
			</Switch>
		</Router>
	    </Provider>
  
      );
    }
  }
  
  export default withAuthenticator(App, true);


