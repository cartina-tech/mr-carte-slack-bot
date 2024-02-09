import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const ChannelMessageFunctionDefinition = DefineFunction({
  callback_id: "carte_channel_message_function",
  title: "Acting on a channel message",
  description: "Mr. Carte, answering directly to channel",
  source_file: "functions/carte_channel_message_function.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "The channel id",
      },
      message_ts: {
        type: Schema.slack.types.message_ts,
        description: "The message timestamp of the message",
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {
      mention: {
        type: Schema.types.string,
        description: "...",
      },
    },
    required: [],
  },
});
