import * as React from 'react';
import { Settings } from '../../interfaces';
const giphyLogo = require('./giphy-logo.png');

interface Props {
  onChange: (settings: Settings) => void;
}

class GiphySettings extends React.Component<Props> {
  render() {
    return (
      <div>
        <img src={giphyLogo} />
      </div>
    );
  }
}

export default GiphySettings;
