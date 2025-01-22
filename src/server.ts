import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";

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

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello, World!";
});

router.get("/get", (ctx: RouterContext) => {
  ctx.response.header = `{
    "Content-Type": "application/json"
  }`;
  ctx.response.body = "{}";
});

router.get("/register", (ctx: RouterContext) => {
  ctx.response.body = "{}";
});

router.get("/edit", (ctx: RouterContext) => {
  ctx.response.body = "{}";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8090 });
