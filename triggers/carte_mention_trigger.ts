import { Trigger } from "deno-slack-api/types.ts";
import MentionWorkflow from "../workflows/carte_mention_workflow.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

const mentionTrigger: Trigger<typeof MentionWorkflow.definition> = {
  type: "event",
  name: "Gets triggered if someone mentions Mr. Carte Bot.",
  description: "Do some action if someone mentions the Carte bot/app",
  workflow: "#/workflows/carte_mention_workflow",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: [Deno.env.get("CHANNEL_ID") as string],
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
