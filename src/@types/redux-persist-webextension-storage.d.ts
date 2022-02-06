declare module "redux-persist-webextension-storage" {
  import { Storage } from "redux-persist";

  export const localStorage: Storage;
  export const syncStorage: Storage;
}
