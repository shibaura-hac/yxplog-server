import { FreshContext } from "fresh";
import * as contestUtils from "../../src/contest_utils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const templates = await contestUtils.listTemplates();
    return Response.json(templates);
  },
};
