import { FreshContext } from "fresh";
import { startTime, getActiveClients } from "../../src/server_status.ts";
import * as dbutils from "../../src/dbutils.ts";
import { lookupCountry } from "../../src/country_utils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const logs = await dbutils.get({});
    const uniqueCallsigns = new Set(logs.map((log: any) => log.call)).size;
    
    // Top callsigns
    const callsignCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const countryFlags: Record<string, string> = {};

    for (const log of logs as any[]) {
        callsignCounts[log.call] = (callsignCounts[log.call] || 0) + 1;
        
        // Country stats
        const entity = await lookupCountry(log.call);
        const countryName = entity?.name || "Unknown";
        countryCounts[countryName] = (countryCounts[countryName] || 0) + 1;
        countryFlags[countryName] = entity?.flag || "🏳️";
    }

    const topCallsigns = Object.entries(callsignCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([call, count]) => ({ call, count }));

    const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count, flag: countryFlags[name] }));

    const sessions = getActiveClients();

    return Response.json({
      uptime: Math.floor((Date.now() - startTime) / 1000),
      activeClients: sessions.length,
      activeSessions: sessions,
      totalQSOs: logs.length,
      uniqueCallsigns,
      topCallsigns,
      topCountries
    });
  },
};
