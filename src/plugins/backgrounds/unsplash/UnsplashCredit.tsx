import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { UNSPLASH_UTM } from './constants';
import { Image } from './interfaces';

interface Props {
  image: Image;
}

const UnsplashCredit: React.StatelessComponent<Props> = (props) => (
  <div className="credit">
    <span style={{float: 'right'}}>
      {props.image.location_title}
    </span>

    <a
      href={props.image.image_link + UNSPLASH_UTM}
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
      href={props.image.user_link + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.image.user_name}
    </a>
    {' / '}
    <a
      href={'https://unsplash.com/' + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      Unsplash
    </a>
  </div>
);

export default UnsplashCredit;
