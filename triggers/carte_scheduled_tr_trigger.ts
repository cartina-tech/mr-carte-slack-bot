import { Trigger } from "deno-slack-api/types.ts";
import ScheduleWorkflow from "../workflows/carte_scheduled_tr_workflow.ts";

// scheduled monthly trigger that runs on Friday every last week of the month
const scheduledTrigger: Trigger<typeof ScheduleWorkflow.definition> = {
  name: "Carte's scheduled trigger to remind about time reporting!",
  type: "scheduled",
  workflow: "#/workflows/carte_scheduled_tr_workflow",
  inputs: {},
  schedule: {
    start_time: "2023-04-21T09:45:00Z",
    timezone: "europe/stockholm",
    frequency: {
      type: "monthly",
      on_week_num: -1,
      on_days: ["Friday"],
    },
  },
};

export default scheduledTrigger;
