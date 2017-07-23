import * as React from 'react';
import { Plugin as PluginInterface } from '../../plugins';

interface Props {
  component: PluginInterface;
  settings: any;
  onChange: (settings: any) => void;
}

class Plugin extends React.Component<Props> {
  render() {
    return (
      <div>
        <h4>Settings</h4>
        <this.props.component.settings
          onChange={this.props.onChange}
          {...this.props.settings}
        />
      </div>
    );
  }
}

export default Plugin;
