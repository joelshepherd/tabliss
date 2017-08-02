import * as React from 'react';
import { connect } from 'react-redux';
import { getSettings, getState, Plugins, State } from '../../data';
import { getPlugin } from '../../plugins';
import './Widgets.css';

interface Props {
  plugins: Plugins;
  system: string[];
}

class System extends React.Component<Props> {
  render() {
    return (
      <div className="System">
        {this.props.system.map(this.renderComponent)}
      </div>
    );
  }

  private renderComponent = (key: string) => {
    const Component = getPlugin(key).Dashboard;
    const settings = getSettings(this.props.plugins, key);
    const state = getState(this.props.plugins, key);

    return <Component {...settings} state={state} key={key} />;
  }
}

const mapStateToProps = (state: State) => {
  return {
    plugins: state.plugins,
    system: state.dashboard.system,
  };
};

export default connect(mapStateToProps, {})(System);
