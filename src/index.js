import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import thunk from 'redux-thunk';

import indexRoutes from "./routes/index.jsx";
import reducers from './reducers';
import "./assets/scss/material-dashboard-pro-react.css?v=1.2.0";

const hist = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers)
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

