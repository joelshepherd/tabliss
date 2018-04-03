import * as Raven from 'raven-js';

export function register() {
  const sentryPublicDsn = process.env.SENTRY_PUBLIC_DSN;

  if (sentryPublicDsn) {
    Raven.config(sentryPublicDsn, {
      environment: process.env.NODE_ENV,
      release: '1.11.3',
      serverName: process.env.BUILD_TARGET,
    }).install();
  }
}
