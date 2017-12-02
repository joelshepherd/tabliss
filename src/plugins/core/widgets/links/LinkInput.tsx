import * as React from 'react';
import { Link as LinkProps } from './interfaces';
import './LinkInput.sass';
const trashIcon = require('feather-icons/dist/icons/trash.svg');

interface Props extends LinkProps {
  number: number;
  onChange: (values: Partial<LinkProps>) => void;
  onRemove: () => void;
}

const LinkInput: React.StatelessComponent<Props> = (props) => (
  <div className="LinkInput">
    <label>
      {props.number < 10 ? `${props.number}. ` : ''}
      URL
      <div className="grid">
        <input
          type="url"
          value={props.url}
          onChange={event => props.onChange({ url: event.target.value })}
        />

        <button className="button--icon" onClick={props.onRemove}>
          <i dangerouslySetInnerHTML={{ __html: trashIcon }} />
        </button>
      </div>
    </label>
  </div>
);

export default LinkInput;
