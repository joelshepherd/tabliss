import React, { FC } from "react";

import { Props, defaultData } from "./types";

const RandomMessage: FC<Props> = ({ data = defaultData }) => (
  <div className="RandomMessage">
    <h3>
      {data.randomMessages[0].split(';')[Math.floor(Math.random() * data.randomMessages[0].split(';').length)]}
    </h3>
  </div>
);

export default RandomMessage;
