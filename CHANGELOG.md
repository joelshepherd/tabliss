# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Fixed

- Initial flash of black before settings load if using a light theme

## [2.5.1] - 2022-04-02

### Fixed

- Migration error that would cause the todo widget to crash

## [2.5.0] - 2022-04-02

### Added

- New Notes widget
- Keyboard shortcut to create a new todo - thanks @noah-curran
- Option to request persistent storage permission from the browser
- Option for weekly Unsplash image rotation

### Changed

- Japanese translation updates - thanks @kodaka

### Fixed

- Custom CSS now loads _before_ the first render, savings eyes everywhere
- Compatibility for older versions of Firefox (54-57)

## [2.4.2] - 2022-03-26

### Fixed

- Tabliss going wild when you change the language or time zone
- Language changes no longer require Tabliss to reload
- Time zone updates are now instant

## [2.4.1] - 2022-03-25

### Fixed

- An init failure that could cause a blank screen on upgrade

## [2.4.0] - 2022-03-25

### Added

- Previous or next buttons to change the Unsplash background
- New UI to display errors

### Changed

- Screen pixel density is now considered for background quality
- German translation updates - thanks @dreadwarrior
- Italian translation updates - thanks @gioxx

### Fixed

- Unsplash's "change every new tab" setting is no longer every second new tab!
- Backgrounds sometimes breaking after restarting Safari
- Cache errors no longer trigger the "Storage Error" modal

## [2.3.0] - 2022-03-14

### Added

- Added GitHub Calendar widget - thanks @vdimir
- Galician translations - thanks Daniel González Portela
- Irish translations - thanks @tsirona
- Canadian English locale

### Fixed

- Added missing time zones
- Fixed displaying "24:XX" in some locales in Chrome
- Spacing at the bottom of the Quote widget has returned to normal
- Icons now have correct vertical alignment again

## [2.2.0] - 2022-03-10

### Added

- Added IP Info widget - thanks @bkis
- Current weather conditions are back thanks to Open-Meteo
- Tabliss can now be displayed as your homepage in Firefox
- Unsplash now supports selecting a topic for background - thanks @betatim
- Added MetaGer search engine - thanks @teknowledgist
- Added bible verses as an option for quotes - thanks @Staubgeborener
- Finnish translations - thanks @Nonecaster
- Nepali translations - thanks @sidbelbase
- Serbian translations - thanks @ZaDavanje
- Thai translations - thanks @NeneNeko

### Changed

- New settings storage engine to reduce instances of Tabliss loosing your settings
- Tabliss will now remember if you have hidden your widgets
- Background blur is now disabled when widgets are hidden
- Unsplash links now open in the same window - thanks @elsiehupp
- Chinese translation updates - thanks @mysmlz
- French translation updates - thanks @ernest33
- German translation updates - thanks @M123-dev
- Scottish Gaelic updates - thanks @fenrisulfr94
- Spanish translation updates - thanks @husseinalkasake

### Fixed

- GIPHY background has been fixed - thanks @OneComputerGuy
- Long quotes no longer break the UI - thanks @CoderOO7
- Link keyboard shortcut not respecting link opening style - thanks @cwils021
- Time zone selection label dispaly issue - thanks @jn64
- And many more minor bug fixes and tweaks

### Removed

- Search suggestions from all extension builds, due to browser extension policies

## [2.1.0] - 2021-01-28

### Added

- Labels and timezone to the clock widget
- Settings can now be exported and imported to/from a JSON file - thanks @jlave-dev
- Links can now be set to open in a new tab - thanks @CraftyDH
- Higher-resolution images for users with larger monitors - thanks @thekaleidoscope
- Lithuanian translations - thanks @TheOnlyGhostwolf
- Scottish Gaelic translations - thanks @fenrisulfr94
- Tamil translations - thanks @RamyaChinnadurai
- Farsi translations - thanks @sarended
- Luxembourgish translations - thanks @jaclo187

### Changed

- Improved typography in quotes - thanks @apollisa
- Simplifying add todo interface - thanks @trickypr
- Toggle AM / PM for 12 hour time
- Ukranian translations - thanks @aquaminer, @p182
- Hungarian translations - thanks @qcz
- Russian translations - thanks @alexesprit
- Spanish translations - thanks @TheFireRed
- Portuguese (Brazil) translations - thanks @adilsonfsantos
- Italian translations - thanks @blackcat-917

### Fixed

- Alignment of multi-column quick links when they are narrower than other widgets in their slot
- Search box now properly respects light mode
- Midnight showing as "24:00" in Chrome when using 24-hour time - thanks @trickypr!
- Ignore keyboard shortcuts including meta, control or alt keys - thanks @trickypr

## [2.0.3] - 2020-04-15

### Fixed

- An interactions between the cache and custom time zones that would refresh the background constantly
- Added more spacing to temperatures in weather widget to be less confusing

## [2.0.2] - 2020-04-14

### Added

- Labels for the temperatures in the weather widget

### Fixed

- Styling of quick links on small screens (and in general)

## [2.0.1] - 2020-04-14

### Added

- Added back the font weight selector - thanks @trickypr
- Added back the slight fade in on load

### Changes

- Making the weather forecast easier to read with negative temperatures

## [2.0.0] - 2020-04-13

Tabliss has essentially been rewritten from scratch to be faster, more modern, and easier to contribute too.

### Added

- **Move widgets around the screen!**
- **Add a widget multiple times!**
- **Sync your settings!** via Firefox or Chrome account sync.
- Backgrounds and widgets now automatically update without needing to refresh the page.
- You can now add the same widget multiple times.
- New live NBA scores plugin - thanks @gonzalrick
- Swedish translations - thanks @Vecopotryx
- Hindi and Gujarati translations - thanks @ashishpanchal
- Japanese transations - thanks @kodaka
- Ukranian translations - thanks @aquaminer
- Greek transations - thanks @Damian96
- Brazilian Portuguese translations - thanks @adilsonfsantos
- Catalan transations - thanks @mnguerra

### Changed

- The weather widget now shows the forecast for the day, instead of the current conditions.
- GIHPY background now accepts a comma-separated list of tags - thanks @yuannan
- Various changes and improvements throughout the different widgets and backgrounds.
- Performance improvements in load time and elsewhere.
- Small adjustments to existing translations.
- Some polish to the settings UI.

### Fixed

- Settings not saving if using "always browse in private mode" in Firefox.
- Search with non URI-encodable characters - thanks @Thanaen
- Various bug fixes across Tabliss.

### Remove

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
