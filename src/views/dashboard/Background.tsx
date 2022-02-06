import React, { FC } from "react";
import { useKey } from "../../lib/db/react";
import { getConfig } from "../../plugins";
import { db } from "../../state";
import Plugin from "../shared/Plugin";

const Background: FC = () => {
  const [id] = useKey(db, "background");
  const [background] = useKey(db, `data/${id}`);

  if (!id || !background) return null;

  const { dashboardComponent } = getConfig(background.key);

  return (
    <div className="Background">
      <Plugin id={id} component={dashboardComponent} />
    </div>
  );
};

export default Background;
