import { Low } from "npm:lowdb";
import { JSONFile, JSONFilePreset } from "npm:lowdb/node";
import { format, formatDistance, formatRelative, subDays } from "npm:date-fns"

const _keys_required = [
  "band",
  "mode",
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

export function editQSO(mod: Record<string, unknown>): Promise<boolean> {
  if ("id" in mod && "qso" in mod) {
    const keys_missing = validateQSO(mod["qso"]);
    if (!(keys_missing.length === 0)) {
      return { "status": false, "msg": `error: key ${keys_missing} are missing` }
    };

    db.update(({ logs }) => {
      const index = logs.findIndex((log) => log.id == mod["id"]);

      // id in the modified qso can be omitted. We'll handle this
      if (!("id" in mod["qso"])) {
        mod["qso"]["id"] = mod["id"];
      }

      logs[index] = mod["qso"];
    })
    return { "status": true, "qso": mod["qso"] }
  } else {
    return { "status": false, "msg": "error: id or qso not provided", "received": data }
  }
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
  return logs.slice(-30);
}

export function searchLogs(options: Record<string, unknown>): Promise<Record<string, unknown>> {
  if ("call" in options) {
    return { "status": true, "logs": logs.filter((log) => log.call.includes(options["call"])) };
  }
  return { "status": false, "msg": "error: no search query provided" };
}

export function getQSO(timestamp: String): Promise<Record<string, unknown>> {
  // pass the last log's timestamp, return all logs after that timestamp
  return logs.find((log) => log.id === timestamp)
}
