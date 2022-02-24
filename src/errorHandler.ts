import { init, captureException } from "@sentry/browser";

export function register() {
  init({
    autoSessionTracking: false, // Wtf sentry
    dsn: "https://2e0e75c7477c4c3e9572ee97241e569c@o113629.ingest.sentry.io/250221",
    enabled: !DEV,
    release: VERSION,
  });
}

export function capture(error: Error) {
  if (error.stack) {
    // Replace firefox extension URLs
    error.stack = error.stack.replace(
      /moz-extension:\/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
      "resource://tabliss-extension",
    );

    // Replace chrome extension URLs
    error.stack = error.stack.replace(
      /chrome-extension:\/\/hipekcciheckooncpjeljhnekcoolahp/g,
      "resource://tabliss-extension",
    );
  }

  captureException(error);
}
