import { State } from "../../../state";
import { Version2Config } from "./migrate";

export function migrate(version2Config: Version2Config): Partial<State> {
  return {
    background: version2Config.backgrounds.find(
      (background) => background.active,
    ),
    ...Object.fromEntries(
      version2Config.widgets.map((widget, index) => [
        `widget/${widget.id}`,
        { ...widget, order: index },
      ]),
    ),
    ...Object.fromEntries(
      Object.entries(version2Config.data).map(([key, val]) => [
        `data/${key}`,
        val,
      ]),
    ),
    ...(version2Config.locale ? { locale: version2Config.locale } : {}),
    timeZone: version2Config.timeZone ?? null,
    focus: false,
  };
}
