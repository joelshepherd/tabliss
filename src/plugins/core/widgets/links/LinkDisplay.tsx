import * as React from 'react';
import { Link as LinkProps } from './interfaces';

interface Props extends LinkProps {
  number: number;
}

const LinkDisplay: React.StatelessComponent<Props> = (props) => (
  <a
    href={props.url}
    rel="noopener noreferrer"
    title={props.number < 10 ? 'Press ' + props.number + ' to visit' : 'Visit link'}
  >
    {props.name || displayUrl(props.url)}
  </a>
);

const displayUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
  } catch (e) {
    return url;
  }
};

export default LinkDisplay;
