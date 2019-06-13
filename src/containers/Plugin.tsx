import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import { capture as captureException } from '../errorHandler';
import Crashed from '../components/crashed/Crashed';
import { getPlugin } from '../plugins';
import { RootState } from '../store/store';

type Props = {
  type: string;
};

const Plugin = ({ type }: Props) => {
  const { Dashboard } = getPlugin(type);

  // @todo Not make this suck
  const { data, position } = useSelector(
    (state: RootState) =>
      state.profiles.profiles[0].storage.find(({ key }) => key === type)!,
  );

  // Plugin API this
  const props = { data };

  return <Dashboard {...props} />;
};

export default withErrorBoundary(Plugin, Crashed, captureException);
