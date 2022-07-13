import React, { FC } from "react";

import { Props, defaultData } from "./types";

const Gradient: FC<Props> = ({ data = defaultData }) => (
  <div
    className="Gradient fullscreen"
    style={{
      backgroundImage: `${data.type}(${data.angle}deg, ${data.from}, ${data.to})`,
    }}
  />
);

export default Gradient;
