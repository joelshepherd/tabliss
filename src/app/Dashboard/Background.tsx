import * as React from 'react';
import { connect } from 'react-redux';
import './Background.css';

interface Props {
  component: any; // @TODO How to define as a react component?
  settings: {
    [key: string]: any;
  };
}

class Background extends React.Component<Props> {
  render() {
    return <this.props.component {...this.props.settings} />;
  }
}

const mapStateToProps = (state: any) => {
  return { ...state.background };
}

export default connect(mapStateToProps)(Background);
