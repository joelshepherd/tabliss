import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useToggle } from '../../hooks';
import { getConfig } from '../../plugins';
import { setWidgetDisplay } from '../../store/actions';
import {
  WidgetDisplay as WidgetDisplayInterface,
  WidgetState,
} from '../../store/reducers/types';
import PluginContainer from '../shared/Plugin';
import { DownIcon, IconButton, RemoveIcon, UpIcon, Icon } from '../shared';
import ToggleSection from '../shared/ToggleSection';
/*import ToggleSetting from '../shared/ToggleSetting';*/
import WidgetDisplay from './WidgetDisplay';
import './Widget.sass';
import { settings } from 'cluster';


interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Widget: FC<Props> = ({ plugin, onMoveDown, onMoveUp, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);
  const [isOutlined, toggleOutline] = useToggle();
  const { description, name, settingsComponent } = getConfig(plugin.key);
  const [outlineSettings, setOutline] = useState({
    colour: '',
    opacity: '',
    width: ''
  });

  const dispatch = useDispatch();
  const boundSetDisplay = useCallback(
    (display: Partial<WidgetDisplayInterface>) =>
      dispatch(setWidgetDisplay(plugin.id, display)),
    [dispatch, plugin.id],
  );

  return (
    <fieldset className="Widget">
      <div className="title--buttons">
        <IconButton onClick={onRemove} title="Remove widget">
          <RemoveIcon />
        </IconButton>

        <IconButton
          onClick={toggleIsOpen}
          title={`${isOpen ? 'Close' : 'Edit'} widget settings`}
        >
          <Icon name="settings" />
        </IconButton>

        {onMoveDown && (
          <IconButton onClick={onMoveDown} title="Move widget down">
            <DownIcon />
          </IconButton>
        )}

        {onMoveUp && (
          <IconButton onClick={onMoveUp} title="Move widget up">
            <UpIcon />
          </IconButton>
        )}

        <h4 onClick={toggleIsOpen}>{name}</h4>
        {!isOpen && <p>{description}</p>}
      </div>

      {isOpen && (
        <div>
          {settingsComponent && (
            <div className="settings">
              <PluginContainer id={plugin.id} component={settingsComponent} />
            </div>
          )}

          <ToggleSection name="Display Settings">
            <WidgetDisplay
              display={plugin.display}
              onChange={boundSetDisplay}
            />
          </ToggleSection>

          <ToggleSection name="Font Settings">
            <div>
              <label>
                Font
                <input
                  type="text"
                  value={plugin.display.fontFamily}
                  onChange={(event) =>
                    boundSetDisplay({ fontFamily: event.target.value })
                  }
                />
              </label>

              <label>
                Weight
                <select
                  value={plugin.display.fontWeight}
                  onChange={(event) =>
                    boundSetDisplay({ fontWeight: Number(event.target.value) })
                  }
                >
                  <option value={undefined}>Default</option>
                  <option value={100}>Thin</option>
                  <option value={300}>Light</option>
                  <option value={400}>Regular</option>
                  <option value={500}>Medium</option>
                  <option value={700}>Bold</option>
                  <option value={900}>Black</option>
                </select>
              </label>

              <label>
                Colour
                <input
                  type="color"
                  value={plugin.display.colour}
                  onChange={(event) =>
                    boundSetDisplay({ colour: event.target.value })
                  }
                />
              </label>

              <label className="switch">
                <input type="checkbox" onClick={() => {
                  toggleOutline();
                  setOutline(isOutlined ? outlineSettings : {
                    colour: '',
                    opacity: '',
                    width: ''
                  });
                }} />
                <span className="slider"></span>
                     Activate Outline
              </label>


              {isOutlined && (
                <div>
                  < label >
                    Outline Colour
                <input
                      type="color"
                      value={plugin.display.outlineColour}
                      onChange={(event) => {
                        setOutline({ opacity: outlineSettings.opacity, width: outlineSettings.width, colour: event.target.value });
                        boundSetDisplay({ outlineColour: outlineSettings.colour })
                      }
                      }
                    />

                  </label>
                  <label>Outline Opacity
                 <input type="range"
                      value={plugin.display.outlineOpacity}
                      min="0"
                      max="255"
                      onChange={(event) => {
                        setOutline({ opacity: event.target.value, width: outlineSettings.width, colour: outlineSettings.colour });
                        boundSetDisplay({ outlineOpacity: Number(outlineSettings.opacity) })
                      }}
                    />
                  </label>
                  <label>Outline Width
                 <input type="range"
                      value={plugin.display.outlineWidth}
                      min="0"
                      max="5"
                      step="0.1"
                      onChange={(event) => {
                        setOutline({ opacity: outlineSettings.width, width: event.target.value, colour: outlineSettings.colour });
                        boundSetDisplay({ outlineWidth: Number(outlineSettings.width) })
                      }}
                    />
                  </label>
                </div>)}
            </div>
          </ToggleSection>
        </div>
      )
      }
    </fieldset >
  );
};

export default Widget;
