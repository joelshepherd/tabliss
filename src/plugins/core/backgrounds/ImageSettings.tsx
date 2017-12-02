import * as React from 'react';
import { Settings } from '../../interfaces';
import { readAsDataUrl } from '../../../utils';
import Image from './Image';

interface Props {
  image: string;
  onChange: (settings: Settings) => void;
}

interface State {
  oversized?: boolean;
}

class ImageSettings extends React.PureComponent<Props, State> {
  static defaultProps = Image.defaultProps;
  state: State = {};

  render() {
    return (
      <div>
        <label>
          <input
            accept="image/*"
            type="file"
            onChange={event => event.target.files && this.loadImage(event.target.files)}
          />
        </label>

        {this.state.oversized && <p className="info">Large images may affect performance</p>}

        <img src={this.props.image} style={{width: '100%', height: 'auto'}} />
      </div>
    );
  }

  private loadImage(files: FileList) {
    const file = files[0];
    if (file) {
      // Warn for oversized images
      this.setState({ oversized: files[0].size > 2097152 }); // Larger than 2mb

      // Store data URL
      readAsDataUrl(files[0]).then(image => this.props.onChange({ image }));
    }
  }
}

export default ImageSettings;
