import React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { useSelector } from 'react-redux';

import { Dashboard } from './views/dashboard';
import { Settings } from './views/settings';
import { IntlProvider } from './locales';
import { RootState } from './store/store';
import StoreProvider from './store/StoreProvider';
import './Root.sass';

type Props = InjectedIntlProps;

const messages = defineMessages({
  pageTitle: {
    id: 'app.pageTitle',
    description: 'Page title that Tabliss displays in the title bar.',
    defaultMessage: 'New Tab',
  },
});

const Root: React.FC<Props> = ({ intl }) => {
  React.useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  });
  const showSettings = useSelector((state: RootState) => state.ui.settings);

  return (
    <StoreProvider>
      <IntlProvider>
        <div className="Root">
          <Dashboard />
          {showSettings && <Settings />}
        </div>
      </IntlProvider>
    </StoreProvider>
  );
};

export default injectIntl(Root);
