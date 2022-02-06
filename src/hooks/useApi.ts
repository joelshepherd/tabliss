import { useContext } from "react";
import { UiContext } from "../contexts/ui";
import { useKey } from "../lib/db/react";
import { API } from "../plugins";
import { cache as cacheDb, db } from "../state";

export function useApi(id: string): API {
  // Cache
  const [cache, setCache] = useKey(cacheDb, id);

  // Data
  // TODO: Fix types
  const [row, setRow] = useKey(db, `data/${id}`);
  if (!row) throw new Error("Cannot find data with ID: " + id);
  const data = row.settings;
  const setData = (settings: {}) => setRow({ ...row, settings });

  // Loader
  const { pushLoader, popLoader } = useContext(UiContext);
  const loader = { push: pushLoader, pop: popLoader };

  return {
    cache,
    data,
    loader,
    setCache,
    setData,
  };
}
