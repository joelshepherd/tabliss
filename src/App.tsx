import React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';

import { Dashboard } from './views/dashboard';
import { Settings } from './views/settings';
import { RootState, useSelector } from './store/store';
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
  const showSettings = useSelector(state => state.ui.settings);

  return (
    <div className="App">
      <Dashboard />
      {showSettings && <Settings />}
    </div>
  );
};

export default injectIntl(Root);
