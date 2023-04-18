import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { Trigger } from "deno-slack-api/types.ts";
import { InsertIntoDatastoreFunctionDefinition } from "../definitions/insert_into_datastore_definition.ts";

export const DataWorkflow = DefineWorkflow({
  callback_id: "datastore-workflow",
  title: "Datastore Workflow",
  input_parameters: { properties: {}, required: [] },
});

DataWorkflow.addStep(InsertIntoDatastoreFunctionDefinition, {});

const trigger: Trigger<typeof DataWorkflow.definition> = {
  type: "webhook",
  name: "Add Data to Datastore Trigger",
  workflow: `#/workflows/${DataWorkflow.definition.callback_id}`,
  inputs: {},
};
export default trigger;
