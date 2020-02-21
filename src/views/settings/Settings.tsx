import React, { FC, memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useKeyPress } from '../../hooks';
import { resetStore, toggleSettings } from '../../store/actions';
import { Icon } from '../shared';
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

        <Feedback />

        <System />

        {process.env.BUILD_TARGET === 'firefox' && <Homepage />}

        <br />

        <div>
          <a
            href="https://www.paypal.me/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            Love Tabliss? Donate 😍
          </a>
        </div>

        <div>
          <a onClick={handleReset} href="#">
            Reset to default
          </a>
        </div>

        <br />

        <p>
          <a href="https://tabliss.io/" target="_blank">
            <Icon name="globe" />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="twitter" />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://github.com/joelshepherd/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" />
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

export default memo(Settings);
