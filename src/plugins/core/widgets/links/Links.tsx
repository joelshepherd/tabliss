import * as React from 'react';
import { Settings } from './interfaces';
import LinkDisplay from './LinkDisplay';
import './Links.sass';

class Links extends React.PureComponent<Settings> {
  static defaultProps = {
    links: [{
      url: 'https://tabliss.io'
    }],
  };

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <div className="Links">
        {this.props.links.map((link, index) => <LinkDisplay key={index} number={index + 1} {...link} />)}
      </div>
    );
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const key = event.keyCode - 49; // Starting at 1

    if (this.props.links[key]) {
      window.location.assign(this.props.links[key].url);
    }
  }
}

export default Links;
