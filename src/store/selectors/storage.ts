import { RootState } from '../store';

export function storage(id: string) {
  return (state: RootState) => {
    const storage = state.profile.storage.find(s => s.id === id);

    if (!storage) {
      throw new Error('Unable to find plugin storage');
    }

    return storage;
  };
}
