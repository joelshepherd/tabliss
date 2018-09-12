import * as React from 'react';
import debounce from 'lodash-es/debounce';

interface Props {
  input?: string;
}

class Js extends React.PureComponent<Props> {
  private debouncedAttach = debounce(this.attach, 500);

  componentDidMount() {
    this.attach();
  }

  componentDidUpdate() {
    this.detach();
    this.debouncedAttach();
  }

  componentWillUnmount() {
    this.detach();
  }

  render() {
    return null;
  }

  private detach() {
    const script = document.getElementById('CustomJs');

    if (script) {
      document.head.removeChild(script);
    }
  }

  private attach() {
    const script = document.createElement('script');

    script.id = 'CustomJs';
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(this.props.input || ''));

    document.head.appendChild(script);
  }
}

export default Js;
