import * as React from 'react';

interface Props {
  input?: string;
}

class Css extends React.PureComponent<Props> {
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
    const style = document.getElementById('CustomCss');

    if (style) {
      document.head.removeChild(style);
    }
  }

  private attach() {
    const style = document.createElement('style');

    style.id = 'CustomCss';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(this.props.input || ''));

    document.head.appendChild(style);
  }
}

export default Css;
