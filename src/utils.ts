import { Low } from "npm:lowdb";
import { JSONFile, JSONFilePreset } from "npm:lowdb/node";
import { format, formatDistance, formatRelative, subDays } from "npm:date-fns"

const _keys_required = [
  "band",
  "mod",
  "call",
  "rrst",
  "srst",
  "pw",
  "memo"
]

const db = await JSONFilePreset('db.json', { logs: [] })
const { logs } = db.data;

export function validateQSO(qso: Record<string, unknown>): boolean {
  return _keys_required.filter((key) => !(key in qso));
}

export function registerQSO(qso: Record<string, unknown>): Promise<boolean> {
  return db.update(({ logs }) => logs.push(qso));
}

export function searchQSO(qso: Record<string, unknown>): Promise<Record<string, unknown>> {
  // pass the search query, return all logs that match the query
}

export function generateID(): number {
  const today = new Date();
  return today.getTime();
}

export function getLogs(options: Record<string, unknown>): Promise<Record<string, unknown>> {
  if ("id" in options) {
    const index = logs.findIndex((log) => log.id == options["id"]);
    return logs.slice(index - logs.length)
  }
  return logs.slice(-20);
}

export function searchLogs(options: Record<string, unknown>): Promise<Record<string, unknown>> {
  if ("callsign" in options) {
    return logs.filter((log) => log.call.includes(options["callsign"]));
  }
  return {"error": "no search query provided"};
}

export function getQSO(timestamp: String): Promise<Record<string, unknown>> {
  // pass the last log's timestamp, return all logs after that timestamp
  return logs.find((log) => log.id === timestamp)
}
