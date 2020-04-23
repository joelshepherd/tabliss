import React, { FC } from "react";

import { useSelector } from '../../../store';

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  time: Date;
};


/**
 * A react wrapper around `Intl.DateTimeFromat().format()`
 * 
 * Todo: Remove this component when react-intl adds the hourCycle option to their component
 * 
 * 
 * Intl Issue information: https://github.com/formatjs/react-intl/issues/1577
 * Code based on: https://github.com/mattermost/mattermost-webapp/pull/5138
 * Tabliss issue: https://github.com/joelshepherd/tabliss/issues/231
 */
const IntlTime: FC<Props> = ({ hour12, showMinutes, showSeconds, time }) => {
  const locale = useSelector(state => state.data.locale);

  // React types for .format() do not include hourCycle
  const options: {
    hour?: string;
    minute?: string;
    second?: string;
    hour12?: boolean;
    timeZone?: string;
    hourCycle?: string;
  } = {
    hour12,
    hour: 'numeric',
    hourCycle: hour12 ? 'h12' : 'h23',
    minute: showMinutes ? 'numeric' : undefined,
    second: showSeconds ? 'numeric' : undefined
  }

  const formatedTime = Intl.DateTimeFormat(locale, options).format(time)

  return (
    <>
      {formatedTime}
    </>
  )
}

export default IntlTime