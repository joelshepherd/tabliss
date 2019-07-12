import React from 'react';

import { IconButton, removeIcon } from '../../../views/shared';
import { Props } from './types';
import './ImageSettings.sass';

class ImageSettings extends React.Component<Props> {
  currentUrls: string[] = [];

  render() {
    // Clear current object URLs
    this.revokeCurrentURLs();

    return (
      <div className="ImageSettings">
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
          {this.images.map((image, index) => (
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
    // Need to sort localstorage only accept top-level keys for blobs though.
    const images = Array.from(files);

    this.props.setData({
      images: this.images.concat(images),
    });
  }

  private removeImage(remove: File) {
    this.props.setData({
      images: this.images.filter(image => image !== remove),
    });
  }

  private get images() {
    return this.props.data ? this.props.data.images : [];
  }

  private get oversized() {
    // Are any images over 2 mb?
    return this.images.some(image => image.size > 2097152);
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
