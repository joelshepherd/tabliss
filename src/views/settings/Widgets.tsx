import React from "react";
import { FormattedMessage } from "react-intl";
import { addWidget, removeWidget, reorderWidget } from "../../actions";
import { useValue } from "../../lib/db/react";
import { widgetConfigs } from "../../plugins";
import { db } from "../../state";
import Widget from "./Widget";

const Widgets: React.FC = () => {
  const widgets = useValue(db, "widgets");

  return (
    <div>
      <h2>
        <FormattedMessage
          id="widgets"
          defaultMessage="Widgets"
          description="Widgets title"
        />
      </h2>

      <label>
        <select
          value=""
          onChange={(event) => addWidget(event.target.value)}
          className="primary"
        >
          <option disabled value="">
            Add a new widget
          </option>
          {widgetConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </select>
      </label>

      {widgets.map((widget, index) => (
        <Widget
          key={widget.id}
          plugin={widget}
          onMoveUp={
            index > 0 ? () => reorderWidget(widget.id, index - 1) : undefined
          }
          onMoveDown={
            index < widgets.length - 1
              ? () => reorderWidget(widget.id, index + 1)
              : undefined
          }
          onRemove={() => removeWidget(widget.id)}
        />
      ))}
    </div>
  );
};

export default Widgets;
