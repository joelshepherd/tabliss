import * as React from 'react';
import { connect } from 'react-redux';
import './Widgets.css';

interface Props {
  widgets: [{
    component: any;
    settings: any;
  }];
}

class Widgets extends React.Component<Props> {
  render() {
    return (
      <div className="Widgets">
        {this.props.widgets.map((widget, key) =>
          <widget.component key={key} {...widget.settings} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { widgets: state.widgets };
}

export default connect(mapStateToProps)(Widgets as any);
