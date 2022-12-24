import React, { FC, useState } from "react";

import { Props, defaultData } from "./types";

const HtmlSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [input, setInput] = useState(data.input);
  const handleSave = () => setData({ input });

  return (
    <div className="HtmlSettings">
      <label>
        HTML Snippet
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </label>

      <p className="info">
        Warning: This functionality is intended for advanced users.
        {BUILD_TARGET !== "web" && (
          <>
            &nbsp;JavaScript will not be executed.
          </>
        )}
      </p>

      <button onClick={handleSave}>Apply</button>
    </div>
  );
};

export default HtmlSettings;
