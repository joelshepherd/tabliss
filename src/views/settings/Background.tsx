import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Plugin from '../../components/plugin/Plugin';
import { getPluginsByType, getPlugin } from '../../plugins';
import {
  setBackground,
  setBackgroundDisplay,
} from '../../store/actions/profile';
import { useSelector } from '../../store/store';
import { BackgroundDisplay } from '../../store/reducers/profile';

const Background: FC = () => {
  const plugins = getPluginsByType('background');

  const background = useSelector(state =>
    state.profile.backgrounds.find(plugin => plugin.active),
  );

  const dispatch = useDispatch();
  const handleChangeBackground = React.useCallback(
    (type: string) => dispatch(setBackground(type)),
    [dispatch],
  );
  const handleSetDisplay = React.useCallback(
    (id: string, display: Partial<BackgroundDisplay>) =>
      dispatch(setBackgroundDisplay(id, display)),
    [dispatch],
  );

  return (
    <div>
      <h3>Background</h3>

      <label>
        <select
          value={background && background.type}
          onChange={event => handleChangeBackground(event.target.value)}
          className="primary"
        >
          {plugins.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.title}
            </option>
          ))}
        </select>
      </label>

      {background && (
        <>
          {getPlugin(background.type).Settings && (
            <Plugin
              id={background.id}
              Component={getPlugin(background.type).Settings!}
            />
          )}

          <label>
            Blur <br />
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={background.display.blur}
              onChange={event =>
                handleSetDisplay(background.id, {
                  blur: Number(event.target.value),
                })
              }
            />
          </label>

          <label>
            Luminosity <br />
            <input
              type="range"
              min="-100"
              max="100"
              step="10"
              value={background.display.luminosity}
              onChange={event =>
                handleSetDisplay(background.id, {
                  luminosity: Number(event.target.value),
                })
              }
            />
          </label>
        </>
      )}
    </div>
  );
};

export default Background;
