import React, { FC } from 'react';

import PluginContainer from '../../containers/Plugin';
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
import { PluginState } from '../../store/reducers/profile';

interface Props {
  plugin: PluginState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Plugin: FC<Props> = ({ plugin, onMoveDown, onMoveUp, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);

  const { title, Settings } = getPlugin(plugin.type);

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
        <PluginContainer
          id={plugin.id}
          Component={Settings}
          data={plugin.data}
        />
      )}
    </fieldset>
  );
};

export default Plugin;
