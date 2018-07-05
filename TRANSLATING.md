# Adding Translations

This document gives you a step by step guide for how to add your own translations to Tabliss!
Translations are currently only available for the main dashboard (not the settings menu).

1. Fork and checkout the repository
2. Run `npm install` to download the dependencies
3. Add your language code to the languages array in `scripts/translations.js`
4. Run `npm run translations` to generate your language files in `src/locales/lang` (there is currently a bug that prevents the greetings messages from appearing, you will need to add those manually. Check the `en-AU` file for reference)
5. With the help of the default messages and descriptions, edit the JSON file with your translated messages
6. Import your locale data and new messages into the `src/locales/locales.ts` file
7. Finally, add your language to the select dropdown in `src/app/settings/System.tsx`
8. Commit your updated files
9. Submit a Pull Request back to the Tabliss repository!

You can test your changes at anytime by running a local development build of Tabliss with `npm start`.
