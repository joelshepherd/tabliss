import React, { FC } from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { useDispatch } from 'react-redux';

import { eyeIcon, eyeOffIcon } from '../shared';
import { useSelector } from '../../store';
import { toggleFocus, toggleSettings } from '../../store/reducers/ui';
import { isInputEvent } from '../../utils';
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

// private onKeyDown = (event: KeyboardEvent) => {
//   // Check for input focus
//   if (isInputEvent(event)) {
//     return;
//   }

//   switch (event.keyCode) {
//     case 70: // F
//       screenfull.toggle();
//       break;

//     case 83: // S
//       this.props.toggleSettings();
//       break;

//     case 87: // W
//       this.props.toggleFocus();
//       break;

//     default:
//   }
// };

export default injectIntl(Overlay);
