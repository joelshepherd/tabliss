import React from "react";
import { useValue } from "../../lib/db/react";
import { getConfig } from "../../plugins";
import { db } from "../../state";
import Plugin from "../shared/Plugin";

const Background: React.FC = () => {
  const background = useValue(db, "background");

  const { dashboardComponent } = getConfig(background.key);

  return (
    <div className="Background">
      <Plugin id={background.id} component={dashboardComponent} />
    </div>
  );
};

export default Background;
