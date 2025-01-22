import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { validateQSO, registerQSO } from "./utils.ts";


const app = new Application();
const router = new Router();

// app.addEventListener("listen", ({ hostname, port, secure }) => {
//     console.log(
//         `Listeneing on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`,
//     );
// });

// app.addEventListener("error",  (e) => {
//     console.log(e.error);
// });
//


// API Specification: https://gist.github.com/alpaca-honke/04a775060111d94ac1d0ada242471a41

router.get("/", (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "text/plain");
  ctx.response.body = "Welcome to YXPlog, see https://github.com/shibaura-hac/yxplog-server";
});

router.post("/", async (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "text/plain");
  ctx.response.body = "Welcome to YXPlog, see https://github.com/shibaura-hac/yxplog-server";
});

router.post("/get", async (ctx: RouterContext) => {
  const requestBody = await ctx.request.body().value;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = "{}";
});

router.post("/search", async (ctx: RouterContext) => {
  const requestBody = await ctx.request.body().value;
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = `{
    "results": []
  }`;
});

router.post("/register", async (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "application/json");

  const _qso = await ctx.request.body.json();
  const _keys_not_present = validateQSO(_qso);

  if (_keys_not_present.length === 0) {

    // TODO: catch database error
    // await db.update(({ logs }) => logs.push(_qso));
    //
    const result = await registerQSO(_qso);



    ctx.response.body = `{
      "status": true,
      "qso": ${JSON.stringify(_qso)}
    }`;
  } else {
    ctx.response.body = `{
      "status": false,
      "message": "keys not present: ${validateQSO(_qso).join(", ")}"
    }`;
  }


});

router.get("/edit", (ctx: RouterContext) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = `{
    "status": true
  }`;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8090 });
