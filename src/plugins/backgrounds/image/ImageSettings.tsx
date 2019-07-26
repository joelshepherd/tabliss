import React, { FC } from 'react';

import { useObjectUrls } from '../../../utils/useObjectUrl';
import { IconButton, RemoveIcon } from '../../../views/shared';
import { Props, defaultCache } from './types';
import './ImageSettings.sass';

const ImageSettings: FC<Props> = ({ cache = defaultCache, setCache }) => {
  const urls = useObjectUrls(cache);

  const addImages = (files: FileList) =>
    setCache(cache.concat(Array.from(files)));

  const removeImage = (index: number) =>
    setCache(cache.filter((_, i) => index !== i));

  const largeImages = cache.some(image => image.size > 2097152);

  return (
    <div className="ImageSettings">
      <label>
        <input
          accept="image/*"
          multiple={true}
          onChange={event =>
            event.target.files && addImages(event.target.files)
          }
          type="file"
        />
      </label>

      <div className="grid">
        {urls &&
          urls.map((url, index) => (
            <div className="preview" key={index}>
              <img src={url} />
              <IconButton
                onClick={() => removeImage(index)}
                title="Remove image"
              >
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
      </div>

      {largeImages && (
        <p className="info">Large images may affect performance</p>
      )}

      <p className="info">Images do not sync between browers.</p>
    </div>
  );
};

export default ImageSettings;
