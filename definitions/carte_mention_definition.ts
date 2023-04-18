import {
  DefineFunction,
  Schema,
} from "https://deno.land/x/deno_slack_sdk@2.0.1/mod.ts";

export const MentionFunctionDefinition = DefineFunction({
  callback_id: "carte_mention_function",
  title: "Acting on a mention of the bot",
  description:
    "Reply to @user mentioning Mr. Carte Bot, with related information from the datastore",
  source_file: "functions/carte_mention_function.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
        description: "The mentioner",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "The channel",
      },
      message_ts: {
        type: Schema.slack.types.message_ts,
        description: "The message timestamp of the mentioner",
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {
      mention: {
        type: Schema.types.string,
        description: "The reply to the mentioner",
      },
    },
    required: [],
  },
});
