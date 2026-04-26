import { FreshContext } from "fresh";
import { parse } from "@std/csv";
import * as dbutils from "../../src/dbutils.ts";

export const handler = {
  async POST(ctx: FreshContext) {
    const formData = await ctx.req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Try UTF-8 first
    let text: string;
    try {
      const utf8Decoder = new TextDecoder("utf-8", { fatal: true });
      text = utf8Decoder.decode(uint8Array);
    } catch {
      // Fallback to Shift-JIS if UTF-8 fails
      const sjisDecoder = new TextDecoder("shift-jis");
      text = sjisDecoder.decode(uint8Array);
    }

    // Clean up potential BOM or corrupted headers from SJIS
    text = text.replace(/^[^a-zA-Z0-9]*/, ""); 
    
    const records = parse(text, { skipFirstRow: true, columns: [
        "Date", "Time", "TimeZone", "CallSign", "RSTSent", "NrSent", "RSTRcvd", "NrRcvd", 
        "Serial", "Mode", "Band", "Power", "Multi1", "Multi2", "NewMulti1", "NewMulti2", 
        "Points", "Operator", "Memo", "CQ", "Dupe", "Reserve", "TX", "Power2", "Reserve2", 
        "Reserve3", "Freq", "QsyViolation", "Forced", "PCName", "QslState", "Invalid", "Area", "RBN Verified"
    ] });

    const qsos = [];
    for (const record of records) {
      if (!record.Date || !record.Time || !record.CallSign) continue;

      const datePart = record.Date.replace(/\//g, "-"); // Ensure YYYY-MM-DD
      const dateTimeStr = `${datePart} ${record.Time}`;
      const timestamp = new Date(dateTimeStr).getTime();

      if (isNaN(timestamp)) {
          console.log(`Failed to parse date: ${dateTimeStr}`);
          continue;
      }

      qsos.push({
        id: timestamp,
        call: record.CallSign.toUpperCase(),
        band: record.Band,
        mode: record.Mode,
        rrst: record.RSTRcvd,
        srst: record.RSTSent,
        memo: record.Memo || record.NrRcvd || "",
        operator: record.Operator || "Imported",
      });
    }

    if (qsos.length > 0) {
        await dbutils.registerMany(qsos);
    }

    return Response.json({
      status: true,
      message: `Successfully imported ${qsos.length} QSOs`,
    });
  },
};
