import React, { FC, memo } from "react";

import { useSelector } from "../../store";
import Background from "./Background";
import Overlay from "./Overlay";
import Widgets from "./Widgets";
import "./Dashboard.sass";

const Dashboard: FC = () => {
  const background = useSelector((state) =>
    state.data.backgrounds.find((plugin) => plugin.active),
  );

  const theme =
    background && background.display.luminosity > 0 ? "light" : "dark";

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default memo(Dashboard);
