import {
  assistantGreeting,
  congrats,
  jokes,
  salutations,
  tacoGifs,
  wiseText,
} from "./store.ts";

import { getWeek } from "../api.ts";
import { randomizeStringArr } from "../helpers.ts";
import { jokeReplies } from "./store.ts";

import {
  DatastoreQueryResponse,
  DatastoreSchema,
} from "deno-slack-api/typed-method-types/apps.ts";

import { SlackAPIClient } from "deno-slack-api/types.ts";

const helpText =
  `Det fungerar så här: Skriv ett ord i kanalen eller direkt till mig.
  'Trigger-ord" som stöds just nu i kanalen: 
  - \`wifi\` (För att få uppgifter om wifi)
  - \`week eller vecka\` (Returnerar nuvarande vecka från vecka.nu)
  - \`cheermeup\` (Jag drar ett torrt skämt för att pigga upp stämningen)
  - \`tacoparty\` (Genererar en random tacoparty gif)
  - \`zen\` (Jag svarar med diverse visdomar)
  - \`:disappointed:\` eller \`:cry:\` emoji (Jag svarar med ordspråk)

Du kan också nämna mig \`@Mr.Carte\` och skriva meddelanden till mig i kanalen så försöker jag hitta det du undrar över.
Triggers:
\`[EVENT]\` Carte Mention Trigger (körs om någon nämner carte)
- \`[EVENT]\` Carte Channel Trigger (reagerar på trigger-ord i kanalen)
- \`[SCHEDULED]\` Carte Time Report Trigger (schemalagd trigger som påminner om tidsrapportering varje fredag kl 16)
- \`[SCHEDULED]\` Carte Friday Breakfast Trigger (schemalagd trigger som påminner om fredagsfrulle varje onsdag kl 10)
  `;

export const randomJokes = randomizeStringArr(jokes);
export const randomJokeReplies = randomizeStringArr(jokeReplies);
export const randomTacoGif = randomizeStringArr(tacoGifs);
export const randomSalutation = randomizeStringArr(salutations);
export const randomCongrats = randomizeStringArr(congrats);
export const randomWiseText = randomizeStringArr(wiseText);
export const randomJokeReply = randomizeStringArr(jokeReplies);

export const fetchHandbookData = async (
  datastoreId: string,
  client: SlackAPIClient,
): Promise<
  DatastoreQueryResponse<DatastoreSchema>
> => {
  return await client.apps.datastore.query({
    datastore: datastoreId,
  });
};

export const getResponses = async (
  _user?: string | undefined,
  _userText?: string | undefined,
  _findings?: string | undefined,
  weekUrl?: string,
): Promise<Record<string, string>> => {
  return {
    help: `:information_desk_person: ${helpText}`,
    fun: `${randomJokeReplies}${randomJokes}`,
    zen: `:man_in_lotus_position: ${randomWiseText}`,
    tacoparty: `TACOPARTY!! ${randomTacoGif}`,
    disappointed:
      `>Var inte besviken eller ledsen, det löser inget. Detta gamla ordspråket kanske kan hjälpa att blicka framåt:\n\n*_${randomWiseText}_*`,
    noEmojis:
      `${randomSalutation}, <@${_user}>! :wave: :sparkles: \n\n>Kul med emojis ju men inte riktigt min grej :thinking_face:`,
    notFound:
      `${randomSalutation}, <@${_user}>! :wave: \n\n>Tack för att du nämner mig! Har tyvärr ingen information som har med \`${_userText}\` att göra :disappointed:\n\n`,
    found:
      `${randomCongrats}, <@${_user}>! :thumbsup: :sparkles: \n\n>Baserat på \`${_userText}\`, undrade du kanske om det här?\n\n${_findings}`,
    greeting:
      `${randomSalutation}, <@${_user}>! :wave: ${assistantGreeting} \n\n>`,
    week: `${weekUrl ?? ""} säger att veckans nummer är ${await getWeek(
      `${weekUrl ?? ""}`,
    )
      .then(
        (resp) => {
          return resp;
        },
      )}`,
  };
};
