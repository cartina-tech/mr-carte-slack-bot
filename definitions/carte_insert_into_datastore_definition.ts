import { DefineFunction } from "deno-slack-sdk/mod.ts";

export const InsertIntoDatastoreFunctionDefinition = DefineFunction({
  callback_id: "carte_insert_into_datastore",
  title: "Insert an item into the datastore",
  description: "Adds data to a datastore",
  source_file: "functions/carte_insert_into_datastore.ts",
  input_parameters: {
    properties: {},
    required: [],
  },
});
