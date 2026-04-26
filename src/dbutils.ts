import { JSONFilePreset } from "npm:lowdb/node";
import * as qso from "./utils.ts";

const db = await JSONFilePreset("db.json", { logs: [] });
const { logs } = db.data;

export function register(qso: Record<string, unknown>): Promise<void> {
  return db.update(({ logs }) => logs.push(qso));
}

export function registerMany(qsos: Record<string, unknown>[]): Promise<void> {
    return db.update(({ logs }) => {
        logs.push(...qsos);
    });
}

export function edit(
  mod: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if ("id" in mod && "qso" in mod) {
    const keys_missing = qso.validateQSO(mod["qso"] as Record<string, unknown>);
    if (!(keys_missing.length === 0)) {
      return Promise.resolve({
        "status": false,
        "msg": `error: key ${keys_missing} are missing`,
      });
    }

    db.update(({ logs }) => {
      const index = logs.findIndex((log) => log.id == mod["id"]);

      if (index !== -1) {
        // id in the modified qso can be omitted. We'll handle this
        const updatedQso = mod["qso"] as Record<string, unknown>;
        if (!("id" in updatedQso)) {
          updatedQso["id"] = mod["id"];
        }
        logs[index] = updatedQso;
      }
    });
    return Promise.resolve({ "status": true, "qso": mod["qso"] });
  } else {
    return Promise.resolve({
      "status": false,
      "msg": "error: id or qso not provided",
      "received": mod,
    });
  }
}

export function get(
  options: Record<string, unknown>,
): Promise<Record<string, unknown>[]> {
  if ("id" in options) {
    const index = logs.findIndex((log) => log.id == options["id"]) + 1;
    return Promise.resolve(logs.slice(index, logs.length));
  }
  return Promise.resolve(logs.slice(-20));
}

export function search(
  options: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if ("call" in options) {
    return Promise.resolve({
      "status": true,
      "logs": logs.filter((log) =>
        (log.call as string).includes(options["call"] as string)
      ),
    });
  }
  return Promise.resolve({
    "status": false,
    "msg": "error: no search query provided",
  });
}
