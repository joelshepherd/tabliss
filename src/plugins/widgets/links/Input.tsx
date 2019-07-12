import featherIcons from 'feather-icons';
import React from 'react';
import {
  arrowUpIcon,
  arrowDownIcon,
  IconButton,
  removeIcon,
} from '../../../views/shared';
import { Link as LinkProps } from './types';

interface Props extends LinkProps {
  number: number;
  onChange: (values: Partial<LinkProps>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Input: React.StatelessComponent<Props> = props => (
  <div className="LinkInput">
    <h5>
      <div className="title--buttons">
        <IconButton onClick={props.onRemove} title="Remove link">
          {removeIcon}
        </IconButton>
        {props.onMoveDown !== undefined && (
          <IconButton onClick={props.onMoveDown} title="Move link down">
            {arrowDownIcon}
          </IconButton>
        )}
        {props.onMoveUp !== undefined && (
          <IconButton onClick={props.onMoveUp} title="Move link up">
            {arrowUpIcon}
          </IconButton>
        )}
      </div>

      {props.number <= 9 ? `Keyboard shortcut ${props.number}` : 'Shortcut'}
    </h5>

    <label>
      URL
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

    <label>
      Icon <span className="text--grey">(optional)</span>
      <select
        value={props.icon}
        onChange={event => props.onChange({ icon: event.target.value })}
      >
        <option value={''}>None</option>
        {Object.keys(featherIcons.icons).map(key => (
          <option key={key}>{key}</option>
        ))}
      </select>
    </label>

    <hr />
  </div>
);

export default Input;
