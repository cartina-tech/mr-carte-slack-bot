import { SlackFunction } from "deno-slack-sdk/mod.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";
import { InsertIntoDatastoreFunctionDefinition } from "../definitions/insert_into_datastore_definition.ts";

export default SlackFunction(
  InsertIntoDatastoreFunctionDefinition,
  async ({ client }) => {
    const uuid = crypto.randomUUID();

    const response = await client.apps.datastore.put({
      datastore: Deno.env.get("DATASTORE_ID") || "",
      item: {
        "id": uuid,
        "words": "",
        "content": "",
      },
    });

    if (!response.ok) {
      const error = `Failed to add a row in datastore: ${response.error}`;
      return { error };
    } else {
      console.log(`A new item added: ${response.item}`);
      return { outputs: {} };
    }
  },
);