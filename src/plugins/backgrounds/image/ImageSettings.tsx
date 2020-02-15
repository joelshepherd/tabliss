import React, { FC } from 'react';

import { useObjectUrls } from '../../../hooks';
import { RemoveIcon } from '../../../views/shared';
import { Props, defaultCache } from './types';
import './ImageSettings.sass';
import { Input, Card, CardImg } from 'reactstrap';

const ImageSettings: FC<Props> = ({ cache = defaultCache, setCache }) => {
  const urls = useObjectUrls(cache);

  const addImages = (files: FileList) =>
    setCache(cache.concat(Array.from(files)));

  const removeImage = (index: number) =>
    setCache(cache.filter((_, i) => index !== i));

  const largeImages = cache.some(image => image.size > 2097152);

  return (
    <div className="ImageSettings">
      <Input
        type="file"
        multiple={true}
        accept="image/*"
        onChange={event => event.target.files && addImages(event.target.files)}
      />

      <div className="grid">
        {urls &&
          urls.map((url, index) => (
            <Card key={index} onClick={() => removeImage(index)}>
              <CardImg width="100%" src={url} />

              <div className="delete">
                <RemoveIcon />
              </div>
            </Card>
          ))}
      </div>

      <p className="info">
        Images do not sync between browsers.{' '}
        {largeImages && 'Large images may affect performance'}
      </p>
    </div>
  );
};

export default ImageSettings;
