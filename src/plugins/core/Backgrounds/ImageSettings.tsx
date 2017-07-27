import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  image: string;
  onChange: (settings: Settings) => void;
}

class ImageSettings extends React.Component<Props> /* implements Plugin - Not working because static */ {
  static defaultProps = {
    image: '',
  };

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
