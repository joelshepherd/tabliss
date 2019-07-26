# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed

- Everything
- @todo Document everything

## [1.18.2] - 2019-07-12

### Removed

- Search suggestions have been disabled in Firefox for security reasons.

## [1.18.1] - 2019-06-25

### Added

- Translations for Slovak! Thanks @mrehacek

### Fixed

- Small typo in Italian translations, thanks @plcancelleri

## [1.18.0] - 2019-05-30

### Added

- New Reload widget! Thanks @trickypr

### Fixed

- Weather widget's city geocoder works again, thanks @Raul6469!
- Unsplash could go permanently black - requiring a reinstall, thanks aptly named @Tester798!

## [1.17.0] - 2019-03-15

### Added

- New search suggestions for the search box! Thanks @Wavum
- Sliders to control darken and blur for Unsplash! Thanks Roman
- Translations for Norwegian! Thanks @Bendreas
- Translations for Indonesian! Thanks @masbossun
- Translations for Vietnamese! Thanks @pnthach95

### Changed

- Improved quotes aesthetic

### Fixed

- Fullscreen mode in Chrome

## [1.16.0] - 2018-09-12

### Added

- New Literature Clock! Thanks @lbngoc
- New Custom JavaScript widget! Thanks @nralbrecht
- Columns for Quick Links! (finally, I know)
- Translations for Romanian!

### Fixed

- Improved Dutch and Spanish translations

## [1.15.0] - 2018-08-03

### Added

- Translations for Czech, Dutch and Traditional Chinese!
- Toggles for minutes and seconds in the time widget.
- An option to slightly blur an Unsplash background.
- Shortcut keys to open setting, toggle widgets and toggle fullscreen.

### Fixed

- Portuguese greeting translations for sleep well.

## [1.14.0] - 2018-07-10

### Added

- View and delete completed todo items.
- Translations for Hungarian, Portuguese and Russian!
- Localisations for Australian and British English.
- Yandex.ru and Mail.ru search engines.

### Changed

- Tabliss no longer controls the homepage in Firefox.
- Feedback widget validation (so I stop getting spammed empty suggestions!).
- Upload image background no longer has a default image.

### Fixed

- Quick Links activating when editing todos.

## [1.13.1] - 2018-06-07

### Fixed

- Firefox review compliance.

## [1.13.0] - 2018-06-04

### Added

- New Todos widget! Now your new tab page too can tell you how lazy you are!
- Better crash protection for individual backgrounds and widgets.

### Fixed

- Spanish translation tweaks.

## [1.12.0] - 2018-04-18

### Added

- Translations for Polish, Italian, Turkish and Spanish!
- Selectable icons for Quick Links.
- Custom CSS widget for advanced users to further customise the look of Tabliss.
- Startpage as a search engine provider.
- Filled in missing timezones and a message alerting of timezones unsupported if selected.

## [1.11.3] - 2018-04-03

### Fixed

- Deprecation message for the Dribbble API.
- Fixed a typo.

## [1.11.2] - 2018-03-29

### Fixed

- A quirk that made the date off by one month.

## [1.11.1] - 2018-03-28

### Fixed

- Date being invalid in browsers for other languages.

## [1.11.0] - 2018-03-27

### Added

- Translations for Simplified Chinese and German!
- Display the date in the time widget.
- Ability to reorder Quick Links.
- Language option added to override to default language detector.

### Changed

- Timezone option moved to top level and now effects both the time and greeting widgets.
- Tabliss is now licensed under the GNU General Public License v3!

## [1.10.1] - 2018-02-10

### Fixed

- 12 hour time not displaying correctly in some locales.

## [1.10.0] - 2018-02-10

### Added

- New Daily Quotes plugin to get your inspired (or laughing) each day.
- Option to manually change your timezone.

### Fixed

- Possible fixes to the Unsplash background sometimes going black.

## [1.9.0] - 2018-01-06

### Added

- The first greeting translations in French and Korean! (and a few other dashboard items)
- Change the order of your widgets with up and down arrows.

