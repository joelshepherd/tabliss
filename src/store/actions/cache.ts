export function setCache(id: string, cache?: object) {
  return {
    type: 'SET_CACHE',
    payload: { id, cache },
  } as const;
}

export type CacheActions = ReturnType<typeof setCache>;
