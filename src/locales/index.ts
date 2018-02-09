import * as browserLanguage from 'in-browser-language';
import { addLocaleData } from 'react-intl';
import * as frLocaleData from 'react-intl/locale-data/fr';
import * as koLocaleData from 'react-intl/locale-data/ko';

// Add locale data
addLocaleData([
  ...frLocaleData,
  ...koLocaleData,
]);

// Add translation data
const translations = {
  en: {},
  fr: require('./lang/fr.json'),
  ko: require('./lang/ko.json'),
};

export const locale = browserLanguage.pick(Object.keys(translations), 'en');
export const messages = translations[locale];
