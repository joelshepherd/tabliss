import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action, RootState, updateSettings } from '../../data';
import { Plugin as IPlugin, Settings } from '../../plugins';

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
    <fieldset>
      <legend>{props.plugin.title}</legend>

      {Component && <Component {...props.settings} onChange={props.updateSettings} />}

      {typeof props.onRemove !== 'undefined' &&
        <button onClick={props.onRemove}>Remove</button>
      }
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
