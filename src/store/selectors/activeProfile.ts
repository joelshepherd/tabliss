import { ProfileState } from '../reducers/profile';
import { RootState } from '../store';

export function activeProfile({ profiles }: RootState): ProfileState {
  const profile = profiles.profiles.find(
    profile => profile.id === profiles.activeId,
  );

  if (!profile) {
    throw new Error('Selected profile not found');
  }

  return profile;
}
