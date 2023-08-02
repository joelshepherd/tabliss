import { useTime } from "./useTime";

export function useIsNight() {
  const time = useTime();
  const currentHour = time.getHours();

  // Return true if the current hour is between 9 PM (21:00) and 5 AM (05:00)
  return currentHour >= 21 || currentHour < 5;
}
