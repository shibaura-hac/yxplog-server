import {
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { validateQSO, registerQSO, generateID, getLogs, searchLogs, editQSO } from "./utils.ts";

export const apiRouter = new Router();

apiRouter.get("/", async (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "text/plain");
  ctx.response.body = `Welcome to YXPlog, see https://github.com/shibaura-hac/yxplog-server`;
});

apiRouter.post("/get", async (ctx: RouterContext) => {
  const requestBody = await ctx.request.body.json();
  ctx.response.headers.set("Content-Typee", "application/json");
  ctx.response.body = getLogs(requestBody);
});

apiRouter.post("/search", async (ctx: RouterContext) => {
  const requestBody = await ctx.request.body.json();
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = searchLogs(requestBody);
});

apiRouter.post("/register", async (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "application/json");

  let _qso = await ctx.request.body.json();
  const _keys_not_present = validateQSO(_qso);

  if (_keys_not_present.length === 0) {
    // TODO: catch database error

    if (!("date" in _qso)) {
      const today = generateID();
      _qso.id = today;
    }

    const result = await registerQSO(_qso);

    ctx.response.body = `{
      "status": true,
      "qso": ${JSON.stringify(_qso)}
    }`;
  } else {
    ctx.response.body = `{
      "status": false,
      "message": "keys not present: ${_keys_not_present.join(", ")}"
    }`;
  }
});

apiRouter.post("/edit", async (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = editQSO(await ctx.request.body.json());
});
