import { SlackFunction } from "deno-slack-sdk/mod.ts";

import {
  DatastoreItem,
  DatastoreSchema,
} from "deno-slack-api/typed-method-types/apps.ts";

import { extractWords } from "../helpers.ts";
import { MentionFunctionDefinition } from "../definitions/carte_mention_definition.ts";
import { msgLenghtLimit } from "../settings.ts";
import {
  buttonCheerMeUp,
  buttonHelp,
  buttonWeek,
  buttonZen,
} from "../elements/elements.ts";
import { fetchHandbookData, getResponses } from "../data/data.ts";

export default SlackFunction(
  MentionFunctionDefinition,
  async ({ inputs, client, env }) => {
    const { user } = inputs;

    const datastoreId = env["DATASTORE_ID"];
    const weekUrl = env["WEEK_REST_API_URL"];

    const findMessage = await client.conversations.history({
      channel: inputs.channel,
      inclusive: true,
      latest: inputs.message_ts,
      limit: 1,
    });

    let usersTextToBot: string = findMessage["messages"][0].text || "";

    usersTextToBot = usersTextToBot.split(" ")[1];
    if (usersTextToBot === undefined) {
      usersTextToBot = "";
    } else {
      usersTextToBot = usersTextToBot.toLocaleLowerCase().trim();
    }
    const searchText: string = usersTextToBot;

    const items = (await fetchHandbookData(datastoreId, client)).items;
    const fetched: Required<DatastoreItem<DatastoreSchema>>[] = [];

    items.forEach((item) => {
      const searchTermArr: string[] = item.terms.split(",");
      const currentTerms: string[] = extractWords(usersTextToBot);
      currentTerms.forEach((w) => {
        if (searchTermArr.includes(w.toLocaleLowerCase())) {
          fetched.push(item);
        }
      });
    });

    const fetchedRes = listResults(fetched);

    function listResults(items: Required<DatastoreItem<DatastoreSchema>>[]) {
      let res = "";
      if (items && usersTextToBot !== "") {
        items.forEach((item) => {
          for (let [key, value] of Object.entries(item).reverse()) {
            if (key === "content") {
              value = value.replace(
                usersTextToBot.toLocaleLowerCase(),
                ` -> \`${usersTextToBot}\` <- `,
              );
              res += value + `\n\n`;
            }
          }
        });
      }
      return res;
    }

    // conditions
    const conditionNeedsHelp = searchText.includes("help") ||
      searchText.includes("hjälp") ||
      searchText === "h" || searchText === "?";

    const conditionTacoParty = searchText === "tacoparty" ||
      searchText === "taco party";

    const conditionIsAnEmoji = searchText.startsWith(":") &&
      searchText.endsWith(":");

    const conditionDisappointed = searchText === ":disappointed:" ||
      searchText === ":cry:";

    const conditionWeek = searchText.includes("week") ||
      searchText.includes("vecka");

    let answer = "";

    if (conditionIsAnEmoji) {
      if (conditionDisappointed) {
        answer = await getResponses("", "", "").then((res) => res.disappointed);
      } else {
        answer = await getResponses("", "", "").then((res) => res.noEmojis);
      }
    } else if (conditionTacoParty) {
      answer = await getResponses("", "", "").then((res) => res.tacoparty);
    } else if (conditionNeedsHelp) {
      answer = await getResponses("", "", "").then((res) => res.help);
    } else if (conditionWeek) {
      answer = await getResponses("", "", "", weekUrl).then((res) => res.week);
    } else if (
      searchText === "skoja" || searchText === "skämta"
    ) {
      answer = await getResponses("", "", "").then((res) => res.fun);
    } else {
      if (searchText !== "") {
        if (fetchedRes === "") {
          answer = await getResponses(user, usersTextToBot, "").then((
            res,
          ) => res.notFound);
        } else {
          answer = await getResponses(user, usersTextToBot, fetchedRes)
            .then((
              res,
            ) => res.found);
        }
      } else {
        answer = await getResponses(user, "", "").then((res) => res.greeting);
      }
    }

    if (answer.length >= msgLenghtLimit) {
      answer = `${answer.substring(0, msgLenghtLimit)}...`;
    }

    const messageResponse = await client.chat.postMessage({
      channel: inputs.channel!,
      "text": "Sending an answer with information!",
      blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": answer,
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
    return { completed: false };
  },
).addBlockActionsHandler(
  ["help_request", "fun_request", "zen_request", "week_request"],
  async ({ action, inputs, client, env }) => {
    let replyText = "";

    const weekUrl = env["WEEK_REST_API_URL"];

    switch (action.action_id) {
      case "help_request":
        replyText = await getResponses("", "", "").then((res) => res.help);
        break;
      case "fun_request":
        replyText = await getResponses("", "", "").then((res) => res.fun);
        break;
      case "zen_request":
        replyText = await getResponses("", "", "").then((res) => res.zen);
        break;
      case "week_request":
        {
          replyText = await getResponses("", "", "", weekUrl).then((res) =>
            res.week
          );
        }
        break;
    }

    const messageResponse = await client.chat.postMessage({
      channel: inputs.channel!,
      "text": replyText,
    });

    return { outputs: { messageResponse } };
  },
);
