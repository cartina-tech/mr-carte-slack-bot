import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_tr_definition.ts";

export default SlackFunction(
  ScheduledTRFunctionDefinition,
  ({ env }) => {
    const message =
      `>Vill bara vänligen påminna att det är dags att tidsrapportera! Klicka in och fyll i tidrapport här <${
        env["TICTAC_LOGIN_URL"]
      }|Tic Tac> :clock7: :memo:`;
    return { outputs: { message } };
  },
);
