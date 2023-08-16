import React, { FC, useState } from "react";

import { Props, defaultData } from "./types";

const JsSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [input, setInput] = useState(data.input);
  const handleSave = () => setData({ input });

  return (
    <div className="JsSettings">
      <label>
        JavaScript Snippet
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </label>

      <button onClick={handleSave}>Apply</button>

      <p className="info">
        Warning: this functionality is intended for advanced users. Custom
        scripts may break at any time. The snippet will run once after the
        dashboard has loaded. Be careful of persisting event listeners when
        editing the snippet.
      </p>

      <p className="info">
        Additionally: you should not export a config with custom JS and use it in
        the browser store/extension version. Doing so will break your
        configuration and prevent Tab Nine from working. Please see{" "}
        <a href="https://github.com/the-wright-jamie/tab-nine/issues/50">
          this issue
        </a>{" "}
        on GitHub
      </p>
    </div>
  );
};

export default JsSettings;
