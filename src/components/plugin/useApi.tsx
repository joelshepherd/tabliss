import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { API } from '../../plugins';
import { setData } from '../../store/actions/profile';
import { setCache } from '../../store/reducers/cache';
import { pushLoader, popLoader } from '../../store/reducers/ui';
import { useSelector } from '../../store/store';

export function useApi(id: string): API {
  const dispatch = useDispatch();

  // Cache
  const cache = useSelector(state => state.cache[id]);
  const boundSetCache = useCallback(
    (cache: object) => dispatch(setCache(id, cache)),
    [dispatch, id],
  );

  // Data
  const data = useSelector(state => {
    const plugin = state.profile.plugins.find(plugin => plugin.id === id);
    return plugin ? plugin.data : undefined;
  });
  const boundSetData = useCallback(
    (data: object) => dispatch(setData(id, data)),
    [dispatch, id],
  );

  // Loader
  const push = useCallback(() => dispatch(pushLoader()), [dispatch]);
  const pop = useCallback(() => dispatch(popLoader()), [dispatch]);

  return {
    cache,
    data,
    loader: { push, pop },
    setCache: boundSetCache,
    setData: boundSetData,
  };
}
