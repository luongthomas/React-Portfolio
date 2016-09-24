// Provides helpful messages for Sentry
import Raven from 'raven-js';

// extra is any other information we decide to pass to the function, will show up in sentry
function logCustomMessage(message, context) {
  Raven.captureMessage(message, {
    level: 'error',
    extra: context,
  });

  console.error(message);
};

export default logCustomMessage;
