import { JSONFilePreset } from "npm:lowdb/node";
import * as qso from "./utils.ts"

const db = await JSONFilePreset('db.json', { logs: [] })
const { logs } = db.data;

export function register(qso: Record<string, unknown>): Promise<boolean> {
  return db.update(({ logs }) => logs.push(qso));
}

export function edit(mod: Record<string, unknown>): Promise<boolean> {
  if ("id" in mod && "qso" in mod) {
    const keys_missing = qso.validate(mod["qso"]);
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

export function get(options: Record<string, unknown>): Promise<Record<string, unknown>> {
  if ("id" in options) {
    const index = logs.findIndex((log) => log.id == options["id"]) + 1;

    return logs.slice(index, logs.length)
  }
  return logs.slice(-20);
}

export function search(options: Record<string, unknown>): Promise<Record<string, unknown>> {
  if ("call" in options) {
    return { "status": true, "logs": logs.filter((log) => log.call.includes(options["call"])) };
  }
  return { "status": false, "msg": "error: no search query provided" };
}
