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
    <label>
      URL
      {props.number < 10 ? ` (Keyboard shortcut: ${props.number})` : ''}

      <div className="grid">
        <input
          type="url"
          value={props.url}
          onChange={event => props.onChange({ url: event.target.value })}
        />

        <button className="button--icon" onClick={props.onRemove}>
          <i dangerouslySetInnerHTML={{ __html: xIcon }} />
        </button>
      </div>
    </label>
  </div>
);

export default LinkInput;
