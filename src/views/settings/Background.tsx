import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { backgroundConfigs, getConfig } from '../../plugins';
import { useSelector } from '../../store';
import { setBackground, setBackgroundDisplay } from '../../store/actions/data';
import Plugin from '../shared/Plugin';
import ToggleSection from '../shared/ToggleSection';

const Background: FC = () => {
  const dispatch = useDispatch();

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

      <label>
        <select
          value={background && background.key}
          onChange={event =>
            dispatch(
              setBackground(event.target.value, background && background.id),
            )
          }
          className="primary"
        >
          {backgroundConfigs.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name} - {plugin.description}
            </option>
          ))}
        </select>
      </label>

      {background && plugin && (
        <div className="Widget">
          <h4>{plugin.name}</h4>
          <p>{plugin.description}</p>

          {plugin.settingsComponent && (
            <Plugin id={background.id} component={plugin.settingsComponent} />
          )}

          {plugin.supportsBackdrop && (
            <ToggleSection name="Display Settings">
              <>
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
                </label>
              </>
            </ToggleSection>
          )}
        </div>
      )}
    </div>
  );
};

export default Background;
