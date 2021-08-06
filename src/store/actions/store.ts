import { DataState } from "../reducers/types";

export function resetStore(state?: DataState) {
  return {
    type: "RESET_STORE",
    data: { state },
  } as const;
}

export function setStoreError(storeError?: Error) {
  return {
    type: "SET_STORE_ERROR",
    data: { storeError },
  } as const;
}

export type StoreActions =
  | ReturnType<typeof resetStore>
  | ReturnType<typeof setStoreError>;
