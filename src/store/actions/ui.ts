export function popLoader() {
  return {
    type: "POP_LOADER",
  } as const;
}

export function pushLoader() {
  return {
    type: "PUSH_LOADER",
  } as const;
}

export function toggleFocus() {
  return {
    type: "TOGGLE_FOCUS",
  } as const;
}

export function toggleSettings() {
  return {
    type: "TOGGLE_SETTINGS",
  } as const;
}

export type UiActions =
  | ReturnType<typeof popLoader>
  | ReturnType<typeof pushLoader>
  | ReturnType<typeof toggleFocus>
  | ReturnType<typeof toggleSettings>;
