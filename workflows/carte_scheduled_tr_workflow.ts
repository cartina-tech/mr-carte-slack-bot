import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_tr_definition.ts";

const ScheduleWorkflow = DefineWorkflow({
  callback_id: "carte_scheduled_tr_workflow",
  title: "Scheduled workflow",
  description: "Output a message with information regarding time reporting.",
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

const scheduledFunctionStep = ScheduleWorkflow.addStep(
  ScheduledTRFunctionDefinition,
  {},
);

ScheduleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ScheduleWorkflow.inputs.channel,
  message: scheduledFunctionStep.outputs.message,
});

export default ScheduleWorkflow;
