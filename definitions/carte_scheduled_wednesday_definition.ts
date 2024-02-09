import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const ScheduledTRFunctionDefinition = DefineFunction({
  callback_id: "carte_scheduled_wednesday_function",
  title:
    "Send a scheduled message to a channel reminding about Friday breakfast",
  description:
    "Mr. Carte sends a scheduled message to a channel about Friday breakfast",
  source_file: "functions/carte_scheduled_wednesday_function.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
        description: "The user",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "The channel",
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "The scheduled message to the channel",
      },
    },
    required: [],
  },
});
