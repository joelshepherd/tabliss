import { nanoid } from "nanoid";
import { DB } from "./lib";
import { db } from "./state";

// Actions
// TODO: Move elsewhere
const createId = () => nanoid(8);

export const resetStore = (): void => {};
export const importStore = (dump: any): void => {};
export const exportStore = (): void => {};

// TODO: transaction
export const setBackground = (key: string): void => {
  const oldId = DB.get(db, "background");
  const id = createId();
  DB.put(db, `data/${id}`, {
    id,
    key,
    display: { blur: 0, luminosity: -0.1 },
  });
  DB.put(db, "background", id);
  DB.del(db, `data/${oldId}`);
};

// TODO: conflict resolution
export const addWidget = (key: string): void => {
  const id = createId();
  DB.put(db, `data/${id}`, {
    id,
    key,
    display: { position: "middleCentre" },
  });
  DB.put(db, "widgets", Array.from(DB.get(db, "widgets")).concat(id));
};

// TODO: conflict resolution
export const removeWidget = (id: string): void => {
  const widgets = DB.get(db, "widgets");
  DB.put(
    db,
    "widgets",
    widgets.filter((i) => i !== id),
  );
  DB.del(db, `data/${id}`);
};

// TODO: conflict resolution
export const reorderWidget = (id: string, to: number) => {
  const widgets = Array.from(DB.get(db, "widgets"));
  const index = widgets.findIndex((widget) => widget === id);
  widgets.splice(to, 0, widgets.splice(index, 1)[0]);
  DB.put(db, "widgets", widgets);
};

export const toggleFocus = () => {
  const active = DB.get(db, "focus");
  DB.put(db, "focus", !active);
};
