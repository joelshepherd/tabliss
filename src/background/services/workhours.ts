import { BackgroundService } from "../types";

type WorkHoursSettings = {
  dailyReset: boolean;
  days: number[]; // 0-6, Sunday=0
};

type WorkHoursState = {
  lastTick: number | null;
  paused: boolean;
};

type WorkHoursTotals = {
  [key: string]: number; // yyyy-mm-dd -> seconds
};

const WH_STORAGE_KEYS = {
  settings: "workhours_settings",
  state: "workhours_state",
  totals: "workhours_totals",
} as const;

const defaultSettings: WorkHoursSettings = {
  dailyReset: true,
  days: [1, 2, 3, 4, 5], // Mon-Fri
};

let whSettings: WorkHoursSettings = defaultSettings;
let whState: WorkHoursState = { lastTick: null, paused: false };
let whTotals: WorkHoursTotals = {};

function fmtDate(d = new Date()) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function loadAll() {
  const {
    [WH_STORAGE_KEYS.settings]: s,
    [WH_STORAGE_KEYS.state]: st,
    [WH_STORAGE_KEYS.totals]: t,
  } = await browser.storage.local.get([
    WH_STORAGE_KEYS.settings,
    WH_STORAGE_KEYS.state,
    WH_STORAGE_KEYS.totals,
  ]);

  whSettings = { ...defaultSettings, ...(s || {}) };
  whState = { lastTick: null, paused: false, ...(st || {}) };
  whTotals = t || {};
}

async function saveState() {
  await browser.storage.local.set({ [WH_STORAGE_KEYS.state]: whState });
}
async function saveTotals() {
  await browser.storage.local.set({ [WH_STORAGE_KEYS.totals]: whTotals });
}
async function saveSettings() {
  await browser.storage.local.set({ [WH_STORAGE_KEYS.settings]: whSettings });
}

function isWorkday(d = new Date()) {
  return whSettings.days.includes(d.getDay());
}

let intervalId: number | undefined;

async function tick() {
  if (whState.paused) {
    whState.lastTick = null;
    await saveState();
    return;
  }

  const now = Date.now();
  const nowDate = new Date(now);
  const todayKey = fmtDate(nowDate);

  if (!isWorkday(nowDate)) {
    whState.lastTick = null;
    await saveState();
    return;
  }

  if (whSettings.dailyReset && !whTotals[todayKey]) {
    whTotals[todayKey] = 0;
    await saveTotals();
  }

  if (whState.lastTick != null) {
    const elapsedMs = now - whState.lastTick;
    // Cap to 5 seconds to avoid huge jumps after sleep
    const boundedMs = Math.min(elapsedMs, 5000);
    const incSec = Math.floor(boundedMs / 1000);

    if (incSec > 0) {
      const prev = new Date(whState.lastTick);
      const prevKey = fmtDate(prev);
      if (prevKey !== todayKey) {
        if (!whTotals[todayKey]) whTotals[todayKey] = 0;
        await saveTotals();
      } else {
        if (!whTotals[todayKey]) whTotals[todayKey] = 0;
        whTotals[todayKey] += incSec;
        await saveTotals();
      }
    }
  }

  whState.lastTick = now;
  await saveState();
}

export class WorkHoursService implements BackgroundService {
  async init(): Promise<void> {
    await loadAll();

    const todayKey = fmtDate();
    if (whSettings.dailyReset && !whTotals[todayKey]) {
      whTotals[todayKey] = 0;
      await saveTotals();
    }

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(tick, 1000) as unknown as number;

    const scheduleMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const ms = midnight.getTime() - now.getTime();
      setTimeout(async () => {
        const todayKey = fmtDate();
        if (whSettings.dailyReset) {
          whTotals[todayKey] = whTotals[todayKey] || 0;
          await saveTotals();
        }
        whState.lastTick = null;
        await saveState();
        scheduleMidnight();
      }, ms);
    };
    scheduleMidnight();
  }

  async onMessage(message: any): Promise<any | undefined> {
    switch (message?.type) {
      case "WORKHOURS_GET_TODAY": {
        const key = fmtDate();
        return { seconds: whTotals[key] || 0 };
      }
      case "WORKHOURS_RESET_TODAY": {
        const key = fmtDate();
        whTotals[key] = 0;
        await saveTotals();
        whState.lastTick = null;
        await saveState();
        return { ok: true };
      }
      case "WORKHOURS_GET_SETTINGS": {
        return whSettings;
      }
      case "WORKHOURS_SET_SETTINGS": {
        const next = message.settings as Partial<WorkHoursSettings>;
        whSettings = { ...whSettings, ...next };
        await saveSettings();
        return { ok: true, settings: whSettings };
      }
      case "WORKHOURS_PAUSE": {
        whState.paused = true;
        await saveState();
        return { ok: true };
      }
      case "WORKHOURS_RESUME": {
        whState.paused = false;
        await saveState();
        return { ok: true };
      }
    }
    return undefined;
  }
}