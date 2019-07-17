import featherIcons from 'feather-icons';
import React, { FC } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';

import { Link } from './types';

const displayUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
  } catch (e) {
    return url;
  }
};

const messages = defineMessages({
  shortcutHint: {
    id: 'plugins.links.shortcutHint',
    description: 'Hover hint text for links with a keyboard shortcut',
    defaultMessage: 'Press {number} or click to visit',
  },
  standardHint: {
    id: 'plugins.links.standardHint',
    description: 'Hover hint text for links without a keyboard shortcut',
    defaultMessage: 'Click to visit',
  },
});

type OwnProps = Link & { number: number };
type Props = OwnProps & InjectedIntlProps;

const Display: FC<Props> = ({ icon, intl, name, number, url }) => (
  <a
    href={url}
    rel="noopener noreferrer"
    title={
      number < 10
        ? intl.formatMessage(messages.shortcutHint, {
            number: number,
          })
        : intl.formatMessage(messages.standardHint)
    }
  >
    {icon && featherIcons.icons[icon] && (
      <i
        dangerouslySetInnerHTML={{
          __html: featherIcons.icons[icon].toSvg(),
        }}
      />
    )}
    {name}
    {!name && !icon && displayUrl(url)}
  </a>
);

export default injectIntl(Display);
