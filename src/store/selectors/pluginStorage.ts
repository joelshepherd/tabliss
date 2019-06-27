import { RootState } from '../store';
import { activeProfile } from './activeProfile';

export function pluginStorage(id: string) {
  return (state: RootState) => {
    const storage = activeProfile(state).storage.find(s => s.id === id);

    if (!storage) {
      throw new Error('Unable to find plugin storage');
    }

    return storage;
  };
}
