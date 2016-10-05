/* eslint-disable */
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

var Main = require('../containers/Main');
var HomeContainer = require('../containers/HomeContainer');
var ForecastContainer = require('../containers/ForecastContainer');

var DetailContainer = require('../containers/DetailContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={HomeContainer} />
      <Route path='forecast/:city' component={ForecastContainer}/>
      <Route path='detail/:city' component={DetailContainer}/>
    </Route>
  </Router>
);

module.exports = routes;
