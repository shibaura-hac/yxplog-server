import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v17.1.4/mod.ts";

import { apiRouter } from "./api.ts";


const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
        `Listeneing on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`,
    );
});

app.addEventListener("error",  (e) => {
    console.log(e.error);
});

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen({ port: 8090 });
