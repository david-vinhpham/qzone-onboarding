import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";
// import Dashboard from "layouts/Dashboard.jsx";
// import Pages from "layouts/Pages.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
      {/*
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/' component={Pages} />
      */}
		</Switch>
	</Router>,
	document.getElementById('root')
);

