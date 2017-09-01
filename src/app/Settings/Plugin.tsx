import * as React from 'react';
import { Minus } from 'react-feather';
import { connect, Dispatch } from 'react-redux';
import { Action, RootState, updateSettings } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';
import './Plugin.css';

interface OwnProps {
  plugin: IPlugin;
  onRemove?: () => void;
}

interface Props extends OwnProps {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

const Plugin: React.StatelessComponent<Props> = (props) => {
  const Component = props.plugin.Settings;

  return (
    <fieldset className="Plugin">
      {typeof props.onRemove !== 'undefined' &&
        <button
          className="button--icon"
          onClick={props.onRemove}
          style={{ float: 'right' }}
          title="Remove this widget"
        >
          <Minus />
        </button>
      }

      <h4>{props.plugin.title} settings</h4>

      {Component && <Component {...props.settings} onChange={props.updateSettings} />}
    </fieldset>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => {
  return {
    settings: (state.storage[props.plugin.key] || {}).settings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => {
  return {
    updateSettings: (settings: Settings) => {
      dispatch(updateSettings(props.plugin.key, settings));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
