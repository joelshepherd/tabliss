import React from 'react';
import { useDispatch } from 'react-redux';

import Plugin from '../../components/plugin/Plugin';
import { getPluginsByType, Type, getPlugin } from '../../plugins';
import { setBackground } from '../../store/actions/profile';
import { useSelector } from '../../store/store';

const Background: React.FC = () => {
  const plugins = getPluginsByType(Type.BACKGROUND);

  const background = useSelector(state =>
    state.profile.plugins.find(
      plugin => plugin.active && plugin.position === 'background',
    ),
  );

  const dispatch = useDispatch();
  const handleChangeBackground = React.useCallback(
    (type: string) => dispatch(setBackground(type)),
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

      {background && getPlugin(background.type).Settings && (
        <Plugin
          id={background.id}
          Component={getPlugin(background.type).Settings!}
        />
      )}
    </div>
  );
};

export default Background;
