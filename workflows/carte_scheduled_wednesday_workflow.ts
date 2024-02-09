import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_wednesday_definition.ts";

const ScheduleWednesdayWorkflow = DefineWorkflow({
  callback_id: "carte_scheduled_wednesday_workflow",
  title: "Scheduled Wednesday workflow",
  description: "Output a message with information regarding Friday breakfast.",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

const scheduledFunctionStep = ScheduleWednesdayWorkflow.addStep(
  ScheduledTRFunctionDefinition,
  {},
);

ScheduleWednesdayWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ScheduleWednesdayWorkflow.inputs.channel,
  message: scheduledFunctionStep.outputs.message,
});

export default ScheduleWednesdayWorkflow;
