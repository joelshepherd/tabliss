import * as browserLanguage from 'in-browser-language';
import { addLocaleData } from 'react-intl';
import * as deLocaleData from 'react-intl/locale-data/de';
import * as esLocaleData from 'react-intl/locale-data/es';
import * as frLocaleData from 'react-intl/locale-data/fr';
import * as itLocaleData from 'react-intl/locale-data/it';
import * as koLocaleData from 'react-intl/locale-data/ko';
import * as plLocaleData from 'react-intl/locale-data/pl';
import * as trLocaleData from 'react-intl/locale-data/tr';
import * as zhLocaleData from 'react-intl/locale-data/zh';

// Add locale data
addLocaleData([
  ...deLocaleData,
  ...esLocaleData,
  ...frLocaleData,
  ...itLocaleData,
  ...koLocaleData,
  ...plLocaleData,
  ...trLocaleData,
  ...zhLocaleData,
]);

// Add translation data
export const messages = {
  de: require('./lang/de.json'),
  en: {}, // Uses default messages
  es: require('./lang/es.json'),
  fr: require('./lang/fr.json'),
  it: require('./lang/it.json'),
  ko: require('./lang/ko.json'),
  pl: require('./lang/pl.json'),
  tr: require('./lang/tr.json'),
  zh: require('./lang/zh.json'),
};

export const locales = Object.keys(messages);
export const defaultLocale = browserLanguage.pick(locales, 'en');
