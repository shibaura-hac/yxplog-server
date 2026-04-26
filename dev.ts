import { Builder } from "fresh/dev";
import { parseArgs } from "@std/cli/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["port"],
  default: { port: "8000" },
});

const builder = new Builder();

if (Deno.args.includes("build")) {
  await builder.build(() => import("./main.ts").then(m => m.app));
} else {
  await builder.listen(() => import("./main.ts").then(m => m.app), {
    port: Number(flags.port),
  });
}
