import React, { FC } from "react";

import { Props, defaultData } from "./types";

type Preset = {
  name: string;
  from: string;
  to: string;
  angle: number;
};

const presets: Preset[] = [
  { name: "Sunset", from: "#ff7e5f", to: "#feb47b", angle: 135 },
  { name: "Twilight", from: "#1e3c72", to: "#6a3093", angle: 120 },
  { name: "Mint", from: "#00c9ff", to: "#92fe9d", angle: 110 },
  { name: "Slate", from: "#0f2027", to: "#2c5364", angle: 160 },
  { name: "Sky", from: "#4fb1f3", to: "#9b59b6", angle: 135 },
  { name: "Default", from: "#3498db", to: "#9b59b6", angle: 0 },
  { name: "Peach", from: "#ffecd2", to: "#fcb69f", angle: 135 },
  { name: "Lavender", from: "#a18cd1", to: "#fbc2eb", angle: 120 },
  { name: "Forest", from: "#134e5e", to: "#71b280", angle: 120 },
  { name: "Coral", from: "#ff512f", to: "#dd2476", angle: 135 },
  { name: "Ice", from: "#83a4d4", to: "#b6fbff", angle: 135 },
  { name: "Amber", from: "#f7971e", to: "#ffd200", angle: 120 },
  { name: "Night", from: "#0f0c29", to: "#302b63", angle: 160 },
  { name: "Plum", from: "#2f0743", to: "#41295a", angle: 150 },
  { name: "Aurora", from: "#00f260", to: "#0575e6", angle: 120 },
];

const GradientSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const presetIndex = presets.findIndex(
    (preset) =>
      preset.from === data.from &&
      preset.to === data.to &&
      preset.angle === data.angle,
  );

  return (
    <div className="GradientSettings">
      <label>
        Preset
        <select
          value={presetIndex === -1 ? "" : String(presetIndex)}
          onChange={(event) => {
            const value = event.target.value;
            if (!value) {
              return;
            }
            const preset = presets[Number(value)];
            if (preset) {
              setData({
                ...data,
                from: preset.from,
                to: preset.to,
                angle: preset.angle,
              });
            }
          }}
        >
          <option value="">Custom</option>
          {presets.map((preset, index) => (
            <option key={preset.name} value={index}>
              {preset.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        From Colour
        <input
          type="color"
          value={data.from}
          onChange={(event) => setData({ ...data, from: event.target.value })}
        />
      </label>

      <label>
        To Colour
        <input
          type="color"
          value={data.to}
          onChange={(event) => setData({ ...data, to: event.target.value })}
        />
      </label>

      <label>
        Angle (0-360)
        <input
          type="number"
          value={data.angle}
          onChange={(event) =>
            setData({ ...data, angle: Number(event.target.value) })
          }
        />
      </label>
    </div>
  );
};

export default GradientSettings;
