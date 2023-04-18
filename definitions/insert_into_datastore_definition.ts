import { DefineFunction } from "https://deno.land/x/deno_slack_sdk@2.0.1/mod.ts";

export const InsertIntoDatastoreFunctionDefinition = DefineFunction({
  callback_id: "insert_into_datastore",
  title: "Insert an item into the datastore",
  description: "Adds Cartina data to a datastore",
  source_file: "functions/insert_into_datastore.ts",
  input_parameters: {
    properties: {},
    required: [],
  },
});
