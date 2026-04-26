export interface AppSettings {
  defaultRstNormal: string;
  defaultRstContest: string;
  pollingInterval: number;
  isContestMode: boolean;
}

const STORAGE_KEY = "yxplog_settings";

export const DEFAULT_SETTINGS: AppSettings = {
  defaultRstNormal: "59",
  defaultRstContest: "59",
  pollingInterval: 5000,
  isContestMode: false,
};

export function loadSettings(): AppSettings {
  if (typeof localStorage === "undefined") return DEFAULT_SETTINGS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
