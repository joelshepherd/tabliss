import React, { FC, useCallback } from 'react';

import PluginContainer from '../../components/plugin/Plugin';
import { getPlugin } from '../../plugins';
import {
  arrowDownIcon,
  arrowUpIcon,
  collapseIcon,
  expandIcon,
  IconButton,
  removeIcon,
} from '../../components';
import './Plugin.sass';
import { useToggle } from '../../utils/useToggle';
import { WidgetState } from '../../store/reducers/profile';
import { useDispatch } from 'react-redux';
import { setPosition } from '../../store/actions/profile';

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Plugin: FC<Props> = ({ plugin, onMoveDown, onMoveUp, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);

  const { title, Settings } = getPlugin(plugin.type);

  const dispatch = useDispatch();
  const handlePositionChange = useCallback(
    (position: any) => dispatch(setPosition(plugin.id, position)),
    [dispatch],
  );

  return (
    <fieldset className="Plugin">
      {Settings ? (
        <div className="title--buttons">
          <IconButton
            onClick={toggleIsOpen}
            title={`${isOpen ? 'Close' : 'Edit'} widget settings`}
          >
            {isOpen ? collapseIcon : expandIcon}
          </IconButton>

          {isOpen && (
            <IconButton key="remove" onClick={onRemove} title="Remove widget">
              {removeIcon}
            </IconButton>
          )}

          {isOpen && onMoveDown && (
            <IconButton
              key="down"
              onClick={onMoveDown}
              title="Move widget down"
            >
              {arrowDownIcon}
            </IconButton>
          )}

          {isOpen && onMoveUp && (
            <IconButton key="up" onClick={onMoveUp} title="Move widget up">
              {arrowUpIcon}
            </IconButton>
          )}

          <h4 onClick={toggleIsOpen}>{title}</h4>
        </div>
      ) : (
        <h4>{title}</h4>
      )}

      {isOpen && Settings && (
        <>
          <label>
            Position
            <select
              value={plugin.position}
              onChange={e => handlePositionChange(e.target.value)}
            >
              <option value="topLeft">Top Left</option>
              <option value="topCentre">Top Centre</option>
              <option value="topRight">Top Right</option>
              <option value="middleLeft">Middle Left</option>
              <option value="middleCentre">Middle Centre</option>
              <option value="middleRight">Middle Right</option>
              <option value="bottomLeft">Bottom Left</option>
              <option value="bottomCentre">Bottom Centre</option>
              <option value="bottomRight">Bottom Right</option>
            </select>
          </label>

          <PluginContainer id={plugin.id} Component={Settings} />
        </>
      )}
    </fieldset>
  );
};

export default Plugin;
