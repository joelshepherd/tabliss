# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]
### Fixed
- Dashboard links not respecting chosen font colour.

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
