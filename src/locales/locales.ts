import * as browserLanguage from 'in-browser-language';
import { addLocaleData } from 'react-intl';
import * as csLocaleData from 'react-intl/locale-data/cs';
import * as deLocaleData from 'react-intl/locale-data/de';
import * as esLocaleData from 'react-intl/locale-data/es';
import * as frLocaleData from 'react-intl/locale-data/fr';
import * as huLocaleData from 'react-intl/locale-data/hu';
import * as idLocaleData from 'react-intl/locale-data/id';
import * as itLocaleData from 'react-intl/locale-data/it';
import * as koLocaleData from 'react-intl/locale-data/ko';
import * as nlLocaleData from 'react-intl/locale-data/nl';
import * as noLocaleData from 'react-intl/locale-data/no';
import * as plLocaleData from 'react-intl/locale-data/pl';
import * as ptLocaleData from 'react-intl/locale-data/pt';
import * as roLocaleData from 'react-intl/locale-data/ro';
import * as ruLocaleData from 'react-intl/locale-data/ru';
import * as skLocaleData from 'react-intl/locale-data/sk';
import * as trLocaleData from 'react-intl/locale-data/tr';
import * as viLocaleData from 'react-intl/locale-data/vi';
import * as zhLocaleData from 'react-intl/locale-data/zh';

// Add locale data
addLocaleData([
  ...csLocaleData,
  ...deLocaleData,
  ...esLocaleData,
  ...frLocaleData,
  ...huLocaleData,
  ...idLocaleData,
  ...itLocaleData,
  ...koLocaleData,
  ...nlLocaleData,
  ...noLocaleData,
  ...plLocaleData,
  ...ptLocaleData,
  ...roLocaleData,
  ...ruLocaleData,
  ...skLocaleData,
  ...trLocaleData,
  ...viLocaleData,
  ...zhLocaleData,
]);

// Add translation data
export const messages = {
  cs: require('./lang/cs.json'),
  de: require('./lang/de.json'),
  en: {},
  'en-AU': require('./lang/en-AU.json'),
  'en-GB': require('./lang/en-GB.json'),
  es: require('./lang/es.json'),
  fr: require('./lang/fr.json'),
  hu: require('./lang/hu.json'),
  id: require('./lang/id.json'),
  it: require('./lang/it.json'),
  ko: require('./lang/ko.json'),
  nl: require('./lang/nl.json'),
  no: require('./lang/no.json'),
  ro: require('./lang/ro.json'),
  ru: require('./lang/ru.json'),
  sk: require('./lang/sk.json'),
  pl: require('./lang/pl.json'),
  pt: require('./lang/pt.json'),
  tr: require('./lang/tr.json'),
  vi: require('./lang/vi.json'),
  zh: {},
  'zh-CN': require('./lang/zh-CN.json'),
  'zh-TW': require('./lang/zh-TW.json'),
};

export const locales = Object.keys(messages);
export const defaultLocale = browserLanguage.pick(locales, 'en');
