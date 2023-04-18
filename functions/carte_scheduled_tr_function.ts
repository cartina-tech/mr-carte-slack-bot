import { SlackFunction } from "deno-slack-sdk/mod.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_tr_definition.ts";
import { timeReportNotice } from "../data/store.ts";

export default SlackFunction(
  ScheduledTRFunctionDefinition,
  () => {
    const message = timeReportNotice;
    return { outputs: { message } };
  },
);
