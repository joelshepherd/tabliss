import * as React from 'react';
import { Settings } from '../../interfaces';
import Image from './Image';

interface Props {
  image: string;
  onChange: (settings: Settings) => void;
}

class ImageSettings extends React.PureComponent<Props> {
  static defaultProps = Image.defaultProps;

  render() {
    return (
      <div>
        <label>
          Select image
          <input
            accept="image/*"
            type="file"
            onChange={event => event.target.files && this.loadImage(event.target.files)}
          />
        </label>

        <img src={this.props.image} style={{width: '100%', height: 'auto'}} />
      </div>
    );
  }

  private loadImage(files: FileList) {
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
