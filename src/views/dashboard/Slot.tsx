import React from "react";
import { WidgetPosition, WidgetState } from "../../db/state";
import { getConfig } from "../../plugins";
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
