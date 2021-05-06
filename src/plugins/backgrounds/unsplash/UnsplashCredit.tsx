import React, { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { UNSPLASH_UTM } from './constants';
import { ToggleLike, MouseEnterDownload, MouseLeaveDownload, MouseEnterLike, MouseLeaveLike } from './api';
import { Image } from './types';

interface Props {
  image: Image;
}

const UnsplashCredit: FC<Props> = ({ image }) => (
  <div className="credit">
    <span style={{ float: 'right' }}>{image.location_title}</span>
    <a
      onClick={ToggleLike(image)}
      onMouseEnter={MouseEnterLike(image)}
      onMouseLeave={MouseLeaveLike(image)}
      style={{ color: image.liked_color }}
    >
      {image.liked_string}
    </a>
    {' / '}
    <a
      href={image.image_link + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FormattedMessage
        id="plugins.unsplash.photoLink"
        description="Photo link text"
        defaultMessage="Photo"
      />
    </a>
    {' / '}
    <a
      href={image.user_link + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      {image.user_name}
    </a>
    {' / '}
    <a
      href={'https://unsplash.com/' + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      Unsplash
    </a>
    {' / '}
    <a
      href={image.download_link}
      onMouseEnter={MouseEnterDownload(image)}
      onMouseLeave={MouseLeaveDownload(image)}
      download
    >
      {image.download_string}
    </a>
  </div>
);

export default memo(UnsplashCredit);
