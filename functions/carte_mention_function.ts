import { SlackFunction } from "deno-slack-sdk/mod.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

import {
  DatastoreItem,
  DatastoreQueryResponse,
  DatastoreSchema,
} from "deno-slack-api/typed-method-types/apps.ts";

import {
  assistantGreeting,
  congrats,
  jokes,
  salutations,
  tacoGifs,
  wiseText,
} from "../data/store.ts";

import { extractWords, randomizeStringArr } from "../helpers.ts";
import { getWeek } from "../api.ts";
import { MentionFunctionDefinition } from "../definitions/carte_mention_definition.ts";

const randomJokes = randomizeStringArr(jokes);
const randomTacoGif = randomizeStringArr(tacoGifs);
const randomSalutation = randomizeStringArr(salutations);
const randomCongrats = randomizeStringArr(congrats);
const randomWiseText = randomizeStringArr(wiseText);

const getResponses = async (
  _user?: string | undefined,
  _userText?: string | undefined,
  _findings?: string | undefined,
): Promise<Record<string, string>> => {
  return {
    help:
      `:information_desk_person: Det fungerar så här: Skriv ett ord eller en fråga till mig, t.ex.\n\n\:one: \`@Mr. Carte Vad är vårt Wifi?\`\n\n\:two: \`@Mr. Carte Larmet?\`\n\n:three: \`@Mr. Carte Semesterdagar?\`\n\n:four: \`@Mr. Carte Föräldraledighet?\`\n\n:five: \`@Mr. Carte Startpaket?\`\n\n:six: \`@Mr. Carte Kontaktpersoner?\`\n\n:seven: \`@Mr. Carte lön?\`\n\neller varför inte \`@Mr. Carte taco party?\` för att bli uppmuntrad?`,
    fun:
      `>Ok då.. ska se om jag kan dra ett underhållande skämt:\n\n${randomJokes}`,
    zen: `:man_in_lotus_position: ${randomWiseText}`,
    tacoparty: `TACOPARTY!! ${randomTacoGif}`,
    disappointed:
      `>Var inte besviken eller ledsen, det löser inget. Detta gamla ordspråket kanske piggar upp dig:\n\n*_${randomWiseText}_*`,
    noEmojis:
      `${randomSalutation}, <@${_user}>! :wave: :sparkles: \n\n>Kul med emojis ju men inte riktigt min grej :thinking_face:`,
    notFound:
      `${randomSalutation}, <@${_user}>! :wave: \n\n>Tack för att du nämner mig! Har tyvärr ingen information som har med \`${_userText}\` att göra :disappointed:\n\n`,
    found:
      `${randomCongrats}, <@${_user}>! :thumbsup: :sparkles: \n\n>Baserat på \`${_userText}\`, undrade du kanske om det här?\n\n${_findings}`,
    greeting:
      `${randomSalutation}, <@${_user}>! :wave: ${assistantGreeting} \n\n>`,
    week: `${
      Deno.env.get("WEEK_REST_API_URL")
    } säger att veckans nummer är ${await getWeek().then(
      (resp) => {
        return resp;
      },
    )}`,
  };
};

const buttonCommonProps = { type: "button", style: "primary" };

const buttonHelp = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Hjälp? :information_desk_person:" },
  action_id: "help_request",
};

const buttonCheerMeUp = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Pigga upp mig! :smile:" },
  action_id: "fun_request",
};

const buttonZen = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Zen.. :zap:" },
  action_id: "zen_request",
};

const buttonWeek = {
  ...buttonCommonProps,
  text: { type: "plain_text", text: "Vecka? :spiral_calendar_pad:" },
  action_id: "week_request",
};

export default SlackFunction(
  MentionFunctionDefinition,
  async ({ inputs, client }) => {
    const { user } = inputs;

    const findMessage = await client.conversations.history({
      channel: inputs.channel,
      inclusive: true,
      latest: inputs.message_ts,
      limit: 1,
    });

    let usersTextToBot: string = findMessage["messages"][0].text || "";
    usersTextToBot = usersTextToBot.replace("<@U04UMAX8EM8>", "").trim();
    const searchText = usersTextToBot.toLocaleLowerCase();

    const fetchHandbookData = async (): Promise<
      DatastoreQueryResponse<DatastoreSchema>
    > => {
      return await client.apps.datastore.query({
        datastore: Deno.env.get("DATASTORE_ID") || "",
      });
    };

    const items = (await fetchHandbookData()).items;

    const fetched: Required<DatastoreItem<DatastoreSchema>>[] = [];

    items.forEach((item) => {
      const searchWordArr: string[] = item.words.split(",");
      const currentWords: string[] = extractWords(usersTextToBot);
      currentWords.forEach((w) => {
        if (searchWordArr.includes(w.toLocaleLowerCase())) {
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
        answer = await getResponses().then((res) => res.disappointed);
      } else {
        answer = await getResponses().then((res) => res.noEmojis);
      }
    } else if (conditionTacoParty) {
      answer = await getResponses().then((res) => res.tacoparty);
    } else if (conditionNeedsHelp) {
      answer = await getResponses().then((res) => res.help);
    } else if (conditionWeek) {
      answer = await getResponses().then((res) => res.week);
    } else if (
      searchText === "skoja" || searchText === "skämta"
    ) {
      answer = await getResponses().then((res) => res.jokes);
    } else {
      if (searchText !== "") {
        if (fetchedRes === "") {
          answer = await getResponses(user, usersTextToBot).then((res) =>
            res.notFound
          );
        } else {
          answer = await getResponses(user, usersTextToBot, fetchedRes).then((
            res,
          ) => res.found);
        }
      } else {
        answer = await getResponses(user).then((res) => res.greeting);
      }
    }

    const messageResponse = await client.chat.postMessage({
      channel: inputs.channel!,
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
  async ({ body, action, inputs, client }) => {
    let replyText = "";

    switch (action.action_id) {
      case "help_request":
        replyText = await getResponses().then((res) => res.help);
        break;
      case "fun_request":
        replyText = await getResponses().then((res) => res.fun);
        break;
      case "zen_request":
        replyText = await getResponses().then((res) => res.zen);
        break;
      case "week_request":
        {
          replyText = await getResponses().then((res) => res.week);
        }
        break;
    }

    await client.chat.update({
      channel: inputs.channel,
      ts: body.message?.ts,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${replyText}`,
          },
        },
      ],
    });

    const outputs = {
      reviewer: inputs.user,
    };

    const completionStatus = await client.functions.completeSuccess({
      function_execution_id: body.function_data.execution_id,
      outputs,
    });

    if (completionStatus.ok) {
      console.log(
        `Completed action for request with id: ${action.action_id}`,
      );
    }

    if (completionStatus.error) {
      const error =
        `Failed to complete the action :( - ${completionStatus.error}`;
      return { error };
    }
  },
);
