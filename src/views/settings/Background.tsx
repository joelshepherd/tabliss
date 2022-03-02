import React from "react";
import { FormattedMessage } from "react-intl";
import { setBackground } from "../../db/action";
import { BackgroundDisplay, db } from "../../db/state";
import { useKey } from "../../lib/db/react";
import { backgroundConfigs, getConfig } from "../../plugins";
import Plugin from "../shared/Plugin";
import ToggleSection from "../shared/ToggleSection";

const Background: React.FC = () => {
  const [data, setData] = useKey(db, "background");

  const plugin = getConfig(data.key);

  const setBackgroundDisplay = (display: BackgroundDisplay): void => {
    setData({ ...data, display: { ...data.display, ...display } });
  };

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
          value={data.key}
          onChange={(event) => setBackground(event.target.value)}
          className="primary"
        >
          {backgroundConfigs.map((plugin) => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.name}
            </option>
          ))}
        </select>
      </label>

      {plugin && (
        <div className="Widget">
          <h4>{plugin.name}</h4>

          {plugin.settingsComponent && (
            <div className="settings">
              <Plugin id={data.id} component={plugin.settingsComponent} />
            </div>
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
                    value={data.display.blur}
                    onChange={(event) =>
                      setBackgroundDisplay({
                        blur: Number(event.target.value),
                      })
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
                    value={data.display.luminosity}
                    onChange={(event) =>
                      setBackgroundDisplay({
                        luminosity: Number(event.target.value),
                      })
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
