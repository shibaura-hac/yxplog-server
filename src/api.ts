import {
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
import * as utils from "./utils.ts";
import * as dbutils from "./dbutils.ts"

export const apiRouter = new Router();

apiRouter.use((ctx, next) => {
  ctx.response.headers.set("Content-Type", "application/json");
  return next();
});

apiRouter.post("/get", async (ctx: RouterContext) => {
  const get_options = await ctx.request.body.json();
  ctx.response.body = dbutils.get(get_options);
});

apiRouter.post("/search", async (ctx: RouterContext) => {
  const payload = await ctx.request.body.json();
  ctx.response.body = dbutils.search(payload);
});

apiRouter.post("/register", async (ctx: RouterContext) => {

  let receivedQSO = await ctx.request.body.json();
  const keys_not_present = utils.validateQSO(receivedQSO);

  if (keys_not_present.length > 0) {
    const error_message = `keys not present: ${keys_not_present.join(", ")}`;

    console.log(error_message)
    ctx.response.body = `{
      "status": false,
      "message": ${error_message}
    }`;
    return
  }

  if (!("date" in receivedQSO)) {
    receivedQSO.id = utils.generateID();
  }

  receivedQSO.call = receivedQSO.call.toUpperCase();

  const result = await dbutils.register(receivedQSO);

  ctx.response.body = `{
    "status": true,
    "qso": ${JSON.stringify(receivedQSO)}
  }`;

});

apiRouter.post("/edit", async (ctx: RouterContext) => {
  ctx.response.body = dbutils.edit(await ctx.request.body.json());
});
