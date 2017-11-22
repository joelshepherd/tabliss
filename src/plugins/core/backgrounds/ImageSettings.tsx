import * as React from 'react';
import { Settings } from '../../interfaces';
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
    // Check for oversized
    this.setState({ oversized: files[0].size > 2097152 }); // Larger than 2mb

    // Setup file reader
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.props.onChange({
        image: reader.result,
      });
    });

    reader.readAsDataURL(files[0]);
  }
}

export default ImageSettings;
