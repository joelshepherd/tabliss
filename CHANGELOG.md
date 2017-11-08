# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]
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
