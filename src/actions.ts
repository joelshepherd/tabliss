import { nanoid } from "nanoid";
import { DB } from "./lib";
import { db, WidgetDisplay, State, cache, WidgetState } from "./state";
import { migrate } from "./views/shared/welcomes/migrate3";

export const createId = (): string => nanoid(12);

// Background actions

/** Change the background */
export const setBackground = (key: string): void => {
  const prev = DB.get(db, "background");
  DB.atomic(db, (trx) => {
    const id = createId();
    DB.put(trx, "background", {
      id,
      key,
      display: { blur: 0, luminosity: -0.2 },
    });
    DB.del(trx, `data/${prev.id}`);
  });
  DB.del(cache, prev.id);
};

// Widget actions

/** Add a new widget */
export const addWidget = (key: string): void => {
  const id = createId();
  // TODO: iterator helpers
  const order = Array.from(DB.prefix(db, "widget/"))
    .filter((pair) => pair[1] !== null)
    .reduce((prev, [, widget]) => Math.max(prev, widget!.order + 1), 0);

  DB.put(db, `widget/${id}`, {
    id,
    key,
    order,
    display: { position: "middleCentre" },
  });
};

/** Remove a widget */
export const removeWidget = (id: string): void => {
  DB.atomic(db, (trx) => {
    DB.put(trx, `widget/${id}`, null);
    DB.del(trx, `data/${id}`);
  });
  DB.del(cache, id);
};

/** Reorder a widget */
export const reorderWidget = (id: string, to: number): void => {
  // TODO: find a better algorithm for this
  const widgets: [`widget/${string}`, WidgetState][] = Array.from(
    DB.prefix(db, "widget/"),
  ).filter((pair) => pair[1] !== null) as any;
  widgets.sort((a, b) => a[1].order - b[1].order);
  const index = widgets.findIndex(([, widget]) => widget.id === id);
  widgets.splice(to, 0, widgets.splice(index, 1)[0]);

  DB.atomic(db, (trx) => {
    widgets.forEach(([key, widget], order) =>
      DB.put(trx, key, { ...widget, order }),
    );
  });
};

/** Set display properties of a widget */
export const setWidgetDisplay = (
  id: string,
  display: Partial<WidgetDisplay>,
) => {
  const widget = DB.get(db, `widget/${id}`);
  if (!widget) throw new Error("Widget not found");

  DB.put(db, `widget/${id}`, {
    ...widget,
    display: {
      ...widget.display,
      ...display,
    },
  });
};

// UI actions

/** Toggle dashboard focus mode */
export const toggleFocus = () => {
  const active = DB.get(db, "focus");
  DB.put(db, "focus", !active);
};

// Store actions

/** Reset the database */
export const resetStore = (): void => {
  DB.atomic(db, (trx) => {
    // TODO: iteration helpers
    // TODO: decide on prefix iterators on snapshots
    for (const [key] of DB.prefix(trx, "")) DB.del(trx, key);
  });
};

/** Import database from a dump */
export const importStore = (dump: unknown): void => {
  // TODO: needs a good work over
  // TODO: proper validation
  if (typeof dump === "object" && dump !== null) {
    resetStore();
    let data: Partial<State> | null = null;
    if (Object.prototype.hasOwnProperty.call(dump, "backgrounds")) {
      // Assume v2 config
      data = migrate(dump as any);
      DB.put(db, `widget/default-time`, null);
      DB.put(db, `widget/default-greeting`, null);
    }
    if ((dump as any).version === 3) {
      data = dump;
    }
    if (data !== null) {
      const changes = Object.entries(data);
      DB.atomic(db, (trx) => {
        // @ts-ignore
        changes.forEach(([key, val]) => DB.put(trx, key, val));
      });
      // @ts-ignore
      for (const [key] of DB.prefix(cache, "")) DB.del(cache, key);
      return;
    }
  }
  alert("Invalid import data");
};

/** Export a database dump */
export const exportStore = (): string => {
  return JSON.stringify({
    ...Object.fromEntries(DB.prefix(db, "")),
    version: 3,
  });
};
