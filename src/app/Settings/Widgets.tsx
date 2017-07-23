import * as React from 'react';
import { connect } from 'react-redux';
import Plugin from './Plugin';
import { changeSettings } from '../../data/actions';

interface Props {
  plugins: any,
  widgets: any;
  onChangeSettings: (component: any, settings: any) => void;
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>Widgets</h3>

        {this.props.widgets.filter((widget: any) => widget.component.settings).map((widget: any, key: number) =>
          <Plugin key={key} {...widget} onChange={(settings: any) =>this.props.onChangeSettings(widget.component, settings)} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    plugins: state.plugins,
    widgets: state.widgets,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onChangeSettings: (component: any, settings: any) => dispatch(changeSettings(component, settings))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);
