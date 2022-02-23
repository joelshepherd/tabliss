import React from "react";
import { FormattedMessage } from "react-intl";
import { UiContext } from "../../contexts/ui";
import { exportStore, importStore, resetStore } from "../../db/action";
import { useKeyPress } from "../../hooks";
import { Icon } from "../shared";
import Logo from "../shared/Logo";
import Background from "./Background";
import Feedback from "./Feedback";
import "./Settings.sass";
import System from "./System";
import Widgets from "./Widgets";

const Settings: React.FC = () => {
  const { toggleSettings } = React.useContext(UiContext);

  const handleReset = () => resetStore();

  const handleExport = () => {
    const json = exportStore();
    const url = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    );

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "tabliss.json";
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.style.display = "none";
    input.type = "file";
    input.addEventListener("change", function () {
      if (this.files) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          if (event.target && event.target.result) {
            try {
              const state = JSON.parse(event.target.result as string);
              importStore(state);
            } catch {
              alert("Invalid import file");
            }
          }
        });
        reader.readAsText(file);
      }
      document.body.removeChild(input);
    });
    input.click();
  };

  useKeyPress(toggleSettings, ["Escape"]);

  return (
    <div className="Settings">
      <a onClick={toggleSettings} className="fullscreen" />

      <div className="plane">
        <Logo />

        <Background />

        <Widgets />

        <System />

        <Feedback />

        <p>
          <a
            href="https://www.paypal.me/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            Love Tabliss? Donate 😍
          </a>
        </p>

        <p>
          <a onClick={handleImport}>Import</a>,{" "}
          <a onClick={handleExport}>export</a> or{" "}
          <a onClick={handleReset}>reset</a> settings
        </p>

        <p>
          <a href="https://tabliss.io/" target="_blank">
            <Icon name="globe" />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="twitter" />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://github.com/joelshepherd/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" />
          </a>
        </p>

        <FormattedMessage
          id="settings.translationCredits"
          description="Give yourself some credit :)"
          defaultMessage=" "
          tagName="p"
        />
      </div>
    </div>
  );
};

export default React.memo(Settings);
