import React from "react";
import { db } from "../../db/state";
import { useValue } from "../../lib/db/react";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const background = useValue(db, "background");
  const theme = (background.display.luminosity ?? 0) > 0 ? "light" : "dark";

  // Set init theme for pre settings load (see `target/<target>/index.html`)
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
