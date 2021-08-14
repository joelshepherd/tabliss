import React, { FC } from "react";
import { defineMessages } from "react-intl";
import { useDispatch } from "react-redux";

import { useFormatMessages, useFullscreen, useKeyPress } from "../../hooks";
import Plugin from "../shared/Plugin";
import { useSelector } from "../../store";
import { toggleFocus, toggleSettings } from "../../store/actions";
import { Icon } from "../shared";
import { getConfig } from "../../plugins";

import "./Overlay.sass";

const messages = defineMessages({
  settingsHint: {
    id: "dashboard.settingsHint",
    defaultMessage: "Customise Tabliss",
    description: "Hover hint text for the settings icon",
  },
  reloadImgHint: {
    id: "dashboard.reloadImgHint",
    defaultMessage: "Reload background",
    description: "Reload background image",
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
});

const Overlay: FC = () => {
  const translated = useFormatMessages(messages);
  const focus = useSelector((state) => state.ui.focus);
  const pending = useSelector((state) => state.ui.loaders > 0);

  const dispatch = useDispatch();
  const handleToggleFocus = () => dispatch(toggleFocus());
  const handleToggleSettings = () => dispatch(toggleSettings());

  useKeyPress(handleToggleFocus, ["w"]);
  useKeyPress(handleToggleSettings, ["s"]);

  // Hooks inside a condition? Works because the condition always resolves the same
  const [isFullscreen, handleToggleFullscreen] = useFullscreen();
  if (handleToggleFullscreen) useKeyPress(handleToggleFullscreen, ["f"]);

  const backgroundReloader = useSelector((state) => {
    let background = state.data.backgrounds.find((plugin) => plugin.active);
    if (!background)
      return null;

    const bgPlugin = getConfig(background.key);
    if (!bgPlugin?.reloader)
      return null;

    return <Plugin id={background.id} component={bgPlugin.reloader(`${translated.reloadImgHint}`, "refresh-cw")} />
  });

  return (
    <div className="Overlay">
      <a
        onClick={handleToggleSettings}
        title={`${translated.settingsHint} (S)`}
      >
        <Icon name="settings" />
      </a>

      {pending && (
        <span title={translated.loadingHint}>
          <Icon name="zap" />
        </span>
      )}

      {!pending && backgroundReloader}

      <a
        className="on-hover"
        onClick={handleToggleFocus}
        title={`${translated.focusHint} (W)`}
      >
        <Icon name={focus ? "eye-off" : "eye"} />
      </a>

      {handleToggleFullscreen && (
        <a
          className="on-hover"
          onClick={handleToggleFullscreen}
          title={`${translated.fullscreenHint} (F)`}
        >
          <Icon name={isFullscreen ? "minimize-2" : "maximize-2"} />
        </a>
      )}

    </div>
  );
};

export default Overlay;
