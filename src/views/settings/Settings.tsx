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
        "Are you sure you want to delete all of your Tab Nine settings? This cannot be undone.",
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
    a.download = "tab-nine.json";
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
          <a onClick={handleImport}>Import</a>,{" "}
          <a onClick={handleExport}>export</a> or{" "}
          <a onClick={handleReset}>reset</a> your settings
        </p>

        <div style={{ textAlign: "center" }}>
          <p>
            <a
              href="https://github.com/the-wright-jamie/tab-nine/wiki"
              target="_blank"
            >
              <Icon name="book" /> Wiki
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="https://github.com/the-wright-jamie/tab-nine/wiki/tips"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="thumbs-up" /> Tips
            </a>
          </p>
        </div>

        <div style={{ textAlign: "center" }} className="Widget">
          <h4>Support Tab Nine</h4>
          <p>
            <a
              href="https://ko-fi.com/thewrightjamie"
              target="_blank"
              rel="noopener noreferrer"
              className="donate"
              title="I do love coffee"
            >
              <Icon name="coffee" /> Tip me a coffee
            </a>
          </p>
          <p>
            <a href="https://tab-nine.xsfs.xyz/" target="_blank">
              <Icon name="globe" /> Website
            </a>
            &nbsp;&nbsp;
            <a
              href="https://github.com/the-wright-jamie/tab-nine"
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
