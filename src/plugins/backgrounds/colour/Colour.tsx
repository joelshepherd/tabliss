import React, { FC } from "react";
import { Icon } from "../../../views/shared";

import { Props, defaultData } from "./types";

const Colour: FC<Props> = ({ data = defaultData }) => (
  <div className="Colour fullscreen" style={{ backgroundColor: data.colour }} />
);

export function createReloader(title: string, iconName: string, delay: number = 3000) {
  const colorReloader: FC<Props> = ({ setData }) => {
    const reload = () => {
      const newColourHex = Math.ceil(Math.random() * 0xffffff).toString(16).padStart(6, '0');
      setData({ colour: `#${newColourHex}` })
    };

    return (
      <a
        className="on-hover"
        onClick={reload}
        title={title}
      >
        <Icon name={iconName} />
      </a>
    );
  };

  return colorReloader;
}

export { Colour };
