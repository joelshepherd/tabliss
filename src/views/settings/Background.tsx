import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  FormGroup,
  CustomInput,
  Card,
  CardBody,
  CardLink,
  Collapse,
  Label,
  Input,
} from 'reactstrap';

import { backgroundConfigs, getConfig } from '../../plugins';
import { useSelector } from '../../store';
import { setBackground, setBackgroundDisplay } from '../../store/actions/data';
import Plugin from '../shared/Plugin';
import ToggleSection from '../shared/ToggleSection';
import { useToggle } from '../../hooks';

const Background: FC = () => {
  const dispatch = useDispatch();
  const [displaySettings, toggleDisplaySettings] = useToggle(false);

  const background = useSelector(state =>
    state.data.backgrounds.find(plugin => plugin.active),
  );
  const plugin = background ? getConfig(background.key) : undefined;

  return (
    <div>
      <h2>
        <FormattedMessage
          id="background"
          defaultMessage="Background"
          description="Background title"
        />
      </h2>

      <FormGroup>
        <CustomInput
          type="select"
          id="backgroundProviderSelector"
          name="Background Provider Selector"
          value={background && background.key}
          onChange={event =>
            dispatch(
              setBackground(event.target.value, background && background.id),
            )
          }
        >
          {backgroundConfigs.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </CustomInput>
      </FormGroup>

      {background && plugin && (
        <Card>
          <CardBody>
            <h4>{plugin.name}</h4>

            {plugin.settingsComponent && (
              <div className="settings">
                <Plugin
                  id={background.id}
                  component={plugin.settingsComponent}
                />
              </div>
            )}

            {plugin.supportsBackdrop && (
              <>
                <CardLink onClick={toggleDisplaySettings} href="#">
                  {!displaySettings ? 'Open' : 'Close'} Display Settings
                </CardLink>

                <Collapse isOpen={displaySettings}>
                  <Label>Blur</Label>
                  <CustomInput
                    min="0"
                    max="50"
                    step="2"
                    type="range"
                    id="blur-slider"
                    list="blur-markers"
                    value={background.display.blur}
                    onChange={event =>
                      dispatch(
                        setBackgroundDisplay({
                          blur: Number(event.target.value),
                        }),
                      )
                    }
                  />
                  <datalist id="blur-markers">
                    <option value="0" />
                    <option value="50" />
                  </datalist>

                  <Label>Luminosity</Label>
                  <CustomInput
                    max="1"
                    min="-1"
                    step="0.1"
                    type="range"
                    id="luminosity-slider"
                    list="luminosity-markers"
                    value={background.display.luminosity}
                    onChange={event =>
                      dispatch(
                        setBackgroundDisplay({
                          luminosity: Number(event.target.value),
                        }),
                      )
                    }
                  />
                  <datalist id="luminosity-markers">
                    <option value="-1" label="Darken" />
                    <option value="0" />
                    <option value="1" label="Lighten" />
                  </datalist>
                </Collapse>
              </>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Background;
