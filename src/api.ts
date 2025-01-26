import {
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
import * as qso from "./utils.ts";
import * as dbutils from "./dbutils.ts"

export const apiRouter = new Router();

apiRouter.use((ctx, next) => {
  ctx.response.headers.set("Content-Type", "application/json");
  return next();
});

apiRouter.post("/get", async (ctx: RouterContext) => {
  const payload = await ctx.request.body.json();
  ctx.response.body = dbutils.get(payload);
});

apiRouter.post("/search", async (ctx: RouterContext) => {
  const payload = await ctx.request.body.json();
  ctx.response.body = dbutils.search(payload);
});

apiRouter.post("/register", async (ctx: RouterContext) => {

  let _qso = await ctx.request.body.json();
  const keys_not_present = qso.validate(_qso);

  if (keys_not_present.length === 0) {
    // TODO: catch database error

    if (!("date" in _qso)) {
      const today = qso.generateID();
      _qso.id = today;
    }

    _qso.call = _qso.call.toUpperCase();

    const result = await dbutils.register(_qso);

    ctx.response.body = `{
      "status": true,
      "qso": ${JSON.stringify(_qso)}
    }`;
  } else {
    console.log(`keys not present: ${keys_not_present.join(", ")}`)
    ctx.response.body = `{
      "status": false,
      "message": "keys not present: ${keys_not_present.join(", ")}"
    }`;
  }
});

apiRouter.post("/edit", async (ctx: RouterContext) => {
  ctx.response.body = dbutils.edit(await ctx.request.body.json());
});
