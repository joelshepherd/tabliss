import { Data } from '../types';
import { useAsana } from './asana/useAsana';

export function useIntegration(
  integration: Data['integration'],
  setIntegration: (data: Data['integration']) => void,
  setTasks: (tasks: any[]) => void,
) {
  const data = integration.data;
  const setData = (data?: unknown) => setIntegration({ ...integration, data });

  switch (data.provider) {
    case 'asana':
      return useAsana(data, setData, setTasks);
  }
}
