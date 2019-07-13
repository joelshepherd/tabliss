import React from 'react';

import { IconButton, removeIcon } from '../../../views/shared';
import { Props } from './types';
import './ImageSettings.sass';

// @todo Needs to be rewritten to FC.
//       Also the object URLs do not work with strict mode at the moment.
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

        <p className="info">Images do not sync between browers.</p>
      </div>
    );
  }

  private loadImages(files: FileList) {
    const images = Array.from(files);

    this.props.setCache({
      images: this.images.concat(images),
    });
  }

  private removeImage(remove: File) {
    this.props.setCache({
      images: this.images.filter(image => image !== remove),
    });
  }

  private get images() {
    return this.props.cache ? this.props.cache.images : [];
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
