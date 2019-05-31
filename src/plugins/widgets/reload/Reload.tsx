import * as React from 'react';

interface Props {
  input?: number;
}

class Reload extends React.PureComponent<Props> {
  static defaultProps = {
    input: 15,
  };
  timeOut: ReturnType<typeof setTimeout>;

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
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  private attach() {
    if (this.props.input) {
      this.timeOut = setTimeout(
        () => location.reload(),
        this.props.input * 60000
      );
    }
  }
}

export default Reload;
