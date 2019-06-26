import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import { capture as captureException } from '../errorHandler';
import Crashed from '../components/crashed/Crashed';
import { getPlugin } from '../plugins';
import { RootState } from '../store/store';
import { activeProfile } from '../store/selectors/activeProfile';

type Props = {
  id: string;
};

const Plugin = ({ id }: Props) => {
  // @todo Not make this suck
  const { data, type } = useSelector(
    (state: RootState) =>
      activeProfile(state).storage.find(storage => storage.id === id)!,
  );

  const { Dashboard } = getPlugin(type);

  // Plugin API this
  const props = { data };

  return <Dashboard {...props} />;
};

export default withErrorBoundary(Plugin, Crashed, captureException);
