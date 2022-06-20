import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Game } from "./types";

export function getPeriod(game: Game, timeZone: string | null) {
  const period = game.period;
  let periodDate = new Date(game.startTimeUTC);

  if (timeZone) {
    periodDate = utcToZonedTime(new Date(game.startTimeUTC), timeZone);
  }

  let periodStr = format(periodDate, "hh:mm a");

  if (game.isGameActivated || period.current > 0) {
    if (period.isHalftime) {
      periodStr = "Halftime";
    } else if (period.current === period.maxRegular && !game.clock) {
      periodStr = "Final";
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
