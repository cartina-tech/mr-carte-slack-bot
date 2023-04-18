import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_tr_definition.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

const ScheduleWorkflow = DefineWorkflow({
  callback_id: "carte_scheduled_tr_workflow",
  title: "Scheduled workflow",
  description:
    "Output a message with information to the user mentioning the Carte bot/app",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

const scheduledFunctionStep = ScheduleWorkflow.addStep(
  ScheduledTRFunctionDefinition,
  {},
);

ScheduleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: Deno.env.get("CHANNEL_ID"),
  message: scheduledFunctionStep.outputs.message,
});

export default ScheduleWorkflow;
