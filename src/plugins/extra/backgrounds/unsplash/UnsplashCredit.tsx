import * as React from 'react';
import { UNSPLASH_UTM } from './constants';
import { Image } from './interfaces';
const playIcon = require('feather-icons/dist/icons/play.svg');
const pauseIcon = require('feather-icons/dist/icons/pause.svg');

interface Props {
  image: Image;
  paused: boolean;
  pause: () => void;
  play: () => void;
}

const UnsplashCredit: React.StatelessComponent<Props> = (props) => (
  <div className="credit">
    <span style={{float: 'right'}}>
      {props.image.location_title} &emsp;
      {props.paused
        ? <a onClick={props.play} title="Resume new images">
            <i dangerouslySetInnerHTML={{ __html: playIcon }} />
          </a>
        : <a onClick={props.pause} title="Pause on this image">
            <i dangerouslySetInnerHTML={{ __html: pauseIcon }} />
          </a>
      }
    </span>

    <a
      href={props.image.image_link + UNSPLASH_UTM}
      rel="noopener noreferrer"
      target="_blank"
    >
      Photo
    </a>
    {' by '}
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
