import React, { FC } from "react";

import { Props, defaultData } from "./types";

const Colour: FC<Props> = ({ data = defaultData }) => (
  <div className="Colour fullscreen" style={{ backgroundColor: data.colour }} />
);

export default Colour;
