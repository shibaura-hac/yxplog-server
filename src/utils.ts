import { Low } from "npm:lowdb";
import { JSONFile, JSONFilePreset } from "npm:lowdb/node";
import { format, formatDistance, formatRelative, subDays } from "npm:date-fns"

const _keys = [
  "date",
  "band",
  "mod",
  "call",
  "rrst",
  "rcvd",
  "srst",
  "sent",
  "pts",
  "pw",
  "memo"
]

const db = await JSONFilePreset('db.json', { logs: [] })
const { logs } = db.data;

export function validateQSO(qso: Record<string, unknown>): boolean {
  return _keys.filter((key) => !(key in qso));
}

export function registerQSO(qso: Record<string, unknown>): Promise<boolean> {
  return db.update(({ logs }) => logs.push(qso));
}

export function searchQSO(qso: Record<string, unknown>): Promise<Record<string, unknown>> {
  // pass the search query, return all logs that match the query
}

export function getQSO(timestamp: String): Promise<Record<string, unknown>> {
  // pass the last log's timestamp, return all logs after that timestamp
  return logs.find((log) => log.date === timestamp)
}
