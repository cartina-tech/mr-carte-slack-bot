import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { InsertIntoDatastoreFunctionDefinition } from "../definitions/carte_insert_into_datastore_definition.ts";

export default SlackFunction(
  InsertIntoDatastoreFunctionDefinition,
  async ({ client }) => {
    const uuid = crypto.randomUUID();

    const response = await client.apps.datastore.put({
      datastore: "cartina_handbook",
      item: {
        "id": uuid,
        "terms": "",
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
