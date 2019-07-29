import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { get } from '../../plugins';
import PluginContainer from '../shared/Plugin';
import {
  CollapseIcon,
  DownIcon,
  ExpandIcon,
  IconButton,
  RemoveIcon,
  UpIcon,
} from '../shared';
import { setWidgetDisplay } from '../../store/actions';
import { WidgetDisplay, WidgetState } from '../../store/reducers/data';
import { useToggle } from '../../utils/useToggle';
import PositionInput from './PositionInput';
import './Widget.sass';

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Widget: FC<Props> = ({ plugin, onMoveDown, onMoveUp, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);
  const [isFontOpen, toggleIsFontOpen] = useToggle();

  const { name, Settings } = get(plugin.key);

  const dispatch = useDispatch();
  const boundSetDisplay = useCallback(
    (display: Partial<WidgetDisplay>) =>
      dispatch(setWidgetDisplay(plugin.id, display)),
    [dispatch, plugin.id],
  );

  return (
    <fieldset className="Widget">
      <div className="title--buttons">
        <IconButton
          onClick={toggleIsOpen}
          title={`${isOpen ? 'Close' : 'Edit'} widget settings`}
        >
          {isOpen ? <CollapseIcon /> : <ExpandIcon />}
        </IconButton>

        {isOpen && (
          <IconButton onClick={onRemove} title="Remove widget">
            <RemoveIcon />
          </IconButton>
        )}

        {isOpen && onMoveDown && (
          <IconButton onClick={onMoveDown} title="Move widget down">
            <DownIcon />
          </IconButton>
        )}

        {isOpen && onMoveUp && (
          <IconButton onClick={onMoveUp} title="Move widget up">
            <UpIcon />
          </IconButton>
        )}

        <h4 onClick={toggleIsOpen}>{name}</h4>
      </div>

      {isOpen && (
        <div>
          <PositionInput
            value={plugin.display.position}
            onChange={position => boundSetDisplay({ position })}
          />

          <label>
            Size
            <br />
            <input
              type="range"
              value={plugin.display.fontSize}
              min="2"
              max="100"
              step="2"
              onChange={event =>
                boundSetDisplay({ fontSize: Number(event.target.value) })
              }
            />
          </label>

          {Settings && <PluginContainer id={plugin.id} Component={Settings} />}

          <p>
            <a onClick={toggleIsFontOpen}>
              {isFontOpen ? 'Close' : 'Edit'} font settings
            </a>
          </p>

          {isFontOpen && (
            <>
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

export default Widget;
