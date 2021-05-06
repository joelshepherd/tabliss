export const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
export const UNSPLASH_UTM =
  '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

export const officialCollection = 1053828;

// The Unicode symbol strings are an alternative to the SVG icons.
export const LIKED_OFF_STRING = String.fromCharCode(9825);    // ♡ or &#9825; Unicode heart outline
export const LIKED_OFF_COLOR = '';                            // Inherit
export const LIKED_ON_STRING = String.fromCharCode(9829);     // ♥︎ or &#9829; Unicode solid heart
export const LIKED_ON_COLOR = 'color:#f15151';                // Red (from Unsplash)
export const LIKED_HOVER_COLOR = 'color:#E04C4C';             // Dark Red  (from Unsplash)
export const DOWNLOAD_STRING = String.fromCharCode(10515);    // ⤓ or &#10515; Unicode downwards arrow to bar

// SVG Icons are from Microsoft Fluent UI System Icons:
// https://github.com/microsoft/fluentui-system-icons
// Under the MIT License:
// https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE
export const LIKED_OFF_SVG = require('./heart_empty.svg');
export const LIKED_ON_SVG = require('./heart_empty.svg');
export const DOWNLOAD_LIGHT_SVG = require('./download_light.svg');
export const DOWNLOAD_BOLD_SVG = require('./download_bold.svg');

// The SVGs needs to be ported to react-inlinesvg in order to work
// They don't actually work right now
// https://www.npmjs.com/package/react-inlinesvg

// Alternately these could use <Icon>,
// but feather-icons doesn't have a filled heart
// and modifying the icon in code seems overly complicated
