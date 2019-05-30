import * as React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { RootState } from '../data';
import { defaultLocale, messages } from './locales';

interface Props {
  locale: string;
}

const IntlProvider: React.StatelessComponent<Props> = ({
  children,
  locale,
}) => (
  <ReactIntlProvider locale={locale} key={locale} messages={messages[locale]}>
    {children}
  </ReactIntlProvider>
);

const mapStateToProps = (state: RootState) => ({
  locale: state.settings.locale || defaultLocale,
});

export default connect(mapStateToProps)(IntlProvider);
