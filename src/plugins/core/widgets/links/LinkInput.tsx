import * as React from 'react';
import { Link as LinkProps } from './interfaces';
import './LinkInput.sass';
const xIcon = require('feather-icons/dist/icons/x.svg');

interface Props extends LinkProps {
  number: number;
  onChange: (values: Partial<LinkProps>) => void;
  onRemove: () => void;
}

const LinkInput: React.StatelessComponent<Props> = (props) => (
  <div className="LinkInput">
    <h5>
      <div className="title--buttons">
        <button className="button--icon" onClick={props.onRemove}>
          <i dangerouslySetInnerHTML={{ __html: xIcon }} />
        </button>
      </div>

      {props.number <= 9 ? `Keyboard shortcut ${props.number}` : 'Shortcut'}
    </h5>

    <label>
      URL*
      <input
        type="url"
        value={props.url}
        onChange={event => props.onChange({ url: event.target.value })}
      />
    </label>

    <label>
      Name <span className="text--grey">(optional)</span>
      <input
        type="text"
        value={props.name}
        onChange={event => props.onChange({ name: event.target.value })}
      />
    </label>

    <hr />
  </div>
);

export default LinkInput;
