import { Low } from "npm:lowdb";
import { JSONFile, JSONFilePreset } from "npm:lowdb/node";

const _keys = [
  "day",
  "time",
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

export function validateQSO(qso: Record<string, unknown>): boolean {
  return _keys.filter((key) => !(key in qso));
}

export function registerQSO(qso: Record<string, unknown>): Promise<boolean> {
  return db.update(({ logs }) => logs.push(qso));
}
