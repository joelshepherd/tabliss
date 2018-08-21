import * as React from 'react';
import { isInputEvent } from '../../../utils';
import { Settings } from './interfaces';
import LinkDisplay from './LinkDisplay';
import './Links.sass';
const linkIcon = require('feather-icons/dist/icons/link-2.svg');

interface State {
  visible: boolean;
}

class Links extends React.PureComponent<Settings, State> {
  static defaultProps = {
    columns: 1,
    links: [{ url: 'https://tabliss.io' }],
    visible: false,
  };
  state = {
    visible: false,
  };

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <div className="Links" style={{ gridTemplateColumns: '1fr '.repeat(this.props.columns) }}>
        {! this.props.visible && ! this.state.visible && (
          <a onClick={() => this.setState({ visible: true })} title="Show quick links">
            <i dangerouslySetInnerHTML={{ __html: linkIcon }} />
          </a>
        )}
        {(this.props.visible || this.state.visible) && this.props.links.map((link, index) => (
          <LinkDisplay key={index} number={index + 1} {...link} />
        ))}
      </div>
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    // Check for input focus
    if (isInputEvent(event)) {
      return;
    }

    const key = event.keyCode - 49; // Starting at 1
    if (this.props.links[key]) {
      window.location.assign(this.props.links[key].url);
    }
  }
}

export default Links;
