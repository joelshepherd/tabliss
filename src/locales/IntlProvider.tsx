import React, { FC } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import { useSelector } from "../store";
import { defaultLocale, messages } from "./locales";

const IntlProvider: FC = ({ children }) => {
  const locale = useSelector((state) => state.data.locale || defaultLocale);

  return (
    <ReactIntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
