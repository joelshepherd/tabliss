import React, { FC, useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";

import { Icon } from "../../../views/shared";
import { Link } from "./types";

const displayUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch (e) {
    return url;
  }
};

const getDomain = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch (e) {
    return null;
  }
};

const messages = defineMessages({
  shortcutHint: {
    id: "plugins.links.shortcutHint",
    description: "Hover hint text for links with a keyboard shortcut",
    defaultMessage: "Press {number} or click to visit",
  },
  standardHint: {
    id: "plugins.links.standardHint",
    description: "Hover hint text for links without a keyboard shortcut",
    defaultMessage: "Click to visit",
  },
});

type Props = Link & { number: number; linkOpenStyle: boolean; linkNumbers: boolean };

const Display: FC<Props> = ({ icon, name, number, url, linkOpenStyle, linkNumbers }) => {
  const intl = useIntl();

  const title = useMemo(
    () =>
      number < 10
        ? intl.formatMessage(messages.shortcutHint, { number })
        : intl.formatMessage(messages.standardHint),
    [intl, number],
  );

  const domain = useMemo(() => getDomain(url), [url]);

  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target={linkOpenStyle ? "_blank" : "_self"}
      title={title}
    >
      {
        linkNumbers
          ? <span className="LinkNumber">{number} </span>
          : null
      }
      {icon === "_favicon" ? (
        domain ? (
          <i>
            <img
              alt={domain}
              src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
            />
          </i>
        ) : null
      ) : icon ? (
        <Icon name={icon} />
      ) : null}
      {icon && name && " "}
      <span className="LinkText">
        {name}
        {!name && !icon && displayUrl(url)}
      </span>
    </a>
  );
};

export default Display;
