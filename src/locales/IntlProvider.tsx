import React, { FC } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { useKey } from "../lib/db/react";
import { db } from "../state";
import { messages } from "./locales";

const IntlProvider: FC = ({ children }) => {
  const [locale] = useKey(db, "locale");

  return (
    <ReactIntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
