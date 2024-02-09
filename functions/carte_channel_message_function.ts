import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { ChannelMessageFunctionDefinition } from "../definitions/carte_channel_message_definition.ts";

import {
  buttonCheerMeUp,
  buttonHelp,
  buttonWeek,
  buttonZen,
} from "../elements/elements.ts";

import { fetchHandbookData, getResponses } from "../data/data.ts";
import {
  DatastoreItem,
  DatastoreSchema,
} from "deno-slack-api/typed-method-types/apps.ts";

export default SlackFunction(
  ChannelMessageFunctionDefinition,
  async ({ inputs, client, env }) => {
    let responseMsg: string | undefined = "";
    const weekUrl = env["WEEK_REST_API_URL"];
    const datastoreId = env["DATASTORE_ID"];
    const validTextInputs: string[] = [
      "wifi",
      "vecka",
      "week",
      "tacoparty",
      "help",
      "hjälp",
      "zen",
      "cheermeup",
      ":disappointed:",
      ":cry:",
    ];

    const items: DatastoreItem<DatastoreSchema>[] =
      (await fetchHandbookData(datastoreId, client)).items;

    const textFromMessage = await client.conversations.history({
      channel: inputs.channel,
      inclusive: true,
      latest: inputs.message_ts,
      limit: 1,
    });

    const text = textFromMessage.messages[0].text.toLocaleLowerCase();

    if (validTextInputs.includes(text) && text === "wifi") {
      const dataItem: DatastoreItem<DatastoreSchema> | undefined = items
        .find((
          item,
        ) => item.terms.includes("wifi"));

      responseMsg = dataItem?.content ?? "";
    }

    if (validTextInputs.includes(text) && text === "week" || text === "vecka") {
      responseMsg = await getResponses("", "", "", weekUrl).then((res) =>
        res.week
      );
    }

    if (
      validTextInputs.includes(text) && text === ":disappointed:" ||
      text === ":cry:"
    ) {
      responseMsg = await getResponses("", "", "").then((res) =>
        res.disappointed
      );
    }

    if (validTextInputs.includes(text) && text === "tacoparty") {
      responseMsg = await getResponses("", "", "").then((res) => res.tacoparty);
    }

    if (validTextInputs.includes(text) && text === "help" || text === "hjälp") {
      responseMsg = await getResponses("", "", "").then((res) => res.help);
    }

    if (validTextInputs.includes(text) && text === "zen") {
      responseMsg = await getResponses("", "", "").then((res) => res.zen);
    }

    if (validTextInputs.includes(text) && text === "cheermeup") {
      responseMsg = await getResponses("", "", "").then((res) => res.fun);
    }

    if (responseMsg !== "") {
      const messageResponse = await client.chat.postMessage({
        channel: env.CHANNEL_ID,
        "text": "Sending an answer with information!",
        blocks: [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": responseMsg,
          },
        }, {
          "type": "actions",
          "elements": [
            { ...buttonHelp },
            { ...buttonCheerMeUp },
            { ...buttonZen },
            { ...buttonWeek },
          ],
        }],
      });

      if (messageResponse.error) {
        const error =
          `Failed to post a message with buttons ;-( - ${messageResponse.error}`;
        return { error };
      }
    }
    return { completed: false };
  },
).addBlockActionsHandler(
  ["help_request", "fun_request", "zen_request", "week_request"],
  async ({ action, inputs, client, env }) => {
    let reply = "";
    const weekUrl = env["WEEK_REST_API_URL"];

    switch (action.action_id) {
      case "help_request":
        reply = await getResponses("", "", "", weekUrl).then((res) => res.help);
        break;
      case "fun_request":
        reply = await getResponses("", "", "", weekUrl).then((res) => res.fun);
        break;
      case "zen_request":
        reply = await getResponses("", "", "", weekUrl).then((res) => res.zen);
        break;
      case "week_request":
        {
          reply = await getResponses("", "", "", weekUrl).then((res) =>
            res.week
          );
        }
        break;
    }

    const messageResponse = await client.chat.postMessage({
      channel: inputs.channel!,
      "text": reply,
    });

    return { outputs: { messageResponse } };
  },
);
