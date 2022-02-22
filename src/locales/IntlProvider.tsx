import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { useValue } from "../lib/db/react";
import { db } from "../state";
import { messages } from "./locales";

const IntlProvider: React.FC = ({ children }) => {
  const locale = useValue(db, "locale");

  return (
    <ReactIntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
