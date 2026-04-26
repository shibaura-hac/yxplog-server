import { FreshContext } from "fresh";
import { lookupCountry } from "../../src/country_utils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const url = new URL(ctx.req.url);
    const callsign = url.searchParams.get("callsign");
    
    if (!callsign) {
      return new Response("Missing callsign parameter", { status: 400 });
    }

    const entity = await lookupCountry(callsign);
    
    if (!entity) {
      return Response.json({
        status: false,
        message: "Country not found",
      });
    }

    return Response.json({
      status: true,
      name: entity.name,
      code: entity.countryCode,
      flag: entity.flag,
    });
  },
};
