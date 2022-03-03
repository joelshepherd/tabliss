import React from "react";
import { WidgetPosition } from "../../db/state";
import { Icon, IconButton } from "../shared";
import "./PositionInput.css";

const positions = [
  {
    value: "topLeft",
    icon: "arrow-up-left",
  },
  {
    value: "topCentre",
    icon: "arrow-up",
  },
  {
    value: "topRight",
    icon: "arrow-up-right",
  },
  {
    value: "middleLeft",
    icon: "arrow-left",
  },
  {
    value: "middleCentre",
    icon: "move",
  },
  {
    value: "middleRight",
    icon: "arrow-right",
  },
  {
    value: "bottomLeft",
    icon: "arrow-down-left",
  },
  {
    value: "bottomCentre",
    icon: "arrow-down",
  },
  {
    value: "bottomRight",
    icon: "arrow-down-right",
  },
] as const;

type Props = {
  value: WidgetPosition;
  onChange: (value: WidgetPosition) => void;
};

const PositionInput: React.FC<Props> = ({ value, onChange }) => (
  <div className="PositionInput cell-7">
    <label>Position</label>

    <div className="grid">
      {positions.map((position) => (
        <IconButton
          key={position.value}
          onClick={() => onChange(position.value)}
          primary={value === position.value}
        >
          <Icon name={position.icon} />
        </IconButton>
      ))}
    </div>
  </div>
);

export default PositionInput;
