import { FreshContext } from "fresh";
import * as dbutils from "../../../src/dbutils.ts";

export const handler = {
  async GET(ctx: FreshContext) {
    const logs = await dbutils.get({});
    
    // Group QSOs by hour
    const hourlyData: Record<number, number> = {};
    
    logs.forEach((log: any) => {
      // Use the ID which is the timestamp
      const date = new Date(log.id);
      date.setMinutes(0, 0, 0); // Round down to the hour
      const hourTimestamp = Math.floor(date.getTime() / 1000);
      
      hourlyData[hourTimestamp] = (hourlyData[hourTimestamp] || 0) + 1;
    });

    const sortedData = Object.entries(hourlyData)
      .map(([time, value]) => ({
        time: parseInt(time),
        value,
      }))
      .sort((a, b) => a.time - b.time);

    return Response.json(sortedData);
  },
};
