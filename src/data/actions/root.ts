import { RESET_DASHBOARD } from '../constants';

export function resetDashboard() {
  return {
    type: RESET_DASHBOARD,
  };
}
