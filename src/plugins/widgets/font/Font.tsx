import React from 'react';
import './Font.sass';

interface Props {
  colour?: string;
  family?: string;
  size?: number;
  weight?: number;
}

const classNames = [
  'weight--',
  'weight--100',
  'weight--300',
  'weight--400',
  'weight--500',
  'weight--700',
  'weight--900',
];

class Font extends React.PureComponent<Props> {
  static defaultProps = {
    colour: '#ffffff',
    family: '',
    size: 28,
    weight: 400,
  };

  componentDidMount() {
    this.attach();
  }

  componentDidUpdate() {
    this.attach();
  }

  componentWillUnmount() {
    this.detach();
  }

  render() {
    return null;
  }

  private detach() {
    const element = document.querySelector('.Widgets') as HTMLElement;

    element.style.fontFamily = null;
    element.style.fontSize = null;
    element.style.color = null;

    element.classList.remove(...classNames);
  }

  private attach() {
    const element = document.querySelector('.Widgets') as HTMLElement;

    element.style.fontFamily = this.props.family || null;
    element.style.fontSize = this.props.size ? `${this.props.size}px` : null;
    element.style.color = this.props.colour || null;

    element.classList.remove(...classNames);
    element.classList.add(`weight--${this.props.weight}`);
  }
}

export default Font;
