import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { Link as LinkProps } from './interfaces';

interface Props extends LinkProps {
  number: number;
}

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

const LinkDisplay: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    let link = [];

    if (props.faIcon) {
        link.push(<i className={props.faIcon} />);
    }

    if (props.name) {
        if (link.length === 1) {
            link.push(' ');
        }

        link.push(props.name);
    }

    if (link.length === 0) {
        link.push(displayUrl(props.url));
    }

    return (
        <a
            href={props.url}
            rel="noopener noreferrer"
            title={props.number < 10
                ? props.intl.formatMessage(messages.shortcutHint, { number: props.number })
                : props.intl.formatMessage(messages.standardHint)
            }
        >
            {link}
        </a>
    );
};

export default injectIntl(LinkDisplay);
