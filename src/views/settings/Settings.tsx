import React, { FC, memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useKeyPress } from '../../hooks';
import { resetStore, toggleSettings } from '../../store/actions';
import { dataStorage } from '../../store/storage';
import { DataState } from '../../store/reducers/types';
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
  const handleExport = async () => {
    const { data } = useSelector((state) => state);
    const jsonData = JSON.stringify(data);
    const url = URL.createObjectURL(new Blob([jsonData], { type: 'octet/stream' }));
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'tabliss.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  const handleImport = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.type = 'file';
    input.addEventListener('change', function () {
      if (this.files) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          if (event && event.target && event.target.result) {
            const state: DataState = JSON.parse(event.target.result as string);
            dispatch(resetStore(state));
          }
        });
        reader.readAsText(file);
      }
    });
    input.click();
  }

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
          <a onClick={handleExport}>Export settings</a>
        </p>

        <p>
          <a onClick={handleImport}>Import settings</a>
        </p>

        <p>
          <a onClick={handleReset}>Reset to default</a>
        </p>

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
