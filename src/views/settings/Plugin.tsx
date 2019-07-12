import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import PluginContainer from '../shared/Plugin';
import { get } from '../../plugins';
import {
  arrowDownIcon,
  arrowUpIcon,
  collapseIcon,
  expandIcon,
  IconButton,
  removeIcon,
} from '../shared';
import { WidgetDisplay, WidgetState } from '../../store/reducers/profile';
import { setWidgetDisplay } from '../../store/actions/profile';
import { useToggle } from '../../utils/useToggle';
import './Plugin.sass';

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Plugin: FC<Props> = ({ plugin, onMoveDown, onMoveUp, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);

  const { title, Settings } = get(plugin.type);

  const dispatch = useDispatch();
  const boundSetDisplay = useCallback(
    (display: Partial<WidgetDisplay>) =>
      dispatch(setWidgetDisplay(plugin.id, display)),
    [dispatch, plugin.id],
  );

  const [showDisplay, toggleDisplay] = useToggle();

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
        <div>
          <PluginContainer id={plugin.id} Component={Settings} />

          <p>
            <a onClick={toggleDisplay}>
              {showDisplay ? 'Hide' : 'Show'} display settings
            </a>
          </p>
          {showDisplay && (
            <>
              <label>
                Position
                <select
                  value={plugin.display.position}
                  onChange={event =>
                    boundSetDisplay({ position: event.target.value as any })
                  }
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

              <label>
                Size
                <input
                  type="number"
                  value={plugin.display.fontSize}
                  min="1"
                  max="100"
                  onChange={event =>
                    boundSetDisplay({ fontSize: Number(event.target.value) })
                  }
                />
              </label>

              <label>
                Font
                <input
                  type="text"
                  value={plugin.display.fontFamily}
                  onChange={event =>
                    boundSetDisplay({ fontFamily: event.target.value })
                  }
                />
              </label>

              {/* <label>
                Font Weight
                <select
                  value={plugin.display.fontWeight}
                  onChange={event =>
                    boundSetDisplay({ fontWeight: Number(event.target.value) })
                  }
                >
                  <option value={undefined}>None</option>
                  <option value={100}>Thin</option>
                  <option value={300}>Light</option>
                  <option value={400}>Regular</option>
                  <option value={500}>Medium</option>
                  <option value={700}>Bold</option>
                  <option value={900}>Black</option>
                </select>
              </label> */}

              <label>
                Colour
                <input
                  type="color"
                  value={plugin.display.colour}
                  onChange={event =>
                    boundSetDisplay({ colour: event.target.value })
                  }
                />
              </label>
            </>
          )}
        </div>
      )}
    </fieldset>
  );
};

export default Plugin;
