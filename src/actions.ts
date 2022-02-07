import { nanoid } from "nanoid";
import { DB } from "./lib";
import { db, WidgetDisplay } from "./state";

// Actions
// TODO: Move elsewhere
const createId = () => nanoid(8);

export const resetStore = (): void => {};
export const importStore = (dump: any): void => {};
export const exportStore = (): void => {};

// TODO: transaction
export const setBackground = (key: string): void => {
  const prev = DB.get(db, "background");
  DB.put(db, "background", {
    id: createId(),
    key,
    display: { blur: 0, luminosity: -0.1 },
  });
  DB.del(db, `data/${prev.id}`);
};

// TODO: conflict resolution
export const addWidget = (key: string): void => {
  DB.put(
    db,
    "widgets",
    DB.get(db, "widgets").concat({
      id: createId(),
      key,
      display: { position: "middleCentre" },
    }),
  );
};

// TODO: conflict resolution
export const removeWidget = (id: string): void => {
  DB.put(
    db,
    "widgets",
    DB.get(db, "widgets").filter((widget) => widget.id !== id),
  );
  DB.del(db, `data/${id}`);
};

// TODO: conflict resolution
export const reorderWidget = (id: string, to: number) => {
  const widgets = Array.from(DB.get(db, "widgets"));
  const index = widgets.findIndex((widget) => widget.id === id);
  widgets.splice(to, 0, widgets.splice(index, 1)[0]);
  DB.put(db, "widgets", widgets);
};

// TODO: conflict resolution
export const setWidgetDisplay = (
  id: string,
  display: Partial<WidgetDisplay>,
) => {
  DB.put(
    db,
    "widgets",
    DB.get(db, "widgets").map((widget) =>
      widget.id === id
        ? { ...widget, display: { ...widget.display, ...display } }
        : widget,
    ),
  );
};

export const toggleFocus = () => {
  const active = DB.get(db, "focus");
  DB.put(db, "focus", !active);
};
