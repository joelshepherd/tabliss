import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Props, defaultData } from "./types";

const CssSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <label>
    <FormattedMessage
          id="plugins.css.cssSnippet"
          defaultMessage="CSS Snippet"
          description="CSS Snippet title"
        />
      <textarea
        rows={3}
        style={{ fontFamily: "monospace" }}
        value={data.input}
        onChange={(event) => setData({ input: event.target.value })}
      />
    </label>

    <p className="info">
    <FormattedMessage
          id="plugins.css.Warning"
          defaultMessage="Warning: this functionality is intended for advanced users. Custom styles
          may break at any time."
          description="Warning CSS title"
        />
      
    </p>
  </div>
);

export default CssSettings;
