import React, { FC } from 'react';

import { Props, defaultData } from './types';
import { FormGroup, Input, Label, CustomInput } from 'reactstrap';

const GiphySettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="GiphySettings">
    <FormGroup>
      <Label for="giphyTag">Tag</Label>
      <Input
        id="giphyTag"
        type="text"
        value={data.tag}
        onChange={event => setData({ ...data, tag: event.target.value })}
      />
    </FormGroup>

    <FormGroup>
      <CustomInput
        type="checkbox"
        label="Allow NSFW"
        checked={data.nsfw}
        onChange={() => setData({ ...data, nsfw: !data.nsfw })}
      />

      <CustomInput
        type="checkbox"
        checked={data.expand}
        label="Stretch to fill screen"
        onChange={() => setData({ ...data, expand: !data.expand })}
      />
    </FormGroup>
  </div>
);

export default GiphySettings;
