import * as React from 'react';
import { Link as LinkProps, Settings } from './interfaces';
import LinkInput from './LinkInput';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class LinksSettings extends React.PureComponent<Props> {
  static defaultProps = {
    columns: 1,
    links: [
      {
        url: 'https://tabliss.io',
      },
    ],
    visible: false,
  };

  render() {
    return (
      <div className="LinksSettings">
        <label>
          Number of columns
          <input
            type="number"
            value={this.props.columns}
            onChange={event =>
              this.props.onChange({ columns: Number(event.target.value) })
            }
            min={1}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.visible}
            onChange={event =>
              this.props.onChange({ visible: !this.props.visible })
            }
          />
          Links are always visible
        </label>

        <hr />

        {this.props.links.map((link, index) => (
          <LinkInput
            {...link}
            key={index}
            number={index + 1}
            onChange={values => this.changeLink(index, values)}
            onMoveUp={
              index !== 0 ? () => this.reorderLink(link, index - 1) : undefined
            }
            onMoveDown={
              index !== this.props.links.length - 1
                ? () => this.reorderLink(link, index + 1)
                : undefined
            }
            onRemove={() => this.removeLink(index)}
          />
        ))}

        <p style={{ marginTop: '0.5rem' }}>
          <button className="button--primary" onClick={this.addLink}>
            Add link
          </button>
        </p>
      </div>
    );
  }

  private addLink = () => {
    this.props.onChange({
      links: [...this.props.links, { url: 'https://' }],
    });
  };

  private changeLink = (index: number, values: Partial<LinkProps>) => {
    this.props.onChange({
      links: [
        ...this.props.links.slice(0, index),
        {
          ...this.props.links[index],
          ...values,
        },
        ...this.props.links.slice(index + 1),
      ],
    });
  };

  private removeLink = (index: number) => {
    this.props.onChange({
      links: this.props.links.filter((link, i) => i !== index),
    });
  };

  private reorderLink = (link: LinkProps, to: number) => {
    const links = [...this.props.links];
    links.splice(to, 0, links.splice(links.indexOf(link), 1)[0]);

    this.props.onChange({ links });
  };
}

export default LinksSettings;
