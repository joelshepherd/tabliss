import React from "react";
import { API } from "../../types";
import { Data, defaultData } from "./data";
import Input from "./Input";

export const Notes: React.FC<API<Data>> = ({ data = defaultData, setData }) => {
  return (
    <div className="Notes">
      <Input
        value={data.notes[0].contents}
        onChange={(contents) => setData({ notes: [{ contents }] })}
      />
    </div>
  );
};
