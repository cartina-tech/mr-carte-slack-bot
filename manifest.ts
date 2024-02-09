import { Manifest } from "deno-slack-sdk/mod.ts";
import { CartinaDatastore } from "./datastores/cartina-handbook_datastore.ts";
import { DataWorkflow } from "./triggers/carte_add_data_trigger.ts";
import MentionWorkflow from "./workflows/carte_mention_workflow.ts";
import ScheduleWorkflow from "./workflows/carte_scheduled_tr_workflow.ts";
import ChannelMessageWorkflow from "./workflows/carte_channel_message_workflow.ts";
import ScheduleWednesdayWorkflow from "./workflows/carte_scheduled_wednesday_workflow.ts";

export default Manifest({
  name: "Mr. Carte",
  description:
    "Jag är Cartina's egen Slack-bot. Min plikt är att hjälpa till med information om allt som rör Cartina!",
  icon: "assets/Mr_Carte_Diem.png",
  workflows: [
    MentionWorkflow,
    DataWorkflow,
    ScheduleWorkflow,
    ScheduleWednesdayWorkflow,
    ChannelMessageWorkflow,
  ],
  datastores: [CartinaDatastore],
  outgoingDomains: ["hooks.slack.com", "vecka.nu"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "app_mentions:read",
    "triggers:write",
    "channels:read",
    "channels:history",
    "groups:history",
    "im:history",
    "mpim:history",
    "mpim:read",
    "im:read",
    "metadata.message:read",
    "reactions:write",
    "reactions:read",
    "datastore:read",
    "datastore:write",
  ],
});
