export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const formatBytes = (
  bytes: number,
  options?: { decimals?: number; binary?: boolean },
) => {
  if (bytes === 0) return "0 Bytes";

  const defaultOptions = { decimals: 2, binary: false };
  const { decimals, binary } = { ...defaultOptions, ...options };
  const k = binary ? 1024 : 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
