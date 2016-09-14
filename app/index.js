var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js')


var sentryKey = '3db5bc6e52384976a76cace43c8a7e12';
var sentryApp = '99058';
var sentryURL = 'https://' + sentryKey + '@sentry.io/' + sentryApp;

var _APP_INFO = {
  name: 'Github Battle',
  branch: 'video4',
  version: '1.0'
}

Raven.config(sentryURL, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch,
    github_commit: 'commithash',
  }
}).install();

// console.log(window.thing.nope);

ReactDOM.render(routes, document.getElementById('app')
)
