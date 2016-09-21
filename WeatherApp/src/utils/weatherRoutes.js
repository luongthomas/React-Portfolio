import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

var Main = require('../components/Main');
var Home = require('../components/Home');
var Forecast = require('../components/Forecast');
var PageTwo = require('../components/PageTwo');
var PageThree = require('../components/PageThree');

var weatherRoutes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/forecast/:city' component={Forecast}/>
      <Route path='/pagetwo' component={PageTwo}/>
      <Route path='/pagethree' component={PageThree}/>
    </Route>
  </Router>
);

module.exports = weatherRoutes;
