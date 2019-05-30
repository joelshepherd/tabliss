import * as React from 'react';
import { FallbackProps } from 'react-error-boundary';
import featherIcons from 'feather-icons';

const Crashed: React.StatelessComponent<FallbackProps> = props => (
  <div className="Crashed">
    <p>
      <i
        dangerouslySetInnerHTML={{
          __html: featherIcons.icons['alert-triangle'].toSvg(),
        }}
      />{' '}
      Sorry this plugin has crashed!
    </p>
  </div>
);

export default Crashed;
