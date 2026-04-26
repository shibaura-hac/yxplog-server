import { App, staticFiles } from "fresh";
import { parseArgs } from "@std/cli/parse-args";
import config from "./fresh.config.ts";

const flags = parseArgs(Deno.args, {
  string: ["port"],
  default: { port: "8080" },
});

export const app = new App(config);

app.use(staticFiles());

console.log("Registering routes...");
await app.fsRoutes();

if (import.meta.main) {
  console.log(`Server starting on port ${flags.port}`);
  await app.listen({ port: Number(flags.port) });
}
