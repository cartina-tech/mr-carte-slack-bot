import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ChannelMessageFunctionDefinition } from "../definitions/carte_channel_message_definition.ts";

const ChannelMessageWorkflow = DefineWorkflow({
  callback_id: "carte_channel_message_workflow",
  title: "Workflow of Mr.Carte listening to channel",
  description: "Acting when a user posts to the channel",
  input_parameters: {
    properties: {
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

const chan = ChannelMessageWorkflow.inputs.channel;

ChannelMessageWorkflow.addStep(
  ChannelMessageFunctionDefinition,
  {
    channel: chan,
    message_ts: ChannelMessageWorkflow.inputs.message_ts,
  },
);

export default ChannelMessageWorkflow;
