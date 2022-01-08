import { utcToZonedTime } from "date-fns-tz";
import React, { FC, useEffect, useState } from "react";

import timeZones from "./timeZones";

let cachedSupportedTimeZones: string[] | undefined;

type Props = {
  timeZone?: string;
  onChange: (timeZone?: string) => void;
};

const TimeZoneInput: FC<Props> = ({ timeZone, onChange }) => {
  const [supportedTimeZones, setSupportedTimeZones] = useState(
    cachedSupportedTimeZones,
  );

  useEffect(() => {
    if (!supportedTimeZones) {
      // Generate supported timezones
      cachedSupportedTimeZones = timeZones.filter((timeZone) => {
        try {
          utcToZonedTime(new Date(), timeZone);
        } catch {
          return false;
        }
        return true;
      });

      setSupportedTimeZones(cachedSupportedTimeZones);
    }
  }, []);

  return (
    <select
      value={timeZone}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">Automatic</option>

      {supportedTimeZones &&
        supportedTimeZones.map((timeZone) => (
          <option key={timeZone}>{timeZone}</option>
        ))}

      {!supportedTimeZones && (
        <option disabled>Calculating supported time zones...</option>
      )}
    </select>
  );
};

export default TimeZoneInput;
