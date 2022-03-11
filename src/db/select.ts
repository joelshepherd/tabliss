import { DB } from "../lib";
import { db, WidgetState } from "./state";

/** Select widgets from database */
export const selectWidgets = (): WidgetState[] => {
  return Array.from(DB.prefix(db, "widget/"))
    .map(([, val]) => val)
    .filter((val): val is WidgetState => val !== null)
    .sort((a, b) => a.order - b.order);
};
