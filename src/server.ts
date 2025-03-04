import {
  Application,
  send,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { apiRouter } from "./api.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["port"],
  default: { port: "8080"}
})


const app = new Application();
const ROOT_DIR = "./public", ROOT_DIR_PATH = "/public";

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listeneing on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`,
  );
});

app.addEventListener("error", (e) => {
  console.log(e.error);
});

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith(ROOT_DIR_PATH)) {
    const filePath = ctx.request.url.pathname.replace(ROOT_DIR_PATH, "");
    await send(ctx, filePath, {
      root: ROOT_DIR,
    });
  } else if (ctx.request.url.pathname == "/") {
    ctx.response.redirect("/public/frontend.html")
  } else if (ctx.request.url.pathname == "/favicon.ico") {
    ctx.response.redirect("/public/shac-logo-square.ico")
  } else {
    await next();  // Pass control to the next middleware
    return;
  }
});

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen({ hostname: "0.0.0.0", port: flags.port });
