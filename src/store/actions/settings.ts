export function setLocale(locale: string) {
  return {
    type: 'SET_LOCALE',
    data: { locale },
  } as const;
}

export function setTimeZone(timeZone?: string) {
  return {
    type: 'SET_TIME_ZONE',
    data: { timeZone },
  } as const;
}

export function switchProfile(id: string) {
  return {
    type: 'SWITCH_PROFILE',
    data: { id },
  } as const;
}

export type SettingsActions =
  | ReturnType<typeof setLocale>
  | ReturnType<typeof setTimeZone>
  | ReturnType<typeof switchProfile>;
