import { FreshContext } from "fresh";
import * as dbutils from "../../src/dbutils.ts";
import { lookupCountry } from "../../src/country_utils.ts";
import { recordActivity } from "../../src/server_status.ts";

export const handler = {
  async POST(ctx: FreshContext) {
    const body = await ctx.req.json().catch(() => ({}));
    
    // Explicitly record activity from the metadata sent in the JSON body
    if (body.agent && body.operator) {
        const agentStr = String(body.agent).trim();
        const operatorStr = String(body.operator).trim();
        
        if (agentStr.length > 0 && agentStr !== "unknown") {
            // Use a stable ID for the same session if possible, or just the agent+operator combo
            const sessionId = `${operatorStr}-${agentStr.substring(0, 50)}`;
            recordActivity(sessionId, {
                operator: operatorStr || "Anonymous",
                agent: agentStr,
                path: "/api/get"
            });
        }
    }

    const logs = await dbutils.get(body);
    
    // Enrich logs with flag information
    const enrichedLogs = await Promise.all(logs.map(async (log: any) => {
      const entity = await lookupCountry(log.call);
      return {
        ...log,
        flag: entity?.flag ?? "🏳️", // Fallback to white flag if not found
      };
    }));

    return Response.json(enrichedLogs);
  },
};
