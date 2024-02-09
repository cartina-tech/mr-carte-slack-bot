import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { ScheduledTRFunctionDefinition } from "../definitions/carte_scheduled_tr_definition.ts";

export default SlackFunction(
  ScheduledTRFunctionDefinition,
  ({ env }) => {
    const message =
      `>Vill bara vänligen påminna att det är fredag och dags att tidsrapportera för veckan! Gå in och fyll i din tidrapport i <${
        env["TICTAC_LOGIN_URL"]
      }|Tic Tac> :clock7: :memo:`;
    return { outputs: { message } };
  },
);
