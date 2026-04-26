import { FreshContext } from "fresh";
import * as dbutils from "../../src/dbutils.ts";

export const handler = {
  async POST(ctx: FreshContext) {
    const payload = await ctx.req.json().catch(() => ({}));
    const data = await dbutils.search(payload);
    return Response.json(data);
  },
};
