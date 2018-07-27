import * as Raven from 'raven-js';

const sentryPublicDsn = process.env.SENTRY_PUBLIC_DSN;

export function register() {
  if (sentryPublicDsn) {
    Raven.config(sentryPublicDsn, {
      environment: process.env.NODE_ENV,
      release: process.env.VERSION,
      serverName: process.env.BUILD_TARGET,
    }).install();
  }
}

export function capture(error: Error) {
  if (sentryPublicDsn) {
    if (error.stack) {
      // Replace firefox extension URLs
      error.stack = error.stack.replace(
        /moz-extension:\/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
        'resource://tabliss-extension',
      );

      // Replace chrome extension URLs
      error.stack = error.stack.replace(
        /chrome-extension:\/\/hipekcciheckooncpjeljhnekcoolahp/g,
        'resource://tabliss-extension',
      );
    }

    Raven.captureException(error);
  }
}
