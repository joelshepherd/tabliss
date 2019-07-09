import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Plugin from '../../components/plugin/Plugin';
import { getPluginsByType, Type, getPlugin } from '../../plugins';
import {
  setBackground,
  setBlur,
  setLuminosity,
} from '../../store/actions/profile';
import { useSelector } from '../../store/store';

const Background: FC = () => {
  const plugins = getPluginsByType(Type.BACKGROUND);

  const background = useSelector(state =>
    state.profile.backgrounds.find(plugin => plugin.active),
  );

  const dispatch = useDispatch();
  const handleChangeBackground = React.useCallback(
    (type: string) => dispatch(setBackground(type)),
    [dispatch],
  );
  const handleSetBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setBlur(Number(event.target.value))),
    [dispatch],
  );
  const handleSetLuminosity = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setLuminosity(Number(event.target.value))),
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
              value={background.blur}
              onChange={handleSetBlur}
            />
          </label>

          <label>
            Darken <br />
            <input
              type="range"
              min="-100"
              max="100"
              step="10"
              value={background.luminosity}
              onChange={handleSetLuminosity}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default Background;
