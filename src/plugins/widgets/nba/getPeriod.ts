import { format } from 'date-fns';
import { Game } from './types';

export function getPeriod(game: Game) {
  const period = game.period;
  let periodStr = format(new Date(game.startTimeUTC), 'hh:mm a');

  if (game.isGameActivated || period.current > 0) {
    if (period.isHalftime) {
      periodStr = 'Halftime';
    } else if (period.current === period.maxRegular && !game.clock) {
      periodStr = 'Final';
    } else if (period.isEndOfPeriod) {
      periodStr = `End of ${period.current}Q`;
    } else if (period.current <= 4) {
      periodStr = `${period.current}Q ${game.clock} `;
    } else {
      periodStr = `OT ${game.clock}`;
    }
  }

  return periodStr;
}
