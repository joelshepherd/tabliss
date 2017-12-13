import * as React from 'react';
import { Settings } from '../../../interfaces';
import './ImageSettings.sass';

interface Props {
  image?: string;
  images: File[];
  onChange: (settings: Settings) => void;
}

interface State {
  oversized?: boolean;
}

class ImageSettings extends React.PureComponent<Props, State> {
  static defaultProps = {
    images: [],
  };
  state: State = {};
  currentUrls: string[] = [];

  render() {
    // Clear current object URLs
    this.revokeCurrentURLs();

    return (
      <div className="ImageSettings">
        {this.props.image &&
          <p className="info">
            Sorry for making you have to upload your image again.
            But you can have multiple images now! So yay?
          </p>
        }

        <label>
          <input
            accept="image/*"
            multiple={true}
            onChange={event => event.target.files && this.loadImages(event.target.files)}
            type="file"
          />
        </label>

        {this.state.oversized && <p className="info">Large images may affect performance</p>}

        <div className="grid">
          {this.props.images.map(image => (
            // @TODO Add remove button
            <img src={this.createURL(image)} />
          ))}
        </div>
      </div>
    );
  }

  private loadImages(files: FileList) {
    const images = Array.from(files);

    this.props.onChange({
      images,
      image: undefined,
    });

    // Show warning for oversized images.
    this.setState({ oversized: images.some(image => image.size > 2097152) });
  }

  private createURL(blob: Blob) {
    const url = URL.createObjectURL(blob);
    this.currentUrls.push(url);

    return url;
  }

  private revokeCurrentURLs() {
    this.currentUrls.forEach(URL.revokeObjectURL);
    this.currentUrls = [];
  }
}

export default ImageSettings;
