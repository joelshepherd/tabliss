import * as React from 'react';
import './Css.sass';

interface Props {
  input?: string;
}

class Css extends React.PureComponent<Props> {
  static defaultProps = {
    input: '',
  };

  componentDidMount() {
    this.attach();
  }

  componentDidUpdate() {
    // Need to remove the existing style element before inserting an updated one.
    this.detach();
    this.attach();
  }

  componentWillUnmount() {
    this.detach();
  }

  render() {
    return null;
  }

  private detach() {
    const head = document.head as HTMLElement;
    var style = document.getElementById('CustomCss') as HTMLElement;

    head.removeChild(style);
  }

  private attach() {
    const head = document.head as HTMLElement;
    var style = document.createElement('style');

    style.id = 'CustomCss';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(this.props.input || ''));

    head.appendChild(style);
  }
}

export default Css;
