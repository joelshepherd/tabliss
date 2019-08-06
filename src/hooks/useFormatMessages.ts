import { useMemo } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

export function useFormatMessages<K extends string>(
  messsages: Record<K, MessageDescriptor>,
): Record<K, string> {
  const intl = useIntl();

  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries<MessageDescriptor>(messsages).map(([id, message]) => [
          id,
          intl.formatMessage(message),
        ]),
      ),
    [intl, messsages],
  ) as any;
}

// Quick inline Object.fromEntries polyfill - as support is still pretty new.
if (!Object.fromEntries) {
  Object.fromEntries = function<T>(
    entries: Iterable<readonly [PropertyKey, T]>, // Force specific overload for TypeScript
  ) {
    return Array.from(entries).reduce(
      (object, entry) => Object.assign(object, { [entry[0]]: entry[1] }, {}),
      {},
    );
  };
}
