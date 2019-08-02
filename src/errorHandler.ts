import { init, captureException } from '@sentry/browser';

export function register() {
  init({
    dsn: process.env.SENTRY_PUBLIC_DSN,
    enabled: Boolean(process.env.SENTRY_PUBLIC_DSN),
    release: process.env.VERSION,
  });
}

export function capture(error: Error) {
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

  captureException(error);
}
