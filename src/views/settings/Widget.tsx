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
import { Icon } from '../shared';
import WidgetDisplay from './WidgetDisplay';
import './Widget.sass';
import { Collapse, CardLink, DropdownMenu, DropdownItem } from 'reactstrap';
import ToggleCard from '../shared/bootstrap/ToggleCard';
import InputGroup from '../shared/bootstrap/InputGroup';

interface Props {
  plugin: WidgetState;
  onRemove: () => void;
}

enum Config {
  DISPLAY = 'Display',
  FONT = 'Font',
  NONE = '',
}

const Widget: FC<Props> = ({ plugin, onRemove }) => {
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);
  const [dropdown, dropdownToggle] = useToggle(true);

  const [configOpen, setConfigOpen] = useState(Config.NONE);
  const [configPrimary, setConfigPrimary] = useState(Config.DISPLAY);

  const { description, name, settingsComponent } = getConfig(plugin.key);

  const dispatch = useDispatch();
  const boundSetDisplay = useCallback(
    (display: Partial<WidgetDisplayInterface>) =>
      dispatch(setWidgetDisplay(plugin.id, display)),
    [dispatch, plugin.id],
  );

  return (
    <ToggleCard
      title={name}
      description={description}
      defaultState={onRemove === undefined}
    >
      <>
        {settingsComponent && (
          <PluginContainer id={plugin.id} component={settingsComponent} />
        )}

        <CardLink
          href="#"
          onClick={() => {
            if (configOpen === Config.NONE) setConfigOpen(configPrimary);
            else setConfigOpen(Config.NONE);
          }}
        >
          {configOpen === Config.NONE ? 'Open' : 'Close'} {configPrimary}{' '}
          Settings
        </CardLink>

        <CardLink className="float-right" onClick={dropdownToggle}>
          <Icon name="more-vertical" />
        </CardLink>

        <DropdownMenu style={{ display: dropdown ? 'none' : 'block' }} right>
          <DropdownItem
            onClick={() => {
              const nextPrimary =
                configPrimary === Config.FONT ? Config.DISPLAY : Config.FONT;

              setConfigPrimary(nextPrimary);
              setConfigOpen(nextPrimary);

              dropdownToggle();
            }}
          >
            Open {configPrimary === Config.FONT ? 'Display' : 'Font'} Settings
          </DropdownItem>
          <DropdownItem onClick={onRemove}>Delete</DropdownItem>
        </DropdownMenu>

        <Collapse isOpen={configOpen === Config.DISPLAY}>
          <WidgetDisplay display={plugin.display} onChange={boundSetDisplay} />
        </Collapse>

        <Collapse isOpen={configOpen === Config.FONT}>
          <InputGroup
            type="text"
            value={plugin.display.fontFamily}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              boundSetDisplay({ fontFamily: event.target.value })
            }
            label="Font"
          />
          Font
          <InputGroup
            type="color"
            value={plugin.display.colour}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              boundSetDisplay({ colour: event.target.value })
            }
            label="Colour"
          />
        </Collapse>
      </>
    </ToggleCard>
  );
};

export default Widget;
