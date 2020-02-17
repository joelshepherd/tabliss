import React, { FC } from 'react';

import { useSavedReducer } from '../../../hooks';
import { addLink, removeLink, reorderLink, updateLink } from './actions';
import { reducer } from './reducer';
import { Link, Props, defaultData } from './types';
import { Label, Input, CustomInput, CardLink } from 'reactstrap';
import { LinkDnD } from './LinkDnD';

const LinksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveLinks = (links: Link[]) => setData({ ...data, links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <>
      <Label>Number of columns</Label>
      <Input
        type="number"
        value={data.columns}
        onChange={event =>
          setData({ ...data, columns: Number(event.target.value) })
        }
        min={1}
      />

      <CustomInput
        type="checkbox"
        checked={data.visible}
        onChange={() => setData({ ...data, visible: !data.visible })}
        label="Links are always visible"
      />

      <LinkDnD
        data={data.links}
        move={(id, newPos) => dispatch(reorderLink(Number(id), newPos))}
        remove={id => dispatch(removeLink(Number(id)))}
        change={(id, link, values) =>
          dispatch(updateLink(id, { ...link, ...values }))
        }
      />

      <CardLink href="#" onClick={() => dispatch(addLink())}>
        Add Link
      </CardLink>
    </>
  );
};

export default LinksSettings;
