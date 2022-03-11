import { getTimezoneOffset } from "date-fns-tz";
import React from "react";
import zones from "./zones.json";

type Props = {
  timeZone: string | null;
  onChange: (timeZone: string | null) => void;
};

const TimeZoneInput: React.FC<Props> = ({ timeZone, onChange }) => {
  const timeZones = React.useMemo(() => {
    const date = new Date();
    return zones
      .flatMap((zone) => {
        try {
          const offset = getTimezoneOffset(zone, date) / 3_600_000;
          const offsetFormatted = (offset >= 0 ? "+" : "-") + Math.abs(offset);
          return {
            id: zone,
            name: `(UTC${offsetFormatted}) ${zone.replaceAll("_", " ")}`,
            offset,
          };
        } catch {
          // This time zone not supported in this browser
          return [];
        }
      })
      .sort((a, b) => {
        const delta = a.offset - b.offset;
        return delta === 0 ? a.name.localeCompare(b.name) : delta;
      });
  }, []);

  return (
    <select
      value={timeZone || ""}
      onChange={(event) => onChange(event.target.value || null)}
    >
      <option value="">Automatic</option>
      {timeZones.map((timeZone) => (
        <option key={timeZone.id} value={timeZone.id}>
          {timeZone.name}
        </option>
      ))}
    </select>
  );
};

export default TimeZoneInput;
