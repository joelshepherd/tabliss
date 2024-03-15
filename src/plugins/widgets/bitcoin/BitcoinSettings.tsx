import React from "react";
import { capitalize } from "../../../utils";
import { defaultData, Data, Props } from "./types";

const colors = ["mempool", "monochrome", "transparent"];

const BitcoinSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="MessageSettings">
    <h5>Color</h5>
    {colors.map((color) => (
      <label key={color}>
        <input
          type="radio"
          checked={data.color === color}
          onChange={() => {
            setData({ ...data, color: color as Data["color"] });
          }}
        />
        {capitalize(color)}
      </label>
    ))}

    <label>
      <br />
      Number of Blocks <br />
      <input
        type="range"
        list="numberOfBlocks-markers"
        min="1"
        max="5"
        step="1"
        value={data.numberOfBlocks}
        onChange={(event) => {
          setData({
            ...data,
            numberOfBlocks: Number(
              event.target.value,
            ) as Data["numberOfBlocks"],
          });
        }}
      />
      <datalist id="numberOfBlocks-markers">
        <option value="1" label="1" />
        <option value="2" label="2" />
        <option value="3" label="3" />
        <option value="4" label="4" />
        <option value="5" label="5" />
      </datalist>
    </label>
  </div>
);

export default BitcoinSettings;
