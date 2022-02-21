import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { UiContext } from "../contexts/ui";
import { ready } from "../state";
import { Dashboard } from "./dashboard";
import { Settings } from "./settings";
import StoreError from "./shared/StoreError";

const messages = defineMessages({
  pageTitle: {
    id: "app.pageTitle",
    description: "Page title that Tabliss displays in the title bar.",
    defaultMessage: "New Tab",
  },
});

enum State {
  Pending,
  Ready,
  Error,
}

const Root: React.FC = () => {
  const { settings } = React.useContext(UiContext);

  const intl = useIntl();
  React.useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  }, [intl]);

  // Wait for storage to be ready before displaying
  const [state, setState] = React.useState(State.Pending);
  React.useEffect(() => {
    ready
      .then(() => setState(State.Ready))
      .catch((err) => {
        console.error(err);
        setState(State.Error);
      });
  }, []);

  if (state === State.Pending) return null;

  return (
    <>
      <Dashboard />
      {settings && <Settings />}
      {state === State.Error ? (
        <StoreError onClose={() => setState(State.Ready)} />
      ) : null}
    </>
  );
};

export default Root;
