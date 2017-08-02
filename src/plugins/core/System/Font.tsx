import * as React from 'react';

interface Props {
  colour: string;
  family: string;
  size: number;
}

class Font extends React.Component<Props> {
  static defaultProps = {
    colour: '#ffffff',
    family: 'serif',
    size: 14,
  };

  private element = document.querySelector('.Widgets') as HTMLElement;

  componentWillUnmount() {
    this.element.style.fontFamily = null;
    this.element.style.fontSize = null;
    this.element.style.color = null;
  }

  render() {
    this.element.style.fontFamily = this.props.family;
    this.element.style.fontSize = `${this.props.size}px`;
    this.element.style.color = this.props.colour;

    return null;
  }
}

export default Font;
