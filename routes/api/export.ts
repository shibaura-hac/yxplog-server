import { FreshContext } from "fresh";
import * as dbutils from "../../src/dbutils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const url = new URL(ctx.req.url);
    const start = parseInt(url.searchParams.get("start") || "0");
    const end = parseInt(url.searchParams.get("end") || "0");

    if (!start || !end) {
      return new Response("Missing start or end parameters", { status: 400 });
    }

    // Convert seconds to milliseconds for DB comparison
    const startTimeMs = start * 1000;
    const endTimeMs = end * 1000;

    const allLogs = await dbutils.get({});
    const filteredLogs = allLogs.filter((log: any) => {
      return log.id >= startTimeMs && log.id <= endTimeMs;
    });

    let output = "DATE (JST) TIME   BAND MODE  CALLSIGN      SENTNo      RCVDNo      Mlt    Pts\n";

    filteredLogs.forEach((log: any) => {
      const dateObj = new Date(log.id);
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dd = String(dateObj.getDate()).padStart(2, "0");
      const hh = String(dateObj.getHours()).padStart(2, "0");
      const min = String(dateObj.getMinutes()).padStart(2, "0");

      const dateStr = `${yyyy}-${mm}-${dd}`;
      const timeStr = `${hh}:${min}`;
      
      const band = String(log.band).padEnd(4, " ");
      const mode = String(log.mode).padEnd(5, " ");
      const call = String(log.call).padEnd(13, " ");
      
      const sentNo = `${log.srst} ${log.memo || ""}`.trim().padEnd(11, " ");
      const rcvdNo = `${log.rrst} ${log.memo || ""}`.trim().padEnd(11, " ");
      
      const mlt = "10".padEnd(7, " "); 
      const pts = "1";

      output += `${dateStr} ${timeStr}   ${band} ${mode}  ${call} ${sentNo} ${rcvdNo} ${mlt} ${pts}\n`;
    });

    const filename = `logs_${start}_${end}.txt`;

    return new Response(output, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  },
};
