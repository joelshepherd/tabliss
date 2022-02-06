import React from "react";
import { useSelector } from "../../lib/db/react";
import { db } from "../../state";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const background = useSelector(db, (get) => get(`data/${get("background")}`));

  const theme =
    background && (background.display.luminosity ?? 0) > 0 ? "light" : "dark";

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
