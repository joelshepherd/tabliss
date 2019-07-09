import React, { FC, useEffect } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';

import { Dashboard } from './views/dashboard';
import { Settings } from './views/settings';
import { useSelector } from './store/store';
import './Root.sass';

type Props = InjectedIntlProps;

const messages = defineMessages({
  pageTitle: {
    id: 'app.pageTitle',
    description: 'Page title that Tabliss displays in the title bar.',
    defaultMessage: 'New Tab',
  },
});

const Root: FC<Props> = ({ intl }) => {
  useEffect(() => {
    document.title = intl.formatMessage(messages.pageTitle);
  }, []);
  const showSettings = useSelector(state => state.ui.settings);

  return (
    <div className="App">
      <Dashboard />
      {showSettings && <Settings />}
    </div>
  );
};

export default injectIntl(Root);
