import { nanoid } from "nanoid";
import { DB } from "./lib";
import { db, WidgetDisplay, State } from "./state";
import { migrate } from "./views/shared/welcomes/migrate3";

// Actions
// TODO: Move elsewhere
const createId = () => nanoid(8);

export const setBackground = (key: string): void => {
  DB.atomic(db, (db) => {
    const prev = DB.get(db, "background");
    DB.put(db, "background", {
      id: createId(),
      key,
      display: { blur: 0, luminosity: -0.2 },
    });
    DB.del(db, `data/${prev.id}`);
  });
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
  DB.atomic(db, (db) => {
    DB.put(
      db,
      "widgets",
      DB.get(db, "widgets").filter((widget) => widget.id !== id),
    );
    DB.del(db, `data/${id}`);
  });
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

// Store actions

export const resetStore = (): void => {
  DB.atomic(db, (trx) => {
    // TODO: iteration helpers
    // TODO: decide on prefix iterators on snapshots
    for (const [key] of DB.prefix(db, "")) DB.del(trx, key);
  });
};

export const importStore = (dump: unknown): void => {
  // TODO: proper validation
  if (typeof dump === "object" && dump !== null) {
    let data: Partial<State> | null = null;
    if (Object.prototype.hasOwnProperty.call(dump, "backgrounds")) {
      // Assume v2 config
      data = migrate(dump as any);
    }
    if ((dump as any).version === 3) {
      data = dump;
    }
    if (data !== null) {
      const changes = Object.entries(data);
      DB.atomic(db, (trx) => {
        for (const [key] of DB.prefix(trx, "")) DB.del(trx, key);
        changes.forEach(([key, val]) => DB.put(db, key as any, val));
      });
      return;
    }
  }
  alert("Invalid import data");
};

export const exportStore = (): string => {
  return JSON.stringify({
    ...Object.fromEntries(DB.prefix(db, "")),
    version: 3,
  });
};
