import React from "react";
import { WidgetDisplay as IWidgetDisplay } from "../../state";
import PositionInput from "./PositionInput";
import "./WidgetDisplay.css";

type Props = {
  display: IWidgetDisplay;
  onChange: (display: Partial<IWidgetDisplay>) => void;
};

const WidgetDisplay: React.FC<Props> = ({ display, onChange }) => {
  return (
    <div className="WidgetDisplay">
      <PositionInput
        value={display.position}
        onChange={(position) => onChange({ position })}
      />

      <label>
        Size
        <br />
        <input
          type="range"
          value={display.fontSize}
          min="2"
          max="100"
          step="2"
          onChange={(event) =>
            onChange({ fontSize: Number(event.target.value) })
          }
        />
      </label>
    </div>
  );
};

export default WidgetDisplay;
