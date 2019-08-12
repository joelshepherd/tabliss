import { useMemo, useCallback } from 'react';

import { DataIntegration, Dispatch } from '../types';
import integrations from './integrations';
import { Middleware } from './types';

const defaultMiddleware: Middleware<void> = () => next => next;

export function useIntegration(
  dispatch: Dispatch,
  integration: DataIntegration,
  setIntegration: (data: DataIntegration) => void,
) {
  const data = integration.data;
  const setData = useCallback(
    (data?: unknown) => setIntegration({ ...integration, data }),
    [integration],
  );

  const config = integrations.find(({ key }) => key === integration.provider);
  const middleware = config ? config.middleware : defaultMiddleware;

  return useMemo(() => {
    return middleware({ data, dispatch, setData })(dispatch);
  }, [middleware, data, dispatch, setData]);
}
