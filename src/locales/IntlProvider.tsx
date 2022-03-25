import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { db } from "../db/state";
import { useValue } from "../lib/db/react";
import { messages } from "./locales";

const IntlProvider: React.FC = ({ children }) => {
  const locale = useValue(db, "locale");

  return (
    <ReactIntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
