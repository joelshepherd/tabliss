import * as Raven from 'raven-js';

export function register() {
  if (process.env.SENTRY_PUBLIC_DSN) {
    Raven.config(<string> process.env.SENTRY_PUBLIC_DSN, {
      environment: process.env.NODE_ENV,
      release: '1.11.1',
      serverName: process.env.BUILD_TARGET,
    }).install();
  }
}
