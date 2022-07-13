import React from "react";
import { defineMessages } from "react-intl";
import { ErrorContext } from "../../contexts/error";
import { UiContext } from "../../contexts/ui";
import { toggleFocus } from "../../db/action";
import { db } from "../../db/state";
import { useFormatMessages, useFullscreen, useKeyPress } from "../../hooks";
import { useValue } from "../../lib/db/react";
import { Icon } from "../shared";
import "./Overlay.sass";

const messages = defineMessages({
  settingsHint: {
    id: "dashboard.settingsHint",
    defaultMessage: "Customise Tabliss",
    description: "Hover hint text for the settings icon",
  },
  focusHint: {
    id: "dashboard.focusHint",
    defaultMessage: "Toggle widgets",
    description: "Hover hint text for the widgets toggle",
  },
  fullscreenHint: {
    id: "dashboard.fullscreenHint",
    defaultMessage: "Toggle fullscreen",
    description: "Hover hint text for the fullscreen toggle",
  },
  loadingHint: {
    id: "dashboard.loadingHint",
    defaultMessage: "Loading new content",
    description:
      "Hover hint text for the loading indicator icon (the lightning bolt)",
  },
  errorHint: {
    id: "dashboard.errorHint",
    defaultMessage: "Show errors",
    description: "Hover hint text for the error indicator icon",
  },
});

const Overlay: React.FC = () => {
  const translated = useFormatMessages(messages);
  const focus = useValue(db, "focus");
  const { errors } = React.useContext(ErrorContext);
  const { pending, toggleErrors, toggleSettings } = React.useContext(UiContext);

  useKeyPress(toggleFocus, ["w"]);
  useKeyPress(toggleSettings, ["s"]);

  // Hooks inside a condition? Works because the condition always resolves the same
  const [isFullscreen, handleToggleFullscreen] = useFullscreen();
  if (handleToggleFullscreen) useKeyPress(handleToggleFullscreen, ["f"]);

  return (
    <div className="Overlay">
      <a onClick={toggleSettings} title={`${translated.settingsHint} (S)`}>
        <Icon name="settings" />
      </a>

      {errors.length > 0 ? (
        <a onClick={toggleErrors} title={translated.errorHint}>
          <Icon name="alert-triangle" />
        </a>
      ) : null}

      {pending > 0 ? (
        <span title={translated.loadingHint}>
          <Icon name="zap" />
        </span>
      ) : null}

      <a
        className={focus ? "" : "on-hover"}
        onClick={toggleFocus}
        title={`${translated.focusHint} (W)`}
      >
        <Icon name={focus ? "eye-off" : "eye"} />
      </a>

      {handleToggleFullscreen ? (
        <a
          className="on-hover"
          onClick={handleToggleFullscreen}
          title={`${translated.fullscreenHint} (F)`}
        >
          <Icon name={isFullscreen ? "minimize-2" : "maximize-2"} />
        </a>
      ) : null}
    </div>
  );
};

export default Overlay;
