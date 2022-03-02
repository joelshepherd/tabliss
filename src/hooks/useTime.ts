import { useContext } from "react";

import { TimeContext } from "../contexts/time";

export function useTime(type: "absolute" | "zoned" = "zoned") {
  return useContext(TimeContext)[type];
}
