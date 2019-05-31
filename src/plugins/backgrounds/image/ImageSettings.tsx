import React from 'react';
import { IconButton, removeIcon } from '../../../app/ui';
import { Settings } from '../../interfaces';
import './ImageSettings.sass';

interface Props {
  image?: string;
  images: Blob[];
  onChange: (settings: Settings) => void;
}

class ImageSettings extends React.PureComponent<Props> {
  static defaultProps = {
    images: [],
  };
  currentUrls: string[] = [];

  render() {
    // Clear current object URLs
    this.revokeCurrentURLs();

    return (
      <div className="ImageSettings">
        {this.props.image && (
          <p className="info">
            Sorry for making you have to upload your image again. But you can
            have multiple images now! So yay?
          </p>
        )}

        <label>
          <input
            accept="image/*"
            multiple={true}
            onChange={event =>
              event.target.files && this.loadImages(event.target.files)
            }
            type="file"
          />
        </label>

        <div className="grid">
          {this.props.images.map((image, index) => (
            <div className="preview" key={index}>
              <img src={this.createURL(image)} />
              <IconButton
                onClick={() => this.removeImage(image)}
                title="Remove image"
              >
                {removeIcon}
              </IconButton>
            </div>
          ))}
        </div>

        {this.oversized && (
          <p className="info">Large images may affect performance</p>
        )}
      </div>
    );
  }

  private loadImages(files: FileList) {
    // Strip File to Blob so localForage doesn't get confused about its storage in localstorage.
    // Still need to sort localstorage only accept top-level keys for blobs though.
    const images = Array.from(files).map(
      image => new Blob([image], { type: image.type }),
    );

    this.props.onChange({
      images: this.props.images.concat(images),
      image: undefined, // Clean legacy settings
    });
  }

  private removeImage(remove: Blob) {
    this.props.onChange({
      images: this.props.images.filter(image => image !== remove),
    });
  }

  private get oversized() {
    // Are any images over 2 mb?
    return this.props.images.some(image => image.size > 2097152);
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
