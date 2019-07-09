import React, { FC } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import { capture as captureException } from '../../errorHandler';
import { API } from '../../plugins';
import Crashed from '../crashed/Crashed';
import { useApi } from './useApi';

type Props = {
  id: string;
  Component: React.ComponentType<API>;
};

const Plugin: FC<Props> = ({ id, Component }) => {
  // Create plugin API
  const api = useApi(id);

  return <Component {...api} />;
};

export default withErrorBoundary(Plugin, Crashed, captureException);
