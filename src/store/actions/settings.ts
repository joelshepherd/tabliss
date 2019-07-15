export function setLocale(locale: string) {
  return {
    type: 'SET_LOCALE',
    data: { locale },
  } as const;
}

export type SettingsActions = ReturnType<typeof setLocale>;
