import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_wednesday_definition.ts";

export default SlackFunction(
  ScheduledTRFunctionDefinition,
  ({ env }) => {
    const message =
      `>Tjenixen! Vill du ha frukost på kontoret denna fredag? Reagera med valfri med emoji :coffee:️:croissant::fried_egg:`;
    return { outputs: { message } };
  },
);
