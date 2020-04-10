import React, { FC } from 'react';
import { Alert } from 'reactstrap';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { defaultData, Props } from './types';

const CssSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="CssSettings">
    <InputGroup
      type="textarea"
      id="CustomCssTextarea"
      rows={3}
      style={{ fontFamily: 'monospace' }}
      value={data.input}
      onChange={event => setData({ input: event.target.value })}
    >
      CSS Snippet
    </InputGroup>

    <Alert color="warning">
      Warning: this functionality is intended for advanced users. Custom styles
      may break at any time.
    </Alert>
  </div>
);

export default CssSettings;
