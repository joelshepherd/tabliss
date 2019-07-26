import icons from 'feather-icons/dist/icons.json';
import React, { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useFullscreen } from '../../utils/useFullscreen';
import { useKeyPress } from '../../utils/useKeyPress';
import { useSelector } from '../../store';
import { toggleFocus, toggleSettings } from '../../store/actions';
import { Icon } from '../shared';
import './Overlay.sass';

const messages = defineMessages({
  settingsHint: {
    id: 'dashboard.settingsHint',
    defaultMessage: 'Customise Tabliss',
    description: 'Hover hint text for the settings icon',
  },
  focusHint: {
    id: 'dashboard.focusHint',
    defaultMessage: 'Toggle widgets',
    description: 'Hover hint text for the widgets toggle',
  },
  fullscreenHint: {
    id: 'dashboard.fullscreenHint',
    defaultMessage: 'Toggle fullscreen',
    description: 'Hover hint text for the fullscreen toggle',
  },
  loadingHint: {
    id: 'dashboard.loadingHint',
    defaultMessage: 'Loading new content',
    description:
      'Hover hint text for the loading indicator icon (the lightning bolt)',
  },
});

const Overlay: FC = () => {
  const intl = useIntl();
  const settingsHint = intl.formatMessage(messages.settingsHint);
  const focusHint = intl.formatMessage(messages.focusHint);
  const fullscreenHint = intl.formatMessage(messages.fullscreenHint);

  const focus = useSelector(state => state.ui.focus);
  const pending = useSelector(state => state.ui.loaders > 0);

  const dispatch = useDispatch();
  const handleToggleFocus = React.useCallback(() => dispatch(toggleFocus()), [
    dispatch,
  ]);
  const handleToggleSettings = React.useCallback(
    () => dispatch(toggleSettings()),
    [dispatch],
  );

  useKeyPress(handleToggleFocus, ['w']);
  useKeyPress(handleToggleSettings, ['s']);

  // Hooks inside a condition???
  // Not good, but it works because the condition always resolves the same
  const [isFullscreen, handleToggleFullscreen] = useFullscreen();
  if (handleToggleFullscreen) {
    useKeyPress(handleToggleFullscreen, ['f']);
  }

  return (
    <div className="Overlay">
      <a onClick={handleToggleSettings} title={`${settingsHint} (S)`}>
        <Icon svg={icons['settings']} />
      </a>

      {pending && (
        <span title={intl.formatMessage(messages.loadingHint)}>
          <Icon svg={icons['zap']} />
        </span>
      )}

      <a
        className="on-hover"
        onClick={handleToggleFocus}
        title={`${focusHint} (W)`}
      >
        <Icon svg={focus ? icons['eye-off'] : icons['eye']} />
      </a>

      {handleToggleFullscreen && (
        <a
          className="on-hover"
          onClick={handleToggleFullscreen}
          title={`${fullscreenHint} (F)`}
        >
          <Icon
            svg={isFullscreen ? icons['minimize-2'] : icons['maximize-2']}
          />
        </a>
      )}
    </div>
  );
};

export default Overlay;
