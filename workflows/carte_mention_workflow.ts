import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { MentionFunctionDefinition } from "../definitions/carte_mention_definition.ts";

const MentionWorkflow = DefineWorkflow({
  callback_id: "carte_mention_workflow",
  title: "Workflow of Mr.Carte being mentioned",
  description:
    "Output a message with information to the user mentioning the Carte bot/app",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
      message_ts: {
        type: Schema.slack.types.message_ts,
      },
      message_context: {
        type: Schema.slack.types.message_context,
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});

const chan = MentionWorkflow.inputs.channel;

MentionWorkflow.addStep(
  MentionFunctionDefinition,
  {
    user: MentionWorkflow.inputs.user,
    channel: chan,
    message_ts: MentionWorkflow.inputs.message_ts,
  },
);

export default MentionWorkflow;
