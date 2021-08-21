import React, { FC } from "react";

import { getConfig } from "../../plugins";
import { WidgetPosition, WidgetState } from "../../store/reducers/types";
import Plugin from "../shared/Plugin";
import Widget from "./Widget";
import "./Slot.sass";

type Props = {
  position: WidgetPosition;
  widgets: WidgetState[];
};

const Slot: FC<Props> = ({ position, widgets }) => (
  <div className={`Slot ${position}`}>
    {widgets.map(({ display, id, key }) => (
      <Widget key={id} {...display}>
        <Plugin id={id} component={getConfig(key).dashboardComponent} />
      </Widget>
    ))}
  </div>
);

export default Slot;
