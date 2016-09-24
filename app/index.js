import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import Raven from 'raven-js';

const sentryKey = '3db5bc6e52384976a76cace43c8a7e12';
const sentryApp = '99058';
const sentryURL = 'https://' + sentryKey + '@sentry.io/' + sentryApp;

const _APP_INFO = {
  name: 'Github Battle - ES5/6',
  branch: 'video1',
  version: '1.0',
};

// On error, will ask the user about the error
window.onerror = function () {
  Raven.showReportDialog();
};

Raven.config(sentryURL, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch,
    github_commit: 'commithash',
  },
}).install();

ReactDOM.render(routes, document.getElementById('app'));
