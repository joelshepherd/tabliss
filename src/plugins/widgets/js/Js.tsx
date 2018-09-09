import * as React from 'react';

interface Props {
  input?: string;
}

class Js extends React.PureComponent<Props> {
  componentDidMount() {
    this.attach();
  }

  componentDidUpdate() {
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
    var script = document.getElementById('CustomJs') as HTMLElement;

    head.removeChild(script);
  }

  private attach() {
    const head = document.head as HTMLElement;
    var script = document.createElement('script');

    script.id = 'CustomJs';
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(this.props.input || ''));

    head.appendChild(script);
  }
}

export default Js;
