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
import GitHubButton from "react-github-btn";

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
              href="https://github.com/the-wright-jamie/tab-nine/wiki/Tips-&-Tricks"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="thumbs-up" /> Tips & Tricks
            </a>
          </p>
        </div>
        <Background />
        <Widgets />
        <System />
        <p style={{ marginBottom: "2rem" }}>
          <a onClick={handleImport}>Import</a>,{" "}
          <a onClick={handleExport}>export</a> or{" "}
          <a onClick={handleReset}>reset</a> your settings
        </p>
        <div className="Widget">
          <h4 style={{ textAlign: "center" }}>Support Tab Nine</h4>
          <p>
            Would you like to help with development? Visit the&nbsp;
            <a
              href="https://github.com/the-wright-jamie/tab-nine"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="github" /> GitHub
            </a>
            &nbsp;page and open a pull request!
          </p>
          <p>
            If you don't want to submit code to the project, a watch and a star
            would super awesome.
          </p>
          <p style={{ textAlign: "center" }}>
            <GitHubButton
              href="https://github.com/the-wright-jamie/tab-nine/subscription"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-icon="octicon-eye"
              data-size="large"
              data-show-count="true"
              aria-label="Watch the-wright-jamie/tab-nine on GitHub"
            >
              Watch
            </GitHubButton>{" "}
            <GitHubButton
              href="https://github.com/the-wright-jamie/tab-nine"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star the-wright-jamie/tab-nine on GitHub"
            >
              Star
            </GitHubButton>
          </p>
          <p>
            Alternatively, to support this and{" "}
            <a href="https://github.com/the-wright-jamie?tab=repositories">
              my other open-source projects
            </a>{" "}
            you can
          </p>
          <p style={{ textAlign: "center" }}>
            <a
              href="https://ko-fi.com/thewrightjamie"
              target="_blank"
              rel="noopener noreferrer"
              className="donate"
              title="I do love coffee"
            >
              <Icon name="coffee" />
              &nbsp;&nbsp;Tip me a coffee
            </a>
          </p>
          <p style={{ textAlign: "center" }}>
            <b>Any support is greatly appreciated</b>
          </p>
        </div>
        <FormattedMessage
          id="settings.translationCredits"
          description="Give yourself some credit :)"
          defaultMessage=" "
          tagName="p"
        />
        <p>
          <b>
            <u>About Tab Nine</u>
          </b>
        </p>
        <p>
          Tab Nine is a <b>fork</b> of{" "}
          <a href="https://github.com/joelshepherd/tabliss">Tabliss</a> by{" "}
          <a href="https://github.com/joelshepherd/">@joelshepherd</a>,
          maintained by{" "}
          <a href="https://github.com/the-wright-jamie">@the-wright-jamie</a>.
        </p>{" "}
        <p>
          Credit for the original idea and concept for this extension, as well
          as a lot of the groundwork, goes to Tabliss.
        </p>
        <p>
          As a fork, Tab Nine is in a sense a 'distribution' of Tabliss, with
          upstream fixes and some{" "}
          <a href="https://github.com/the-wright-jamie/tab-nine#improvements-over-tabliss">
            unique features
          </a>
          .
        </p>
        <p style={{ textAlign: "center" }}>
          Tab Nine <code>v1.1.0</code>
        </p>
      </div>
    </div>
  );
};

export default React.memo(Settings);
