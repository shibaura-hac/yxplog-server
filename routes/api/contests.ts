import { FreshContext } from "fresh";
import * as contestUtils from "../../src/contest_utils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const contests = await contestUtils.listContests();
    return Response.json(contests);
  },
  async POST(ctx: FreshContext) {
    const body = await ctx.req.json();
    const contest = await contestUtils.createContest(body);
    return Response.json(contest);
  },
  async DELETE(ctx: FreshContext) {
    const url = new URL(ctx.req.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });
    await contestUtils.deleteContest(id);
    return new Response(null, { status: 204 });
  },
};
