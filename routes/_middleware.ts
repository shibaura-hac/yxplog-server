import { FreshContext } from "fresh";
import { recordActivity } from "../src/server_status.ts";

export default async function middleware(ctx: FreshContext) {
  const userAgent = ctx.req.headers.get("user-agent");
  
  if (!ctx.url.pathname.startsWith("/api/get")) {
      if (userAgent) {
          const ip = ctx.remoteAddr?.hostname ?? "unknown";
          const sessionId = `${ip}-${userAgent.substring(0, 50)}`;
          recordActivity(sessionId, {
              operator: `Visitor (${ip})`,
              agent: userAgent,
              path: ctx.url.pathname
          });
      }
  }
  
  return await ctx.next();
}
