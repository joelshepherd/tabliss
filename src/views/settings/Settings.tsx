import React from "react";
import { FormattedMessage } from "react-intl";
import { UiContext } from "../../contexts/ui";
import { exportStore, importStore, resetStore } from "../../db/action";
import { useKeyPress } from "../../hooks";
import { Icon } from "../shared";
import Logo from "../shared/Logo";
import Background from "./Background";
import Persist from "./Persist";
import "./Settings.sass";
import System from "./System";
import Widgets from "./Widgets";

const Settings: React.FC = () => {
  const { toggleSettings } = React.useContext(UiContext);

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
            } catch (error) {
              alert(
                `Invalid import file: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`,
              );
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

        <p style={{ marginBottom: "2rem" }}>
          <a onClick={handleImport}><FormattedMessage
          id="settings.import"
          defaultMessage="Import"
          description="Import title"
        /></a>,{" "}
          <a onClick={handleExport}><FormattedMessage
          id="settings.export"
          defaultMessage="export"
          description="Export title"
        /></a> <FormattedMessage
      id="settings.or"
      defaultMessage="or"
      description="your settings title"
    /> {" "}
          <a onClick={handleReset}><FormattedMessage
          id="settings.reset"
          defaultMessage="reset"
          description="Reset title"
        /></a> <FormattedMessage
        id="settings.description"
        defaultMessage="your settings"
        description="your settings title"
      />
        </p>

        <Persist />

        <div style={{ textAlign: "center" }} className="Widget">
          <h4><FormattedMessage
          id="support"
          defaultMessage="Support Tabliss"
          description="Support title"
        /></h4>
          <p>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=FK7VRWS9A2EW4"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
              title="I do love coffee"
            >
              <Icon name="coffee" /> <FormattedMessage
          id="donateCoffee"
          defaultMessage="Donate a coffee"
          description="Donate a coffee title"
        /> 😍
            </a>
          </p>
          <p>
            <a href="https://tabliss.io/" target="_blank">
              <Icon name="globe" /> <FormattedMessage
          id="website"
          defaultMessage="Website"
          description="Website title"
        />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/tabliss"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="twitter" /> Twitter
            </a>
            &nbsp;&nbsp;
            <a
              href="https://github.com/joelshepherd/tabliss"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="github" /> GitHub
            </a>
          </p>
        </div>

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
