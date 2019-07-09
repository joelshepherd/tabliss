import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { githubIcon, globeIcon, twitterIcon } from '../../components';
import { toggleSettings } from '../../store/reducers/ui';
import Background from './Background';
import Feedback from './Feedback';
import Homepage from './Homepage';
import System from './System';
import Widgets from './Widgets';
import './Settings.sass';
const logo = require('./logo.svg');

const Settings: FC = () => {
  const dispatch = useDispatch();

  const handleToggleSettings = React.useCallback(
    () => dispatch(toggleSettings()),
    [dispatch],
  );

  return (
    <div className="Settings">
      <a onClick={handleToggleSettings} className="fullscreen" />

      <div className="plane">
        <h1>
          <i dangerouslySetInnerHTML={{ __html: logo }} />
        </h1>

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

        {/* <p>
            <a onClick={this.reset}>Reset to default</a>
          </p> */}

        <p>
          <a href="https://tabliss.io/" target="_blank">
            {globeIcon}
          </a>
          &nbsp;&nbsp;
          <a
            href="https://twitter.com/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            {twitterIcon}
          </a>
          &nbsp;&nbsp;
          <a
            href="https://github.com/joelshepherd/tabliss"
            target="_blank"
            rel="noopener noreferrer"
          >
            {githubIcon}
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
