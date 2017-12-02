import * as React from 'react';
import { Link as LinkProps, Settings } from './interfaces';
import LinkInput from './LinkInput';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class LinksSettings extends React.PureComponent<Props> {
  static defaultProps = {
    links: [{
      url: 'https://tabliss.io'
    }],
    visible: true,
  };

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={this.props.visible}
            onChange={event => this.props.onChange({ visible: ! this.props.visible })}
          />
          Links are always visible
        </label>

        {this.props.links.map((link, index) => (
          <LinkInput
            {...link}
            key={index}
            number={index + 1}
            onChange={(values) => this.changeLink(index, values)}
            onRemove={() => this.removeLink(index)}
          />
        ))}

        <p><button className="button--primary" onClick={this.addLink}>
          Add new link
        </button></p>
      </div>
    );
  }

  private addLink = () => {
    this.props.onChange({
      links: [
        ...this.props.links,
        { url: 'https://' },
      ]
    });
  }

  private changeLink = (index: number, values: Partial<LinkProps>) => {
    this.props.onChange({
      links: [
        ...this.props.links.slice(0, index),
        {
          ...this.props.links[index],
          ...values,
        },
        ...this.props.links.slice(index + 1),
      ]
    });
  }

  private removeLink = (index: number) => {
    this.props.onChange({
      links: this.props.links.filter((link, i) => i !== index),
    });
  }
}

export default LinksSettings;
