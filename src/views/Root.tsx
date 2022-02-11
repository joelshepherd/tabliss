import React from "react";
import TimeProvider from "../contexts/time";
import UiProvider from "../contexts/ui";
import IntlProvider from "../locales/IntlProvider";
import App from "./App";

const Root: React.FC = () => (
  <React.StrictMode>
    <UiProvider>
      <IntlProvider>
        <TimeProvider>
          <App />
        </TimeProvider>
      </IntlProvider>
    </UiProvider>
  </React.StrictMode>
);

export default Root;
