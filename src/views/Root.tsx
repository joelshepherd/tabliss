import React, { FC, StrictMode } from "react";
import App from "./App";
import TimeProvider from "../contexts/time";
import UiProvider from "../contexts/ui";
import IntlProvider from "../locales/IntlProvider";

const Root: FC = () => (
  <StrictMode>
    <UiProvider>
      <IntlProvider>
        <TimeProvider>
          <App />
        </TimeProvider>
      </IntlProvider>
    </UiProvider>
  </StrictMode>
);

export default Root;
