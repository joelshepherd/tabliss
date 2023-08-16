import { FC, useEffect } from "react";

import { Props, defaultData } from "./types";
import React from "react";

const Js: FC<Props> = ({ data = defaultData }) => {
  useEffect(() => {
    return () => {
      <p>???</p>
    };
  });

  return null;
};

export default Js;
