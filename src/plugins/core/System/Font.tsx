import * as React from 'react';

interface Props {
  family: string;
  size: number;
  weight: number;
}

class Font extends React.Component<Props> {
  static defaultProps = {
    name: 'serif',
    size: 14,
  };

  private element = document.querySelector('.Widgets') as HTMLElement;

  componentWillUnmount() {
    this.element.style.fontFamily = null;
    this.element.style.fontSize = null;
  }

  render() {
    this.element.style.fontFamily = this.props.family;
    this.element.style.fontSize = `${this.props.size}px`;

    return null;
  }
}

export default Font;
