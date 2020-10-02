import React, { FC, memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useKeyPress } from '../../hooks';
import { useSelector } from '../../store';
import { resetStore, toggleSettings } from '../../store/actions';
import { DataState } from '../../store/reducers/types';
import { Icon } from '../shared';
import Logo from '../shared/Logo';
import Background from './Background';
import Feedback from './Feedback';
import Homepage from './Homepage';
import './Settings.sass';
import System from './System';
import Widgets from './Widgets';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const handleToggleSettings = useCallback(() => dispatch(toggleSettings()), [
    dispatch,
  ]);
  const handleReset = useCallback(() => dispatch(resetStore()), [dispatch]);
  const data = useSelector((state) => state.data);

  const handleExport = () => {
    const json = JSON.stringify(data);
    const url = URL.createObjectURL(
      new Blob([json], { type: 'application/json' }),
    );

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'tabliss.json';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const handleImport = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.style.display = 'none';
    input.type = 'file';
    input.addEventListener('change', function () {
      if (this.files) {
        const file = this.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          if (event.target && event.target.result) {
            const state: DataState = JSON.parse(event.target.result as string);
            dispatch(resetStore(state));
          }
        });
        reader.readAsText(file);
      }
      document.body.removeChild(input);
    });
    input.click();
  };

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
          <a onClick={handleImport}>Import</a>,{' '}
          <a onClick={handleExport}>export</a> or{' '}
          <a onClick={handleReset}>reset</a> settings
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
