import { Trigger } from "deno-slack-api/types.ts";

import "https://deno.land/std@0.184.0/dotenv/load.ts";

import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";

import { ChannelMessageFunctionDefinition } from "../definitions/carte_channel_message_definition.ts";
import { TriggerFilterOperatorType } from "deno-slack-api/typed-method-types/workflows/triggers/trigger-filter.ts";

const channelMessageTrigger: Trigger<
  typeof ChannelMessageFunctionDefinition.definition
> = {
  type: TriggerTypes.Event,
  name: "Carte's channel message listener",
  description:
    "Listening to specific 'trigger'-words to reply with related information.",
  workflow: "#/workflows/carte_channel_message_workflow",
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: [Deno.env.get("CHANNEL_ID") || ""],
    filter: {
      version: 1,

      root: {
        operator: TriggerFilterOperatorType.OR,
        inputs: [{
          statement: "{{data.text}} CONTAINS 'wifi'",
        }, {
          statement: "{{data.text}} CONTAINS 'vecka'",
        }, {
          statement: "{{data.text}} CONTAINS 'week'",
        }, {
          statement: "{{data.text}} CONTAINS 'tacoparty'",
        }, {
          statement: "{{data.text}} CONTAINS 'cheermeup'",
        }, {
          statement: "{{data.text}} CONTAINS 'help'",
        }, {
          statement: "{{data.text}} CONTAINS 'hjälp'",
        }, {
          statement: "{{data.text}} CONTAINS 'zen'",
        }, {
          statement: "{{data.text}} CONTAINS 'cheermeup'",
        }, {
          statement: "{{data.text}} CONTAINS ':disappointed:'",
        }, {
          statement: "{{data.text}} CONTAINS ':cry:'",
        }],
      },
    },
  },
  inputs: {
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    message_ts: { value: TriggerContextData.Shortcut.message_ts },
  },
};

export default channelMessageTrigger;
