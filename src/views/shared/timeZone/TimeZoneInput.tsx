import { getTimezoneOffset } from "date-fns-tz";
import React from "react";
import zones from "./zones.json";

type Props = {
  timeZone: string | null;
  onChange: (timeZone: string | null) => void;
};

type ZoneOption = {
  id: string;
  name: string;
  offset: number;
};

let cachedZoneOptions: ZoneOption[] | null = null;

const TimeZoneInput: React.FC<Props> = ({ timeZone, onChange }) => {
  const [zoneOptions, setZoneOptions] = React.useState(cachedZoneOptions);

  React.useEffect(() => {
    if (zoneOptions !== null) return;

    const date = new Date();
    cachedZoneOptions = zones
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
    setZoneOptions(cachedZoneOptions);
  }, []);

  return (
    <select
      value={timeZone || ""}
      onChange={(event) => onChange(event.target.value || null)}
    >
      <option value="">Automatic</option>
      {zoneOptions ? (
        zoneOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))
      ) : (
        <option disabled>Loading...</option>
      )}
    </select>
  );
};

export default TimeZoneInput;
