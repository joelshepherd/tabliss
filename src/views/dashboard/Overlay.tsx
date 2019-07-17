import React, { FC } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useKeyPress } from '../../utils/useKeyPress';
import { useSelector } from '../../store';
import { toggleFocus, toggleSettings } from '../../store/actions';
import { eyeIcon, eyeOffIcon } from '../shared';
import './Overlay.sass';

const settingsIcon = require('feather-icons/dist/icons/settings.svg');
const pendingIcon = require('feather-icons/dist/icons/zap.svg');

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
    description: 'Hover hint text for the loading icon (the lightning bolt)',
  },
});

const Overlay: FC<InjectedIntlProps> = ({ intl }) => {
  const settingsHint = intl.formatMessage(messages.settingsHint);
  const focusHint = intl.formatMessage(messages.focusHint);

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

  return (
    <div className="Overlay">
      <a onClick={handleToggleSettings} title={`${settingsHint} (S)`}>
        <i dangerouslySetInnerHTML={{ __html: settingsIcon }} />
      </a>

      <a onClick={handleToggleFocus} title={`${focusHint} (W)`}>
        {focus ? eyeOffIcon : eyeIcon}
      </a>

      {pending && (
        <span title={intl.formatMessage(messages.loadingHint)}>
          <i dangerouslySetInnerHTML={{ __html: pendingIcon }} />
        </span>
      )}
    </div>
  );
};

export default injectIntl(Overlay);
