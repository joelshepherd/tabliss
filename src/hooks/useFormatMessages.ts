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
