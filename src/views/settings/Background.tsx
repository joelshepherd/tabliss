import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { BACKGROUND_PLUGINS, get } from '../../plugins';
import { useSelector } from '../../store';
import {
  setBackground,
  setBackgroundDisplay,
} from '../../store/actions/profile';
import { BackgroundDisplay } from '../../store/reducers/profile';
import Plugin from '../shared/Plugin';

const Background: FC = () => {
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
          {BACKGROUND_PLUGINS.map(plugin => (
            <option key={plugin.type} value={plugin.type}>
              {plugin.title}
            </option>
          ))}
        </select>
      </label>

      {background && (
        <>
          {get(background.type).Settings && (
            <Plugin
              id={background.id}
              Component={get(background.type).Settings}
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
