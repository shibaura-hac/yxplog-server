/**
 * Shared contracts for the 2026 contest profiles covered by Issue #9.
 * Times crossing an API boundary are Unix seconds; QSO.id remains Unix ms.
 */

export type ContestProfileId =
  | "all-ja-2026"
  | "all-ja1-2026"
  | "six-meter-and-down-2026"
  | "field-day-2026"
  | "all-asian-dx-cw-2026"
  | "all-asian-dx-phone-2026"
  | "all-city-all-gun-2026"
  | "cq-ww-dx-cw-2026"
  | "cq-ww-dx-ssb-2026"
  | "all-saitama-2026"
  | "daitoshi-2026";

export type ContestOutputFormat = "jarl-r2.1" | "jarl-r1.0" | "cabrillo-3.0";
export type ContestMode = "cw" | "phone" | "digital" | "mixed";
export type ContestTimeZone = "Asia/Tokyo" | "UTC";
export type ContestContinent = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";

export interface ContestTimeWindow {
  /** Unix seconds, inclusive. */
  start: number;
  /** Unix seconds, exclusive. */
  end: number;
  /** An optional category window, such as ALL JA1 HIGH/LOW/DIGITAL. */
  category?: string;
}

export interface ContestRuleProfile {
  id: ContestProfileId;
  name: string;
  year: 2026;
  rulesVersion: string;
  mode: ContestMode;
  exchangeTimeZone: ContestTimeZone;
  outputFormat: ContestOutputFormat;
  /** Overall contest window. Category-specific windows can be narrower. */
  period: ContestTimeWindow;
  activeWindows?: readonly ContestTimeWindow[];
  officialRulesUrl: string;
}

/**
 * Event profiles are separate when a contest has distinct divisions, modes,
 * periods, exchange rules, or submission deadlines.
 */
