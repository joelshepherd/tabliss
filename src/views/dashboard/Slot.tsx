import React from "react";
import { getConfig } from "../../plugins";
import { WidgetState, WidgetPosition } from "../../state";
import Plugin from "../shared/Plugin";
import "./Slot.sass";
import Widget from "./Widget";

type Props = {
  position: WidgetPosition;
  widgets: WidgetState[];
};

const Slot: React.FC<Props> = ({ position, widgets }) => (
  <div className={`Slot ${position}`}>
    {widgets.map(({ display, id, key }) => (
      <Widget key={id} {...display}>
        <Plugin id={id} component={getConfig(key).dashboardComponent} />
      </Widget>
    ))}
  </div>
);

export default Slot;
