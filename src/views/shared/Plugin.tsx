import React, { FC } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import { capture as captureException } from '../../errorHandler';
import { API } from '../../plugins';
import Crashed from './Crashed';
import { useApi } from '../../utils/useApi';

type Props = {
  id: string;
  Component: React.ComponentType<API<any, any>>;
};

const Plugin: FC<Props> = ({ id, Component }) => {
  // Create plugin API
  const api = useApi(id);

  return <Component {...api} />;
};

export default withErrorBoundary(Plugin, Crashed, captureException);