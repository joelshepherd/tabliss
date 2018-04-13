const fs = require('fs');
const glob = require('glob');
const parser = require('typescript-react-intl').default;
const manageTranslations = require('react-intl-translations-manager').default;

function runner (cb) {
  let results = [];

  glob('src/**/*.@(tsx|ts)', function (err, files) {
    if (err) {
      throw new Error(err);
    }

    files.forEach(f => {
      const contents = fs.readFileSync(f).toString();
      results = [...results, ...parser(contents)];
    });

    cb(results);
  });
}

runner(res => {
  // Write extracted messages
  fs.writeFileSync(`./src/locales/extractedMessages/messages.json`, JSON.stringify(res, null, 2));

  // Manage translations
  manageTranslations({
    languages: [
      'de',
      'fr',
      'it',
      'ko',
      'pl',
	  'sp',
      'tr',
      'zh',
    ],
    jsonOptions: {
      space: 2,
      trailingNewline: true,
    },
    messagesDirectory: 'src/locales/extractedMessages',
    translationsDirectory: 'src/locales/lang/',
  });
});
