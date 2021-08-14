import React, { FC } from "react";
import { Icon } from "../../../views/shared";

import { Props, defaultData, Data } from "./types";

const Gradient: FC<Props> = ({ data = defaultData }) => (
  <div
    className="Gradient fullscreen"
    style={{
      backgroundImage: `${data.type}(${data.angle}deg, ${data.from}, ${data.to})`,
    }}
  />
);

export function createReloader(title: string, iconName: string, delay: number = 3000) {
  const colorReloader: FC<Props> = ({ data = defaultData, setData }) => {
    const reload = () => {
      const newColourFromHex = '#' + Math.ceil(Math.random() * 0xffffff).toString(16).padStart(6, '0');
      const newColourToHex = '#' + Math.ceil(Math.random() * 0xffffff).toString(16).padStart(6, '0');
      const newData: Data = {
        angle: Math.ceil(Math.random() * 360),
        from: newColourFromHex,
        to: newColourToHex,
        type: "linear-gradient",
      };
      setData(newData)
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

export { Gradient };
