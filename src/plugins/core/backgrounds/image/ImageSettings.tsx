import * as React from 'react';
import { Settings } from '../../../interfaces';
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
      <div className="ImageSettings">
        <label>
          <input
            accept="image/*"
            multiple={true}
            onChange={event => event.target.files && this.loadImage(event.target.files)}
            type="file"
          />
        </label>

        {this.state.oversized && <p className="info">Large images may affect performance</p>}
      </div>
    );

    // Grid of these?
    // <img src={this.props.image} style={{width: '100%', height: 'auto'}} />
  }

  private loadImage(files: FileList) {
    const images = Array.from(files);

    this.props.onChange({ images });

    this.setState({ oversized: images.some(image => image.size > 2097152) });
  }
}

export default ImageSettings;
