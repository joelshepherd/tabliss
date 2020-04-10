import React, { FC } from 'react';
import { CardLink, CustomInput } from 'reactstrap';

import { useSavedReducer } from '../../../hooks';
import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { addLink, removeLink, reorderLink, updateLink } from './actions';
import { LinkDnD } from './LinkDnD';
import './LinksSettings.sass';
import { reducer } from './reducer';
import { defaultData, Link, Props } from './types';

const LinksSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const saveLinks = (links: Link[]) => setData({ ...data, links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <>
      <InputGroup
        type="number"
        value={data.columns}
        onChange={event =>
          setData({ ...data, columns: Number(event.target.value) })
        }
        min={1}
        label="Number of columns"
      />

      <CustomInput
        type="checkbox"
        checked={data.visible}
        id="link-visibility-checkbox"
        label="Links are always visible"
        onChange={() => setData({ ...data, visible: !data.visible })}
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
