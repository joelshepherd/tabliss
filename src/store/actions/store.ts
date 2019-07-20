export function migrateStore(state: any) {
  return {
    type: 'MIGRATE_STORE',
    data: state,
  } as const;
}

export function resetStore() {
  return {
    type: 'RESET_STORE',
  } as const;
}

export type StoreActions =
  | ReturnType<typeof migrateStore>
  | ReturnType<typeof resetStore>;
