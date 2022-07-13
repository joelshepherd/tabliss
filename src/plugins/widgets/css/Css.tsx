import React from "react";

import { Props, defaultData } from "./types";

const Css: React.FC<Props> = ({ data = defaultData }) => {
  React.useLayoutEffect(() => {
    const style = document.createElement("style");

    style.id = "CustomCss";
    style.type = "text/css";
    style.appendChild(document.createTextNode(data.input || ""));

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [data.input]);

  return null;
};

export default Css;
