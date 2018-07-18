const fs = require('fs');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const manageTranslations = require('react-intl-translations-manager').default;
const parser = require('typescript-react-intl').default;

// Add your language here
// `xx` and `xx-XX` formats are accepted (e.g. 'en' or 'en-AU')
// Then run `npm run translations` to create your language files!
const languages = [
  'cs',
  'de',
  'en-AU',
  'en-GB',
  'es',
  'fr',
  'hu',
  'it',
  'ko',
  'nl',
  'pl',
  'pt',
  'ru',
  'tr',
  'zh-CN',
  'zh-TW',
];

async function main() {
  // Extract messages from source
  const files = await glob('src/**/*.@(tsx|ts)');
  const messages = files
    .map(file => fs.readFileSync(file).toString())
    .reduce((carry, contents) => carry.concat(parser(contents)), []);

  // Write messages to file
  fs.writeFileSync(
    './src/locales/extractedMessages/messages.json',
    JSON.stringify(messages, null, 2),
  );

  // Manage translations
  manageTranslations({
    languages,
    jsonOptions: {
      space: 2,
      trailingNewline: true,
    },
    messagesDirectory: 'src/locales/extractedMessages',
    translationsDirectory: 'src/locales/lang/',
  });
}

// Go go go!
// https://www.youtube.com/watch?v=H9dzpBa73_8
main();
