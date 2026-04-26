import { FreshContext } from "fresh";
import * as dbutils from "../../src/dbutils.ts";
import * as utils from "../../src/utils.ts";

export const handler = {
  async POST(ctx: FreshContext) {
    let receivedQSO = await ctx.req.json().catch(() => ({}));
    const keys_not_present = utils.validateQSO(receivedQSO);

    if (keys_not_present.length > 0) {
      const error_message = `keys not present: ${keys_not_present.join(", ")}`;
      console.log(error_message);
      return Response.json({
        status: false,
        message: error_message,
      });
    }

    if (!("id" in receivedQSO)) {
      receivedQSO.id = utils.generateID();
    }

    receivedQSO.call = receivedQSO.call.toUpperCase();

    await dbutils.register(receivedQSO);

    return Response.json({
      status: true,
      qso: receivedQSO,
    });
  },
};
