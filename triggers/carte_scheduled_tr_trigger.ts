import { Trigger } from "deno-slack-api/types.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";
import ScheduleWorkflow from "../workflows/carte_scheduled_tr_workflow.ts";

// scheduled monthly trigger that runs on Friday every last week of the month
const scheduledTrigger: Trigger<typeof ScheduleWorkflow.definition> = {
  name: "Carte's scheduled trigger to remind about time reporting!",
  type: "scheduled",
  workflow: "#/workflows/carte_scheduled_tr_workflow",
  inputs: {},
  schedule: {
    start_time: "2023-04-19T08:00:00Z",
    timezone: "europe/stockholm",
    frequency: {
      type: "monthly",
      on_week_num: -1,
      on_days: ["Friday"],
    },
  },
};

export default scheduledTrigger;
