import React, { FC } from "react";

import { useKeyPress, useToggle } from "../../../hooks";
import { Icon } from "../../../views/shared";
import Display from "./Display";
import { Props, defaultData } from "./types";
import "./Links.sass";

const Links: FC<Props> = ({ data = defaultData }) => {
  const [visible, toggleVisible] = useToggle();

  useKeyPress(
    ({ key }) => {
      const index = Number(key) - 1;
      if (data.links[index]) {
        data.linkOpenStyle
          ? window.open(data.links[index].url, "_blank")
          : window.location.assign(data.links[index].url);
      }
    },
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  );

  return (
    <div
      className="Links"
      style={{
        gridTemplateColumns:
          data.visible || visible ? "1fr ".repeat(data.columns) : "1fr",
        textAlign: data.columns > 1 ? "left" : "inherit",
      }}
    >
      {data.visible || visible ? (
        data.links.map((link, index) => (
          <Display
            key={index}
            number={index + 1}
            linkOpenStyle={data.linkOpenStyle}
            {...link}
          />
        ))
      ) : (
        <a onClick={toggleVisible} title="Show quick links">
          <Icon name="link-2" />
        </a>
      )}
    </div>
  );
};

export default Links;
