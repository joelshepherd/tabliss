import * as React from 'react';

const arrowDown = require('feather-icons/dist/icons/arrow-down.svg');
const arrowUp = require('feather-icons/dist/icons/arrow-up.svg');
const globe = require('feather-icons/dist/icons/globe.svg');
const minus = require('feather-icons/dist/icons/minus.svg');
const plus = require('feather-icons/dist/icons/plus.svg');
const trash2 = require('feather-icons/dist/icons/trash-2.svg');
const twitter = require('feather-icons/dist/icons/twitter.svg');
const github = require('feather-icons/dist/icons/github.svg');

export const arrowDownIcon = <i dangerouslySetInnerHTML={{ __html: arrowDown }} />;
export const arrowUpIcon = <i dangerouslySetInnerHTML={{ __html: arrowUp }} />;
export const globeIcon = <i dangerouslySetInnerHTML={{ __html: globe }} />;
export const collapseIcon = <i dangerouslySetInnerHTML={{ __html: minus }} />;
export const expandIcon = <i dangerouslySetInnerHTML={{ __html: plus }} />;
export const removeIcon = <i dangerouslySetInnerHTML={{ __html: trash2 }} />;
export const twitterIcon = <i dangerouslySetInnerHTML={{ __html: twitter }} />;
export const githubIcon = <i dangerouslySetInnerHTML={{ __html: github }} />;