export const CONTEST_RULE_PROFILES: readonly ContestRuleProfile[] = [
  {
    id: "all-ja-2026",
    name: "第68回 ALL JAコンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1777118400, end: 1777204800 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/allja_rules.html",
  },
  {
    id: "all-ja1-2026",
    name: "第38回 ALL JA1コンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1782518400, end: 1782558000 },
    activeWindows: [
      { start: 1782518400, end: 1782529200, category: "high" },
      { start: 1782532800, end: 1782540000, category: "digital" },
      { start: 1782543600, end: 1782558000, category: "low" },
    ],
    officialRulesUrl: "https://ja1zlo.u-tokyo.org/allja1/38rule/",
  },
  {
    id: "six-meter-and-down-2026",
    name: "第56回 6m AND DOWNコンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1783166400, end: 1783231200 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/6d_rules.html",
  },
  {
    id: "field-day-2026",
    name: "第69回 フィールドデーコンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1785585600, end: 1785650400 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/fd_rules.html",
  },
  {
    id: "all-asian-dx-cw-2026",
    name: "第67回 ALL ASIAN DXコンテスト 電信部門",
    year: 2026,
    rulesVersion: "2026-CW",
    mode: "cw",
    exchangeTimeZone: "UTC",
    outputFormat: "jarl-r2.1",
    period: { start: 1781913600, end: 1782086400 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/aadx_rules.html",
  },
  {
    id: "all-asian-dx-phone-2026",
    name: "第67回 ALL ASIAN DXコンテスト 電話部門",
    year: 2026,
    rulesVersion: "2026-PHONE",
    mode: "phone",
    exchangeTimeZone: "UTC",
    outputFormat: "jarl-r2.1",
    period: { start: 1788566400, end: 1788739200 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/aadx_rules.html",
  },
  {
    id: "all-city-all-gun-2026",
    name: "第47回 全市全郡コンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1791633600, end: 1791720000 },
    officialRulesUrl: "https://www.jarl.org/Japanese/1_Tanoshimo/1-1_Contest/acag_rules.html",
  },
  {
    id: "cq-ww-dx-cw-2026",
    name: "2026 CQ WW DX Contest CW",
    year: 2026,
    rulesVersion: "2026-CW",
    mode: "cw",
    exchangeTimeZone: "UTC",
    outputFormat: "cabrillo-3.0",
    period: { start: 1795824000, end: 1796083200 },
    officialRulesUrl: "https://www.cqww.com/rules/",
  },
  {
    id: "cq-ww-dx-ssb-2026",
    name: "2026 CQ WW DX Contest SSB",
    year: 2026,
    rulesVersion: "2026-SSB",
    mode: "phone",
    exchangeTimeZone: "UTC",
    outputFormat: "cabrillo-3.0",
    period: { start: 1792800000, end: 1793059200 },
    officialRulesUrl: "https://www.cqww.com/rules/",
  },
  {
    id: "all-saitama-2026",
    name: "第44回 オール埼玉コンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r2.1",
    period: { start: 1768176000, end: 1768197600 },
    officialRulesUrl: "https://www.jarl.com/allst/rule/44st.html",
  },
  {
    id: "daitoshi-2026",
    name: "第56回 大都市コンテスト",
    year: 2026,
    rulesVersion: "2026",
    mode: "mixed",
    exchangeTimeZone: "Asia/Tokyo",
    outputFormat: "jarl-r1.0",
    period: { start: 1773986400, end: 1773997200 },
    officialRulesUrl: "https://www.no5hc.org/dai56.pdf",
  },
];

export interface ContestStationLocation {
  /** Domestic contest location identifier (prefecture/region or city/county/ward). */
  domesticMultiplier?: string;
  /** CQ WW / DX contest station metadata. */
  dxccEntity?: string;
  wpxPrefix?: string;
  cqZone?: number;
  ituZone?: number;
  continent?: ContestContinent;
}

export interface ContestQso {
  /** Existing QSO ID, Unix milliseconds. */
  id: number;
  call: string;
  band: string;
  mode: string;
  /** Existing sent RST and received RST fields, retained as strings. */
  srst: string;
  rrst: string;
  /** Independently stored exchange parts; preserve leading zeroes and suffixes. */
  sentNumber?: string;
  receivedNumber?: string;
  operator?: string;
  /** Required for Cabrillo entries where the contest format requires frequency. */
  frequencyKHz?: number;
  /** Required when a rule or output format distinguishes transmitter/station. */
  transmitter?: number;
  /** Resolved or user-confirmed station metadata needed for multiplier checks. */
  contactedStation?: ContestStationLocation;
}

export interface ContestEntry {
  profileId: ContestProfileId;
  /** Exact organizer code where the event defines one (not every event does). */
  categoryCode?: string;
  /** Human-readable official category label, including category dimensions. */
  categoryLabel: string;
  callsign: string;
  operatorCallsign?: string;
  operatorNames?: string[];
  powerWatts?: number;
  stationLocation?: ContestStationLocation;
  /** Rule-specific declared attributes such as FD station class or power source. */
  attributes?: Record<string, string | number | boolean>;
  cabrilloCategory?: {
    operator: string;
    assisted?: string;
    band?: string;
    power?: string;
    station?: string;
    transmitter?: string;
    overlay?: string;
  };
}

export interface ContestSubmissionSummary {
  address?: string;
  name?: string;
  email?: string;
  telephone?: string;
  licenseDate?: string;
  age?: number;
  operatingLocation?: string;
  powerSupply?: string;
  clubName?: string;
  operators?: string[];
  oathDate?: string;
  signature?: string;
  comments?: string;
}

export type ContestQsoDisposition = "valid" | "duplicate" | "invalid" | "outside-category";

export interface ContestQsoScore {
  qsoId: number;
  disposition: ContestQsoDisposition;
  reason?: string;
  points: number;
  multipliers: string[];
}

export interface ContestScore {
  profileId: ContestProfileId;
  rulesVersion: string;
  perQso: ContestQsoScore[];
  bandTotals: Record<string, { points: number; multiplierCount: number }>;
  qsoPoints: number;
  multiplierCount: number;
  total: number;
}

export type ContestExportFormat = "jarl" | "cabrillo";

export interface ContestExportRequest {
  profileId: ContestProfileId;
  period: ContestTimeWindow;
  entry: ContestEntry;
  summary: ContestSubmissionSummary;
  /** Preview confirmation token supplied to a subsequent download request. */
  previewToken?: string;
}

export interface ContestExportValidationIssue {
  code: string;
  message: string;
  field?: string;
  qsoId?: number;
}

export interface ContestExportPreview {
  profileId: ContestProfileId;
  format: ContestOutputFormat;
  period: ContestTimeWindow;
  qsoCount: number;
  score?: ContestScore;
  candidateOperators: string[];
  issues: ContestExportValidationIssue[];
  text?: string;
  previewToken: string;
}
