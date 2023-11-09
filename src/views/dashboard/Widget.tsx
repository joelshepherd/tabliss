import React from "react";
import { WidgetDisplay } from "../../db/state";

const Widget: React.FC<React.PropsWithChildren<WidgetDisplay>> = ({
  children,
  colour,
  fontFamily,
  fontSize = 24,
  fontWeight,
  useAccentColor,
}) => (
  <div
    className={`Widget ${fontWeight ? "weight-override" : ""} ${
      useAccentColor ? "accented" : ""
    }`}
    style={{
      color: useAccentColor ? "" : colour,
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
    }}
  >
    {children}
  </div>
);

export default Widget;
