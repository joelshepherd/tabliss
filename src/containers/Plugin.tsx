import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';

import Crashed from '../components/crashed/Crashed';
import { capture as captureException } from '../errorHandler';
import { getPlugin, API } from '../plugins';
import { pluginStorage } from '../store/selectors/pluginStorage';
import { setData } from '../store/actions/profile';

type Props = {
  id: string;
  display?: 'dashboard' | 'settings';
};

const Plugin: React.FC<Props> = ({ id, display = 'dashboard' }) => {
  const { data, type } = useSelector(pluginStorage(id));
  const { Dashboard, Settings } = getPlugin(type);

  // Plugin API this
  const api = useApi(id);
  const props: API<unknown, unknown> = {
    ...api,
    data,
  };

  if (display === 'dashboard') return <Dashboard {...props} />;
  if (Settings) return <Settings {...props} />;

  return null;
};

export default withErrorBoundary(Plugin, Crashed, captureException);

function useApi(id: string) {
  const dispatch = useDispatch();

  const setDataAction = React.useCallback(
    (state: unknown) => dispatch(setData(id, state)),
    [dispatch],
  );

  return {
    setData: setDataAction,
  };
}
