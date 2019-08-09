import { useMemo } from 'react';

import { DataIntegration, Dispatch } from '../types';
import integrations from './integrations';

export function useIntegration(
  dispatch: Dispatch,
  integration: DataIntegration,
  setIntegration: (data: DataIntegration) => void,
): Dispatch {
  const data = integration.data;
  const setData = (data?: unknown) => setIntegration({ ...integration, data });

  const config = integrations.find(({ key }) => key === integration.provider);

  return useMemo(
    () =>
      config
        ? config.middleware({ data, dispatch, setData })(dispatch)
        : dispatch,
    [config, data, dispatch],
  );
}
