'use strict'
import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';

var Main = require('../components/Main');
var Home = require('../components/Home');
var PromptContainer = require('../containers/PromptContainer');
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer');
var ResultsContainer = require('../containers/ResultsContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='playerOne' header='Player One' component={PromptContainer} />
      <Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
      <Route path='battle' component={ConfirmBattleContainer} />
      <Route path='results' component={ResultsContainer} />
    </Route>
  </Router>
);

module.exports = routes;
