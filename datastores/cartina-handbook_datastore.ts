import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const CartinaDatastore = DefineDatastore({
  name: "cartina_handbook",
  primary_key: "id",
  attributes: {
    id: { type: Schema.types.string },
    words: { type: Schema.types.string },
    content: { type: Schema.types.string },
  },
});
