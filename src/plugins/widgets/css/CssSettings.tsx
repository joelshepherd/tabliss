import React, { FC } from 'react';
import { Alert } from 'reactstrap';

import { InputGroup } from '../../../views/shared';
import { defaultData, Props } from './types';

const CssSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <InputGroup
      rows={3}
      type="textarea"
      value={data.input}
      label="CSS Snippet"
      id="CustomCssTextarea"
      style={{ fontFamily: 'monospace' }}
      onChange={event => setData({ input: event.target.value })}
    />

    <Alert color="warning">
      Warning: this functionality is intended for advanced users. Custom styles
      may break at any time.
    </Alert>
  </div>
);

export default CssSettings;
