import React from "react";
import { useValue } from "../../lib/db/react";
import { db, WidgetPosition, WidgetState } from "../../state";
import Slot from "./Slot";
import "./Widgets.sass";

const Widgets: React.FC = () => {
  const focus = useValue(db, "focus");
  const widgets = useValue(db, "widgets");

  // TODO: one day we'll have `Array.groupBy` accepted by tc39
  const grouped = widgets.reduce<
    Partial<Record<WidgetPosition, WidgetState[]>>
  >(
    (carry, widget) => ({
      ...carry,
      [widget.display.position]: [
        ...(carry[widget.display.position] ?? []),
        widget,
      ],
    }),
    {},
  );

  const slots = Object.entries(grouped) as [WidgetPosition, WidgetState[]][];

  return (
    <div className="Widgets fullscreen">
      <div className="container">
        {!focus &&
          slots.map(([position, widgets]) => (
            <Slot key={position} position={position} widgets={widgets} />
          ))}
      </div>
    </div>
  );
};

export default Widgets;
