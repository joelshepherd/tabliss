import icons from 'feather-icons/dist/icons.json';
import React, { FC, useState } from 'react';
import {
  ButtonDropdown,
  Card,
  CardBody,
  CardLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from 'reactstrap';

import { useToggle } from '../../../hooks';
import { Icon } from '../../../views/shared';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { Link } from './types';

type Props = Link & {
  number: number;
  onChange: (values: Partial<Link>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const LinkInput: FC<Props> = props => {
  const [iconDropdown, toggleIconDropdown] = useToggle(false);
  const [iconSearchTerm, setIconSearchTerm] = useState('');

  return (
    <>
      <Card>
        <CardBody>
          <h5>
            {props.number <= 9
              ? `Keyboard shortcut ${props.number}`
              : 'Shortcut'}
          </h5>

          <InputGroup
            type="url"
            value={props.url}
            onChange={event => props.onChange({ url: event.target.value })}
          >
            URL
          </InputGroup>

          <InputGroup
            type="text"
            value={props.name}
            onChange={event => props.onChange({ name: event.target.value })}
          >
            Name <span className="text-secondary">(optional)</span>
          </InputGroup>

          <ButtonDropdown
            isOpen={iconDropdown}
            toggle={toggleIconDropdown}
            style={{ width: '100%', position: 'relative' }}
          >
            <DropdownToggle caret>Icon (optional)</DropdownToggle>
            <DropdownMenu
              style={{
                maxHeight: '300px',
                overflowY: 'scroll',
                position: 'absolute',
              }}
            >
              <DropdownItem header>
                <Input
                  type="text"
                  placeholder="Search"
                  value={iconSearchTerm}
                  onChange={e => setIconSearchTerm(e.target.value)}
                />
              </DropdownItem>

              <DropdownItem
                onClick={() => props.onChange({ icon: '' })}
                active={props.icon === '' || !props.icon ? true : false}
              >
                None
              </DropdownItem>

              {iconList.map(key => {
                if (key.indexOf(iconSearchTerm) > -1)
                  return (
                    <DropdownItem
                      className="icon-grid"
                      onClick={() => props.onChange({ icon: key })}
                      active={props.icon === key ? true : false}
                    >
                      <>
                        <Icon name={key} />
                        <span>{key}</span>
                      </>
                    </DropdownItem>
                  );
                else return;
              })}
            </DropdownMenu>
          </ButtonDropdown>

          <br />

          <CardLink href="#" onClick={props.onRemove}>
            Delete
          </CardLink>
        </CardBody>
      </Card>

      <div className="LinkInput" />
    </>
  );
};

export default LinkInput;
