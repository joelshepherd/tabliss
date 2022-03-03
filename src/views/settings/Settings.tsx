import React from "react";
import { FormattedMessage } from "react-intl";
import { UiContext } from "../../contexts/ui";
import { exportStore, importStore, resetStore } from "../../db/action";
import { useKeyPress } from "../../hooks";
import { Icon } from "../shared";
import Logo from "../shared/Logo";
import Background from "./Background";
import "./Settings.sass";
import System from "./System";
import Widgets from "./Widgets";

const Settings: React.FC = () => {
  const { toggleSettings } = React.useContext(UiContext);
  const { maximizeSettings } = React.useContext(UiContext);
  const { maxsettings } = React.useContext(UiContext);
  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to delete all of your Tabliss settings? This cannot be undone.",
      )
    )
      resetStore();
  };

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

      <div className={`plane ${!maxsettings ? "" : "maximized"}`}>
        <Logo />
        <div className="maximize-button-container">
          <a className="maximize-button" onClick={maximizeSettings}>{maxsettings ? <Icon name="chevrons-left" /> : <Icon name="chevrons-right" />  }</a>
        </div>
        <Background />

        <Widgets />

        <System />

        <p>
          <a onClick={handleImport}>Import</a>,{" "}
          <a onClick={handleExport}>export</a> or{" "}
          <a onClick={handleReset}>reset</a>
        </p>

        <h3>Support Tabliss</h3>
        <p>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=FK7VRWS9A2EW4"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            <Icon name="coffee" /> Donate a coffee 😍
          </a>
          <a
            style={{ marginTop: "0.5em" }}
            href="https://github.com/joelshepherd/tabliss"
            rel="noopener noreferrer"
            target="_blank"
            className="button button--primary"
          >
            <Icon name="github" /> Star on GitHub
          </a>
        </p>
        <p>
          <a href="https://tabliss.io/" target="_blank">
            <Icon name="globe" /> Website
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/tabliss"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="twitter" /> Twitter
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
