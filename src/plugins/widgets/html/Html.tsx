import React, { FC } from "react";

import { Props, defaultData } from "./types";

const Html: FC<Props> = ({ data = defaultData }) => {
  return (
    <div className="Html" dangerouslySetInnerHTML={{ __html: data.input }}></div>
  );
};

export default Html;
