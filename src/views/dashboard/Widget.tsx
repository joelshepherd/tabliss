import React from "react";
import { WidgetDisplay } from "../../db/state";

const Widget: React.FC<React.PropsWithChildren<WidgetDisplay>> = ({
  children,
  colour,
  fontFamily,
  fontSize = 24,
  fontWeight,
}) => (
  <div
    className={`Widget ${fontWeight ? "weight-override" : ""}`}
    style={{
      color: colour,
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
      transform: `scale(${fontSize / 100})`
    }}
  >
    {children}
  </div>
);

export default Widget;
