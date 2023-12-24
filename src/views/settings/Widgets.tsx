import React from "react";
import { FormattedMessage } from "react-intl";
import { addWidget, removeWidget, reorderWidget } from "../../db/action";
import { selectWidgets } from "../../db/select";
import { db } from "../../db/state";
import { useSelector } from "../../lib/db/react";
import Widget from "./Widget";
import { widgetConfigs } from "../../plugins/plugins";

const Widgets: React.FC = () => {
  const widgets = useSelector(db, selectWidgets);

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
          <FormattedMessage
          id="add.new.widget"
          defaultMessage="Add a new widget"
          description="Add a new widget title"
        />
            
          </option>
          {widgetConfigs.map((plugin: any) => (
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
            index > 0 ? () => reorderWidget(index, index - 1) : undefined
          }
          onMoveDown={
            index < widgets.length - 1
              ? () => reorderWidget(index, index + 1)
              : undefined
          }
          onRemove={() => removeWidget(widget.id)}
        />
      ))}
    </div>
  );
};

export default Widgets;
