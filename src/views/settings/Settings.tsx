import icons from 'feather-icons/dist/icons.json';
import React, { FC, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { resetStore, toggleSettings } from '../../store/actions';
import { useKeyPress } from '../../utils/useKeyPress';
import Logo from '../shared/Logo';
import Background from './Background';
import Feedback from './Feedback';
import Homepage from './Homepage';
import System from './System';
import Widgets from './Widgets';
import './Settings.sass';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const handleToggleSettings = useCallback(() => dispatch(toggleSettings()), [
    dispatch,
  ]);
  const handleReset = useCallback(() => dispatch(resetStore()), [dispatch]);

  useKeyPress(handleToggleSettings, ['Escape']);

  return (
    <div className="Settings">
      <a onClick={handleToggleSettings} className="fullscreen" />

      <div className="plane">
        <Logo />

        <Background />

        <Widgets />

        <System />

        {process.env.BUILD_TARGET === 'firefox' && <Homepage />}

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
          <a onClick={handleReset}>Reset to default</a>
        </p>

        <p>
          <a href="https://tabliss.io/" target="_blank">
            {icons['globe']}
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons['twitter']}
          </a>
          &nbsp;&nbsp;
          <a
            href="https://github.com/joelshepherd/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons['github']}
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

export default Settings;
