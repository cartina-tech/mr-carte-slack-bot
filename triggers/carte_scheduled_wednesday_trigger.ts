console.log(new Date(new Date().getTime() + 60000).toISOString());
import { Trigger } from "deno-slack-api/types.ts";
import ScheduleWorkflow from "../workflows/carte_scheduled_wednesday_workflow.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import "https://deno.land/std@0.184.0/dotenv/load.ts";

/**
 * Scheduled weekly trigger that
 * runs on every Wednesday at 10
 */

const scheduledTrigger: Trigger<typeof ScheduleWorkflow.definition> = {
  name: "Carte's weekly scheduled trigger to remind about Friday breakfast.",
  type: TriggerTypes.Scheduled,
  workflow: "#/workflows/carte_scheduled_wednesday_workflow",
  inputs: {
    channel: {
      value: Deno.env.get("CHANNEL_ID") || "",
    },
    user: {
      value: Deno.env.get("USER_ID") || "",
    },
  },
  /**
   * starts one minute after update/creation
   * new Date(new Date().getTime() + 60000).toISOString()
   */
  schedule: {
    start_time: "2024-02-09T09:00:00Z",
    timezone: "europe/stockholm",
    frequency: {
      type: "weekly",
      repeats_every: 1,
      on_days: ["Wednesday"],
    },
  },
};

export default scheduledTrigger;
