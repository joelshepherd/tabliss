import React, { FC } from 'react';
import { CardLink, CustomInput } from 'reactstrap';

import { useSavedReducer } from '../../../hooks';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { addLink, removeLink, reorderLink, updateLink } from './actions';
import { reducer } from './reducer';
import { defaultData, Link, Props } from './types';
import LinkInput from './Input';

import './LinksSettings.sass';

const LinksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveLinks = (links: Link[]) => setData({ ...data, links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <>
      <InputGroup
        type="number"
        value={data.columns}
        onChange={(event) =>
          setData({ ...data, columns: Number(event.target.value) })
        }
        min={1}
        label="Number of columns"
      />

      <CustomInput
        type="checkbox"
        checked={data.visible}
        id="linkVisibilityCheckbox"
        label="Links are always visible"
        onChange={() => setData({ ...data, visible: !data.visible })}
      />

      {data.links.map((link, i) => (
        <LinkInput
          {...link}
          key={i}
          index={i}
          number={i + 1}
          onRemove={() => dispatch(removeLink(Number(i)))}
          onChange={(values) => dispatch(updateLink(i, { ...link, ...values }))}
          onMoveUp={i !== 0 ? () => dispatch(reorderLink(i, i - 1)) : undefined}
          onMoveDown={
            i !== data.links.length - 1
              ? () => dispatch(reorderLink(i, i + 1))
              : undefined
          }
        />
      ))}

      <CardLink href="#" onClick={() => dispatch(addLink())}>
        Add Link
      </CardLink>
    </>
  );
};

export default LinksSettings;
