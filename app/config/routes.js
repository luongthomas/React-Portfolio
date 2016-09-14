'use strict'
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

var Main = require('../components/Main');
var Home = require('../components/Home');


var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);


module.exports = routes;