### Changed

- Button iconography has been updated to be more consistent and make more sense.

## [1.8.0] - 2017-12-13

### Added

- Upload multiple images to alternate between for your background.
- Naming for Quick Links (instead of showing the URL).

## [1.7.2] - 2017-12-09

### Fixed

- Dashboard links not respecting chosen font colour.
- Quick links activating when typing into a text area. :|

## [1.7.1] - 2017-12-04

### Added

- Lilo is now an available engine for the search box.

### Fixed

- Quick links activating when typing into a text box.

## [1.7.0] - 2017-12-03

### Added

- New Quick Links plugin for your favourite websites. Try using the keyboard shortcut!

### Changed

- Settings menu no longer opens on load if you left it open last time.
- Snappier setting menu open animation ;)

### Fixed

- Tabliss getting confused when you search for exactly `http://` or `https://`.
- Possible issue trying to display incomplete/corrupt gifs.
- An error when cancelling an image upload.
- Fallback for time widget with an unknown timezone.

## [1.6.1] - 2017-11-27

### Added

- Weather input geocoding to get weather location coordinates from city search.

### Changed

- Pausing for Unsplash is now integrated into the "Show new photo" setting. This keeps all image rotation settings together saving confusion.

## [1.6.0] - 2017-11-22

### Added

- Specify an amount of time before Unsplash shows you a new photo.
- Setting to change the placeholder text in the search box.

### Changed

- Tabliss now fades in from black instead of white - saving you 0.25 seconds of being blinded!

## [1.5.1] - 2017-11-20

### Added

- Weather units settings to switch between auto (based on weather location), metric or imperial.

### Fixed

- Whoops, changed "clear day" weather icon from moon, back to sun.

## [1.5.0] - 2017-11-17

### Added

- New analogue clock mode for the time widget.
- New search engines (Baidu, DuckDuckGo, Qwant and Ecosia) for the search box.

### Fixed

- Black screens experienced in Firefox private windows on second (and subsequent) new tabs.

## [1.4.0] - 2017-11-02

### Added

- The weather widget returns! However the "detailed" weather view may be removed in future versions.
- New pause button in Unsplash to keep the same image for a while!

### Changed

- Message widget now accepts multi-line input and respects your spacing.
- Improved the favicon to a high resolution Tabliss logo.

## [1.3.0] - 2017-10-16

### Added

- Search images in Unsplash by custom collections.
- New detailed weather panel for corner mode.

### Changed

- Unsplash darken overlay is now more subtle.
- Tabliss now displays as your homepage in Firefox.

### Removed

- The weather plugin from the selectable plugins. Sorry to bear the bad news!
  However weather APIs are not cheap and I do not currently have the means to afford them at scale.
  I hope to bring the weather widget back in the future. But until then,
  existing users/early adopters of the weather widget can keep it activated (just don't remove it!).

## [1.2.1] - 2017-10-04

### Fixed

- Interactions with background plugins being blocked by widgets container.

## [1.2.0] - 2017-10-03

### Added

- New widgets (core): search box and weather.
- Open newtab page in Chrome on extension install and browser action button clicked.
- Optional email field for the feedback form.

## Changed

- Improved widget settings user experience to be more intuitive.

## [1.1.0] - 2017-09-19

### Changed

- The great styles update
- Default plugin and settings updated

## [1.0.2] - 2017-09-17

### Added

- Loading icon that indicates when a plugin is fetching data.
- Inline form for feedback and suggestions.

### Fixed

- Issue with fullscreen functionality that breaks mobile clients.
- Unsplash settings and fetched image sometimes getting out of sync.

## [1.0.1] - 2017-09-06

### Changed

- Official collection for Unsplash to Tabliss Official.

## [1.0.0] - 2017-09-02

### Added

- New backgrounds (core): colour, gradient and image.
- New backgrounds (extra): Dribbble, GIPHY and Unsplash.
- New widgets (core): time, greeting, message and font.
- Dashboard module
- Settings module
- Plugin repository
