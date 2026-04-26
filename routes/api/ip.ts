import { FreshContext } from "fresh";

export const handler = {
  GET(ctx: FreshContext) {
    return Response.json({
      ip: ctx.remoteAddr?.hostname ?? "unknown",
    });
  },
};
