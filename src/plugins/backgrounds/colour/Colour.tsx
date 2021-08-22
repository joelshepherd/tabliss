import React, { FC } from "react";
import { Icon } from "../../../views/shared";
import { useFormatMessages } from "../../../hooks";
import { messages, reloadIconName } from "../common";

import { Props, defaultData } from "./types";

const Colour: FC<Props> = ({ data = defaultData }) => (
  <div className="Colour fullscreen" style={{ backgroundColor: data.colour }} />
);

const ColourReloader: FC<Props> = ({ setData }) => {
  const reload = () => {
    const newColourHex = Math.ceil(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    setData({ colour: `#${newColourHex}` })
  };
  const translated = useFormatMessages(messages);

  return (
    <a
      className="on-hover"
      onClick={reload}
      title={translated.reloadImgHint}
    >
      <Icon name={reloadIconName} />
    </a>
  );
};


export { Colour, ColourReloader };
