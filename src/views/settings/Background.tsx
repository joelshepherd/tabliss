import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { BACKGROUNDS, get } from '../../plugins';
import { useSelector } from '../../store';
import { setBackground, setBackgroundDisplay } from '../../store/actions/data';
import { BackgroundDisplay } from '../../store/reducers/data';
import Plugin from '../shared/Plugin';

const Background: FC = () => {
  const background = useSelector(state =>
    state.data.backgrounds.find(plugin => plugin.active),
  );
  const plugin = background ? get(background.key) : undefined;

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
          value={background && background.key}
          onChange={event => handleChangeBackground(event.target.value)}
          className="primary"
        >
          {BACKGROUNDS.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name} - {plugin.description}
            </option>
          ))}
        </select>
      </label>

      {background && plugin && (
        <div className="Widget">
          <h4>{plugin.name}</h4>

          {plugin.Settings && (
            <Plugin id={background.id} Component={plugin.Settings} />
          )}

          <label>
            Blur <br />
            <input
              type="range"
              list="blur-markers"
              min="0"
              max="50"
              step="2"
              value={background.display.blur}
              onChange={event =>
                handleSetDisplay(background.id, {
                  blur: Number(event.target.value),
                })
              }
            />
            <datalist id="blur-markers">
              <option value="0" />
              <option value="50" />
            </datalist>
          </label>

          <label>
            Luminosity <br />
            <input
              type="range"
              list="luminosity-markers"
              min="-1"
              max="1"
              step="0.1"
              value={background.display.luminosity}
              onChange={event =>
                handleSetDisplay(background.id, {
                  luminosity: Number(event.target.value),
                })
              }
            />
            <datalist id="luminosity-markers">
              <option value="-1" label="Darken" />
              <option value="0" />
              <option value="1" label="Lighten" />
            </datalist>
          </label>
        </div>
      )}
    </div>
  );
};

export default Background;
