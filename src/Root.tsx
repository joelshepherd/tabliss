import React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { connect, Provider as StoreProvider } from 'react-redux';
import { compose } from 'redux';

import { RootState } from './data';
import { Dashboard } from './views/dashboard';
import { Settings } from './views/settings';
import { store } from './data';
import { IntlProvider } from './locales';
import './Root.sass';

type ConnectedProps = { settings: boolean };
type Props = ConnectedProps & InjectedIntlProps;

const messages = defineMessages({
  pageTitle: {
    id: 'app.pageTitle',
    description: 'Page title that Tabliss displays in the title bar.',
    defaultMessage: 'New Tab',
  },
});

const Root: React.FC<Props> = ({ intl, settings }) => {
  React.useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  });

  return (
    <StoreProvider store={store}>
      <IntlProvider>
        <div className="Root">
          <Dashboard />
          {settings && <Settings />}
        </div>
      </IntlProvider>
    </StoreProvider>
  );
};

const enhance = compose(
  connect((state: RootState) => ({
    settings: state.ui.settings,
  })),
);

export default enhance(injectIntl(Root));
