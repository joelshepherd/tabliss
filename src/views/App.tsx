import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { UiContext } from "../contexts/ui";
import { storageReady } from "../state";
import { Dashboard } from "./dashboard";
import { Settings } from "./settings";

const messages = defineMessages({
  pageTitle: {
    id: "app.pageTitle",
    description: "Page title that Tabliss displays in the title bar.",
    defaultMessage: "New Tab",
  },
});

const Root: React.FC = () => {
  const { settings } = React.useContext(UiContext);

  const intl = useIntl();
  React.useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  }, [intl]);

  // Wait for storage to be ready before displaying
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    storageReady.then(() => setReady(true));
  }, []);
  if (!ready) return null;

  return (
    <>
      <Dashboard />
      {settings && <Settings />}
    </>
  );
};

export default Root;
