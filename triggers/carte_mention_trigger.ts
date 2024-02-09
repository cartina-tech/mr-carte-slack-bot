import { Trigger } from "deno-slack-api/types.ts";
import MentionWorkflow from "../workflows/carte_mention_workflow.ts";
import "https://deno.land/std@0.184.0/dotenv/load.ts";

const mentionTrigger: Trigger<typeof MentionWorkflow.definition> = {
  type: "event",
  name: "Is triggered if someone mentions Mr. Carte Bot.",
  description: "Make some action if someone mentions the Carte bot/app",
  workflow: "#/workflows/carte_mention_workflow",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: [Deno.env.get("CHANNEL_ID") || ""],
  },
  inputs: {
    user: {
      value: "{{data.user_id}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
    message_ts: {
      value: "{{data.message_ts}}",
    },
  },
};

export default mentionTrigger;
