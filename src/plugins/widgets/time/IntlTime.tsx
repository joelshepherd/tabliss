import React, { FC } from "react";
import { useKey } from "../../../lib/db/react";
import { db } from "../../../state";

type Props = {
  hour12: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  showDayPeriod?: boolean;
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
const IntlTime: FC<Props> = ({
  hour12,
  showMinutes,
  showSeconds,
  showDayPeriod = true,
  time,
}) => {
  const [locale] = useKey(db, "locale");

  // Time formatter config
  const formater = Intl.DateTimeFormat(locale, {
    hour12,
    hour: "numeric",
    hourCycle: hour12 ? "h12" : "h23",
    minute: showMinutes ? "numeric" : undefined,
    second: showSeconds ? "numeric" : undefined,
  });

  let formatedTime: String;

  if (showDayPeriod) {
    // Return normal time if showing timePeriod
    formatedTime = formater.format(time);
  } else {
    // Remove timePeriod from string
    // Returns the date broken down into parts
    const dateParts = formater.formatToParts(time);

    formatedTime = dateParts
      .filter((part) => part.type !== "dayPeriod") // Removes day period from the array
      .map((part) => part.value) // Converts array of objects to array of strings
      .join("");
  }

  return <>{formatedTime}</>;
};

export default IntlTime;
