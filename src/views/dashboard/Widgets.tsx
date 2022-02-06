import React from "react";
import { useKey, useSelector } from "../../lib/db/react";
import { db, WidgetData, WidgetPosition } from "../../state";
import Slot from "./Slot";
import "./Widgets.sass";

const Widgets: React.FC = () => {
  const [focus] = useKey(db, "focus");
  const widgets = useSelector(db, (get) =>
    get("widgets").flatMap((id) => {
      const data = get(`data/${id}`);
      // TODO: handle missing data, possibly remove id from array
      return data ? [data] : [];
    }),
  );

  const grouped = widgets.reduce<Partial<Record<WidgetPosition, WidgetData>>>(
    (carry, widget) => ({
      ...carry,
      [widget.display.position!]: [
        ...(carry[widget.display.position!] || []),
        { ...widget, id: ids[index] },
      ],
    }),
    {},
  );

  const slots = Object.entries(grouped);

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
