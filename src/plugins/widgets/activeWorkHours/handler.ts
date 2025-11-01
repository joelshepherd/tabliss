// Work Hours handler: communicates with background using the same pattern as bookmarks

type WorkHoursSettings = {
  dailyReset: boolean;
  days: number[]; // 0-6, Sunday=0
};

type WorkHoursTodayResponse = {
  seconds: number;
  isFocused?: boolean;
};

async function sendMessageToBackground<T = any>(
  message: any,
  fallbackData: any,
): Promise<T> {
  if (BUILD_TARGET !== "web") return browser.runtime.sendMessage(message);
  return fallbackData;
}

export async function getTodayWorkSeconds(): Promise<WorkHoursTodayResponse> {
  return await sendMessageToBackground<WorkHoursTodayResponse>(
    { type: "WORKHOURS_GET_TODAY" },
    { seconds: 0, isFocused: false },
  );
}

export async function resetTodayWork(): Promise<boolean> {
  const res = await sendMessageToBackground<{ ok: boolean }>(
    { type: "WORKHOURS_RESET_TODAY" },
    { ok: true },
  );
  return res.ok;
}

export async function getWorkHoursSettings(): Promise<WorkHoursSettings> {
  return await sendMessageToBackground<WorkHoursSettings>(
    { type: "WORKHOURS_GET_SETTINGS" },
    { dailyReset: true, days: [1, 2, 3, 4, 5] },
  );
}

export async function setWorkHoursSettings(
  partial: Partial<WorkHoursSettings>,
): Promise<WorkHoursSettings> {
  const res = await sendMessageToBackground<{ ok: boolean; settings: WorkHoursSettings }>(
    { type: "WORKHOURS_SET_SETTINGS", settings: partial },
    { ok: true, settings: { dailyReset: true, days: [1, 2, 3, 4, 5], ...partial } },
  );
  return res.settings;
}

export async function pauseWorkHours(): Promise<boolean> {
  const res = await sendMessageToBackground<{ ok: boolean }>(
    { type: "WORKHOURS_PAUSE" },
    { ok: true },
  );
  return res.ok;
}

export async function resumeWorkHours(): Promise<boolean> {
  const res = await sendMessageToBackground<{ ok: boolean }>(
    { type: "WORKHOURS_RESUME" },
    { ok: true },
  );
  return res.ok;
}