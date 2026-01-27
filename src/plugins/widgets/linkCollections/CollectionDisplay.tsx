import React, { FC, useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { defineMessages, useIntl } from "react-intl";

import { Icon } from "../../../views/shared";
import { LinkCollection } from "./types";
import { isValidUrl } from "./utils";

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
    id: "plugins.linkCollections.shortcutHint",
    description: "Hover hint text for collections with a keyboard shortcut",
    defaultMessage: "Press {number} or click to visit",
  },
  standardHint: {
    id: "plugins.linkCollections.standardHint",
    description: "Hover hint text for collections without a keyboard shortcut",
    defaultMessage: "Click to visit",
  },
  contextMenuHint: {
    id: "plugins.linkCollections.contextMenuHint",
    description: "Hover hint text for collections with sublinks",
    defaultMessage: "Right-click for more options",
  },
});

type Props = LinkCollection & { number: number; linkOpenStyle: boolean };

const CollectionDisplay: FC<Props> = ({
  icon,
  name,
  number,
  url,
  sublinks,
  linkOpenStyle,
}) => {
  const intl = useIntl();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const title = useMemo(() => {
    const baseTitle =
      number < 10
        ? intl.formatMessage(messages.shortcutHint, { number })
        : intl.formatMessage(messages.standardHint);

    return sublinks.length > 0
      ? `${baseTitle} - ${intl.formatMessage(messages.contextMenuHint)}`
      : baseTitle;
  }, [intl, number, sublinks.length]);

  const domain = useMemo(() => (url ? getDomain(url) : null), [url]);

  const hasSublinks = sublinks.length > 0;

  const openContextMenu = (clientX: number, clientY: number) => {
    console.log("Opening context menu at:", clientX, clientY);
    console.log("Viewport size:", window.innerWidth, window.innerHeight);

    // Use exact cursor position for now (no adjustment)
    setContextMenuPosition({ x: clientX, y: clientY });
    setIsContextMenuOpen(true);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    if (hasSublinks) {
      event.preventDefault();
      openContextMenu(event.clientX, event.clientY);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    if (!url || !isValidUrl(url)) {
      event.preventDefault();
      if (hasSublinks) {
        // If no main URL or invalid URL, show context menu on left click
        openContextMenu(event.clientX, event.clientY);
      }
    }
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  // Close context menu when clicking outside
  useEffect(() => {
    if (!isContextMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isContextMenuOpen]);

  const safeUrl = url && isValidUrl(url) ? url : "#";

  return (
    <>
      <a
        href={safeUrl}
        rel="noopener noreferrer"
        target={linkOpenStyle ? "_blank" : "_self"}
        title={title}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      >
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
        <span className="LinkCollectionText">
          {name}
          {!name && !icon && url && displayUrl(url)}
        </span>
        {hasSublinks && <span className="chevron"> ▼</span>}
      </a>

      {isContextMenuOpen &&
        hasSublinks &&
        createPortal(
          <div
            ref={menuRef}
            className="LinkCollectionContextMenu"
            style={{
              position: "fixed",
              top: `${contextMenuPosition.y}px`,
              left: `${contextMenuPosition.x}px`,
            }}
          >
            {sublinks.map((sublink) => {
              const sublinkDomain = getDomain(sublink.url);
              const safeSublinkUrl =
                sublink.url && isValidUrl(sublink.url) ? sublink.url : "#";
              return (
                <a
                  key={sublink.id}
                  href={safeSublinkUrl}
                  rel="noopener noreferrer"
                  target={linkOpenStyle ? "_blank" : "_self"}
                  onClick={closeContextMenu}
                >
                  {sublink.icon === "_favicon" ? (
                    sublinkDomain ? (
                      <i>
                        <img
                          alt={sublinkDomain}
                          src={`https://icons.duckduckgo.com/ip3/${sublinkDomain}.ico`}
                        />
                      </i>
                    ) : null
                  ) : sublink.icon ? (
                    <Icon name={sublink.icon} />
                  ) : null}
                  {sublink.icon && sublink.name && " "}
                  <span>{sublink.name}</span>
                </a>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
};

export default CollectionDisplay;
