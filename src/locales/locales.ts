import * as browserLanguage from 'in-browser-language';
import { addLocaleData } from 'react-intl';
import * as deLocaleData from 'react-intl/locale-data/de';
import * as esLocaleData from 'react-intl/locale-data/es';
import * as frLocaleData from 'react-intl/locale-data/fr';
import * as huLocaleData from 'react-intl/locale-data/hu';
import * as itLocaleData from 'react-intl/locale-data/it';
import * as koLocaleData from 'react-intl/locale-data/ko';
import * as plLocaleData from 'react-intl/locale-data/pl';
import * as ptLocaleData from 'react-intl/locale-data/pt';
import * as ruLocaleData from 'react-intl/locale-data/ru';
import * as trLocaleData from 'react-intl/locale-data/tr';
import * as zhLocaleData from 'react-intl/locale-data/zh';

// Add locale data
addLocaleData([
  ...deLocaleData,
  ...esLocaleData,
  ...frLocaleData,
  ...huLocaleData,
  ...itLocaleData,
  ...koLocaleData,
  ...plLocaleData,
  ...ptLocaleData,
  ...ruLocaleData,
  ...trLocaleData,
  ...zhLocaleData,
]);

// Add translation data
export const messages = {
  de: require('./lang/de.json'),
  en: {},
  'en-AU': require('./lang/en-AU.json'),
  'en-GB': require('./lang/en-GB.json'),
  es: require('./lang/es.json'),
  fr: require('./lang/fr.json'),
  hu: require('./lang/hu.json'),
  it: require('./lang/it.json'),
  ko: require('./lang/ko.json'),
  ru: require('./lang/ru.json'),
  pl: require('./lang/pl.json'),
  pt: require('./lang/pt.json'),
  tr: require('./lang/tr.json'),
  zh: {},
  'zh-CN': require('./lang/zh-CN.json'),
  'zh-TW': require('./lang/zh-TW.json'),
};

export const locales = Object.keys(messages);
export const defaultLocale = browserLanguage.pick(locales, 'en');
