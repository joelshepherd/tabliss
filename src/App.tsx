import React from "react";
import { defineMessages, useIntl } from "react-intl";
import { UiContext } from "./contexts/ui";
import { Dashboard } from "./views/dashboard";
import { Settings } from "./views/settings";

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

  return (
    <>
      <Dashboard />
      {settings && <Settings />}
    </>
  );
};

export default Root;
