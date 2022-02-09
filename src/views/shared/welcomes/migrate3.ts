import { State } from "../../../state";
import { Version2Config } from "./migrate";

export function migrate(version2Config: Version2Config): Partial<State> {
  const background = version2Config.backgrounds.find(
    (background) => background.active,
  );
  if (!background) throw "TODO";
  return {
    focus: false,
    background,
    widgets: version2Config.widgets,
    ...Object.fromEntries(
      Object.entries(version2Config.data).map(([key, val]) => [
        `data/${key}`,
        val,
      ]),
    ),
    ...(version2Config.locale ? { locale: version2Config.locale } : {}),
    timeZone: version2Config.timeZone ?? null,
  };
}
