import { useContext } from "react";
import { UiContext } from "../contexts/ui";
import { useKey } from "../lib/db/react";
import { API } from "../plugins";
import { cache as cacheDb, db } from "../state";

// TODO: consider alternative ways to supply api that isn't eager loading
//       the entire object for every plugin
export function useApi(id: string): API {
  // Cache
  const [cache, setCache] = useKey(cacheDb, id);

  // Data
  const [data, setData] = useKey(db, `data/${id}`);

  // Loader
  const { pushLoader, popLoader } = useContext(UiContext);
  const loader = { push: pushLoader, pop: popLoader };

  return {
    cache,
    data: (data ?? undefined) as {}, // TODO: fix api types
    loader,
    setCache,
    setData,
  };
}
