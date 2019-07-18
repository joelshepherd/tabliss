import React from 'react';
import arrowDown from 'feather-icons/dist/icons/arrow-down.svg';
import arrowUp from 'feather-icons/dist/icons/arrow-up.svg';
import github from 'feather-icons/dist/icons/github.svg';
import globe from 'feather-icons/dist/icons/globe.svg';
import minus from 'feather-icons/dist/icons/minus.svg';
import plus from 'feather-icons/dist/icons/plus.svg';
import trash2 from 'feather-icons/dist/icons/trash-2.svg';
import twitter from 'feather-icons/dist/icons/twitter.svg';
import checked from 'feather-icons/dist/icons/check-circle.svg';
import unchecked from 'feather-icons/dist/icons/circle.svg';

export const arrowDownIcon = (
  <i dangerouslySetInnerHTML={{ __html: arrowDown }} />
);
export const arrowUpIcon = <i dangerouslySetInnerHTML={{ __html: arrowUp }} />;
export const collapseIcon = <i dangerouslySetInnerHTML={{ __html: minus }} />;
export const expandIcon = <i dangerouslySetInnerHTML={{ __html: plus }} />;
export const githubIcon = <i dangerouslySetInnerHTML={{ __html: github }} />;
export const globeIcon = <i dangerouslySetInnerHTML={{ __html: globe }} />;
export const removeIcon = <i dangerouslySetInnerHTML={{ __html: trash2 }} />;

export const twitterIcon = <i dangerouslySetInnerHTML={{ __html: twitter }} />;
export const checkedIcon = <i dangerouslySetInnerHTML={{ __html: checked }} />;
export const uncheckedIcon = (
  <i dangerouslySetInnerHTML={{ __html: unchecked }} />
);
