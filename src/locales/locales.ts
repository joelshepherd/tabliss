import browserLanguage from 'in-browser-language';
import { addLocaleData } from 'react-intl';
import csLocaleData from 'react-intl/locale-data/cs';
import deLocaleData from 'react-intl/locale-data/de';
import esLocaleData from 'react-intl/locale-data/es';
import frLocaleData from 'react-intl/locale-data/fr';
import huLocaleData from 'react-intl/locale-data/hu';
import idLocaleData from 'react-intl/locale-data/id';
import itLocaleData from 'react-intl/locale-data/it';
import koLocaleData from 'react-intl/locale-data/ko';
import nlLocaleData from 'react-intl/locale-data/nl';
import noLocaleData from 'react-intl/locale-data/no';
import plLocaleData from 'react-intl/locale-data/pl';
import ptLocaleData from 'react-intl/locale-data/pt';
import roLocaleData from 'react-intl/locale-data/ro';
import ruLocaleData from 'react-intl/locale-data/ru';
import skLocaleData from 'react-intl/locale-data/sk';
import trLocaleData from 'react-intl/locale-data/tr';
import viLocaleData from 'react-intl/locale-data/vi';
import zhLocaleData from 'react-intl/locale-data/zh';

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
export const messages: { [key: string]: object } = {
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
