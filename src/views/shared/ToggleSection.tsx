import React from "react";
import { useToggle } from "../../hooks";
import { defineMessages, useIntl } from "react-intl";

type Props = {
  children: React.ReactNode;
  name: string;
};

const messages = defineMessages({
  open: {
    id: "plugins.section.open",
    defaultMessage: "Open",
    description: "Text for opening the section",
  },
  close: {
    id: "plugins.section.close",
    defaultMessage: "Close",
    description: "Text for closing the section",
  },
});

const ToggleSection: React.FC<Props> = ({ name, children }) => {
  const [isOpen, toggleOpen] = useToggle();
  const intl = useIntl();

  return (
    <>
      <p>
        <a onClick={toggleOpen}>
          {isOpen ? intl.formatMessage(messages.close) : intl.formatMessage(messages.open)} {name}
        </a>
      </p>

      {isOpen && children}
    </>
  );
};

export default ToggleSection;