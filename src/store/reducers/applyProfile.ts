import { Actions } from '../actions';
import { RootState, activeProfileSelector } from '../store';
import { profile } from './profile';

export function applyProfile(state: RootState, action: Actions): RootState {
  const active = activeProfileSelector(state);
  const reduced = profile(active, action);

  return active === reduced
    ? state
    : {
        ...state,
        profiles: state.profiles.map(current =>
          current.id === reduced.id ? reduced : current,
        ),
      };
}
