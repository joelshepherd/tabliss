import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { usePushError } from "../api";
import { UiContext } from "../contexts/ui";
import { migrate } from "../db/migrate";
import { cache, initCache, initDb } from "../db/state";
import { Dashboard } from "./dashboard";
import { Settings } from "./settings";
import Errors from "./shared/Errors";
import Modal from "./shared/modal/Modal";
import StoreError from "./shared/StoreError";

const messages = defineMessages({
  pageTitle: {
    id: "app.pageTitle",
    description: "Page title that Tabliss displays in the title bar.",
    defaultMessage: "New Tab",
  },
});

let inited = false;

const Root: React.FC = () => {
  const { errors, settings, toggleErrors } = React.useContext(UiContext);
  const pushError = usePushError();

  const intl = useIntl();
  React.useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  }, [intl]);

  // Wait for storage to be ready before displaying
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    if (!inited) {
      inited = true;
      Promise.allSettled([
        initDb((error) => {
          setError(true);
          pushError({
            message:
              "Cannot open database. Settings cannot be saved or loaded.",
          });
          console.error(error);
          console.error("Caused by:", error.cause);
        }),
        initCache((error) => {
          pushError({
            message: "Cannot open cache. Start up performance may be degraded.",
          });
          console.error(error);
          console.error("Caused by:", error.cause);
        }),
      ]).then(() => {
        migrate();
        setReady(true);
      });
    }
  }, []);

  if (!ready) return null;

  return (
    <>
      <Dashboard />
      {settings ? <Settings /> : null}
      {errors ? <Errors onClose={toggleErrors} /> : null}
      {error ? <StoreError onClose={() => setError(false)} /> : null}
    </>
  );
};

export default React.memo(Root);
